"use client"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, FileText, CheckCircle, AlertCircle } from "lucide-react"

export default function ResumePage() {
  const [uploading, setUploading] = useState(false)
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null)
  const [dragOver, setDragOver] = useState(false)
  const [resumeUrl, setResumeUrl] = useState<string>("/resume.pdf")
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Fetch current resume URL from portfolio data
    fetch("/api/admin/portfolio").then(r => r.json()).then(data => {
      if (data?.resumeUrl) setResumeUrl(data.resumeUrl)
    }).catch(() => {})
  }, [])

  const uploadFile = async (file: File) => {
    if (file.type !== "application/pdf") { setStatus({ type: "error", message: "Only PDF files are allowed" }); return }
    if (file.size > 10 * 1024 * 1024) { setStatus({ type: "error", message: "File too large (max 10MB)" }); return }

    setUploading(true); setStatus(null)
    const formData = new FormData(); formData.append("resume", file)
    try {
      const res = await fetch("/api/admin/resume", { method: "POST", body: formData })
      const data = await res.json()
      if (res.ok) {
        setStatus({ type: "success", message: "Resume updated successfully!" })
        if (data.url) setResumeUrl(data.url)
      }
      else { setStatus({ type: "error", message: data.error || "Upload failed" }) }
    } catch { setStatus({ type: "error", message: "Connection error" }) }
    setUploading(false)
  }

  const handleDrop = (e: React.DragEvent) => { e.preventDefault(); setDragOver(false); const file = e.dataTransfer.files[0]; if (file) uploadFile(file) }
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => { const file = e.target.files?.[0]; if (file) uploadFile(file) }

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-white">Resume</h1><p className="text-[#7d8590] mt-1">Upload and manage your resume</p></div>

      {status && (
        <div className={`flex items-center gap-2 p-3 rounded-lg text-sm ${status.type === "success" ? "bg-[#238636]/10 border border-[#238636]/20 text-[#3fb950]" : "bg-[#f85149]/10 border border-[#f85149]/20 text-[#f85149]"}`}>
          {status.type === "success" ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
          <span>{status.message}</span>
        </div>
      )}

      <Card className="bg-[#161b22] border-[#30363d]">
        <CardHeader><CardTitle className="text-white flex items-center gap-2 text-base"><Upload className="h-4 w-4 text-[#58a6ff]" />Upload Resume</CardTitle></CardHeader>
        <CardContent className="pt-0">
          <div
            className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors cursor-pointer ${dragOver ? "border-[#58a6ff] bg-[#58a6ff]/5" : "border-[#30363d] hover:border-[#484f58]"}`}
            onDragOver={e => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileRef.current?.click()}
          >
            <input ref={fileRef} type="file" accept=".pdf" className="hidden" onChange={handleFileSelect} />
            <Upload className={`h-12 w-12 mx-auto mb-4 ${dragOver ? "text-[#58a6ff]" : "text-[#30363d]"}`} />
            <h3 className="text-white font-medium mb-1">{uploading ? "Uploading..." : "Drop your resume here"}</h3>
            <p className="text-[#7d8590] text-sm">or click to browse. PDF only, max 10MB</p>
            {uploading && <div className="mt-4 mx-auto w-48 h-1.5 bg-[#21262d] rounded-full overflow-hidden"><div className="h-full bg-[#58a6ff] rounded-full animate-pulse w-3/4" /></div>}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#161b22] border-[#30363d]">
        <CardHeader><CardTitle className="text-white flex items-center gap-2 text-base"><FileText className="h-4 w-4 text-[#58a6ff]" />Current Resume</CardTitle></CardHeader>
        <CardContent className="pt-0">
          <div className="bg-[#0d1117] border border-[#30363d] rounded-lg p-4">
            <div className="flex items-center gap-3 p-4 bg-[#161b22] rounded-lg border border-[#30363d]">
              <FileText className="h-8 w-8 text-[#58a6ff]" />
              <div className="flex-1">
                <p className="text-white font-medium">Resume.pdf</p>
                <p className="text-[#7d8590] text-xs mt-0.5">{resumeUrl.startsWith("http") ? "Stored on Cloudinary" : "Local file"}</p>
              </div>
            </div>
            <div className="mt-3 flex gap-2">
              <Button asChild variant="outline" className="border-[#30363d] text-[#e6edf3] bg-transparent hover:bg-[#21262d]">
                <a href={resumeUrl} target="_blank" rel="noopener noreferrer"><FileText className="h-4 w-4 mr-2" />Open in New Tab</a>
              </Button>
              <Button asChild variant="outline" className="border-[#30363d] text-[#e6edf3] bg-transparent hover:bg-[#21262d]">
                <a href="/api/download/resume"><Upload className="h-4 w-4 mr-2" />Download</a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
