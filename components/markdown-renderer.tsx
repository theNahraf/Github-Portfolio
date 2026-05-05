"use client"

import React from "react"

interface MarkdownRendererProps {
  content: string
  className?: string
}

export default function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  const renderMarkdown = (text: string): string => {
    let html = text

    // Code blocks first (before HTML escaping)
    const codeBlocks: string[] = []
    html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) => {
      const idx = codeBlocks.length
      const escaped = code.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      codeBlocks.push(
        `<pre class="bg-[#0d1117] border border-[#30363d] rounded-xl p-5 my-6 overflow-x-auto"><div class="flex items-center gap-2 mb-3 text-[#484f58] text-xs font-mono">${lang ? `<span class="bg-[#21262d] px-2 py-0.5 rounded text-[#7d8590]">${lang}</span>` : ''}</div><code class="text-[#e6edf3] text-sm font-mono leading-relaxed">${escaped}</code></pre>`
      )
      return `%%CODEBLOCK_${idx}%%`
    })

    // Inline code (before escaping)
    const inlineCodes: string[] = []
    html = html.replace(/`([^`]+)`/g, (_, code) => {
      const idx = inlineCodes.length
      const escaped = code.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      inlineCodes.push(`<code class="bg-[#21262d] text-[#ff7b72] px-1.5 py-0.5 rounded text-sm font-mono border border-[#30363d]">${escaped}</code>`)
      return `%%INLINECODE_${idx}%%`
    })

    // Escape HTML
    html = html.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")

    // Images - !(alt)[url]
    html = html.replace(
      /!\[([^\]]*)\]\(([^)]+)\)/g,
      '<figure class="my-6"><img src="$2" alt="$1" class="rounded-xl border border-[#30363d] w-full max-w-2xl mx-auto shadow-lg" /><figcaption class="text-center text-[#7d8590] text-sm mt-2 italic">$1</figcaption></figure>'
    )

    // Headers
    html = html.replace(/^### (.*$)/gm, '<h3 class="text-lg font-semibold text-white mt-8 mb-3 flex items-center gap-2"><span class="w-1 h-5 bg-[#58a6ff] rounded-full inline-block"></span>$1</h3>')
    html = html.replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold text-white mt-10 mb-4 pb-2 border-b border-[#21262d]">$1</h2>')
    html = html.replace(/^# (.*$)/gm, '<h1 class="text-2xl sm:text-3xl font-bold text-white mt-10 mb-6">$1</h1>')

    // Bold and italic
    html = html.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em class="text-white">$1</em></strong>')
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
    html = html.replace(/\*(.*?)\*/g, '<em class="text-[#8b949e]">$1</em>')

    // Blockquotes
    html = html.replace(
      /^&gt; (.*$)/gm,
      '<blockquote class="border-l-4 border-[#58a6ff] bg-[#161b22]/50 pl-5 pr-4 py-3 my-5 text-[#8b949e] italic rounded-r-lg">$1</blockquote>'
    )

    // Unordered lists
    html = html.replace(
      /^- (.*$)/gm,
      '<li class="text-[#e6edf3] ml-5 list-disc leading-relaxed py-0.5">$1</li>'
    )

    // Ordered lists
    html = html.replace(
      /^\d+\. (.*$)/gm,
      '<li class="text-[#e6edf3] ml-5 list-decimal leading-relaxed py-0.5">$1</li>'
    )

    // Links
    html = html.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" class="text-[#58a6ff] hover:text-[#79c0ff] underline decoration-[#58a6ff]/30 hover:decoration-[#58a6ff] transition-colors" target="_blank" rel="noopener noreferrer">$1</a>'
    )

    // Horizontal rules
    html = html.replace(/^---$/gm, '<hr class="border-[#21262d] my-8" />')

    // Paragraphs (double newlines)
    html = html.replace(/\n\n/g, '</p><p class="text-[#e6edf3] leading-relaxed mb-4">')
    html = '<p class="text-[#e6edf3] leading-relaxed mb-4">' + html + '</p>'

    // Single line breaks
    html = html.replace(/\n/g, '<br />')

    // Clean up empty paragraphs
    html = html.replace(/<p class="text-\[#e6edf3\] leading-relaxed mb-4"><\/p>/g, '')
    html = html.replace(/<p class="text-\[#e6edf3\] leading-relaxed mb-4"><br \/><\/p>/g, '')

    // Restore code blocks and inline codes
    codeBlocks.forEach((block, i) => { html = html.replace(`%%CODEBLOCK_${i}%%`, block) })
    inlineCodes.forEach((code, i) => { html = html.replace(`%%INLINECODE_${i}%%`, code) })

    return html
  }

  return (
    <div
      className={`prose prose-invert max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
    />
  )
}
