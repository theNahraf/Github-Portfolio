import { NextRequest, NextResponse } from "next/server"

interface Project {
  title: string
  description: string
  tech: string[]
  highlights?: string[]
}

interface Experience {
  title: string
  company: string
  period: string
  description: string[]
}

interface Message {
  role: "user" | "assistant"
  content: string
}

interface PortfolioData {
  projects: Project[]
  experiences: Experience[]
  skills: Record<string, string[]>
  achievements: string[]
}

export async function POST(request: NextRequest) {
  try {
    const { messages, portfolioData } = await request.json() as { messages: Message[], portfolioData: PortfolioData }

    // Get Gemini API key from environment variables
    // In development, fallback to a default key if env var is not set (for local testing only)
    const apiKey = process.env.GEMINI_API_KEY || (process.env.NODE_ENV === 'development' && undefined)
    
    if (!apiKey) {
      console.error("GEMINI_API_KEY is not set in environment variables")
      console.error("NODE_ENV:", process.env.NODE_ENV)
      console.error("Available env vars:", Object.keys(process.env).filter(key => key.includes('GEMINI') || key.includes('API')))
      return NextResponse.json(
        { 
          error: "GEMINI_API_KEY environment variable is not set. For Vercel: Go to Settings → Environment Variables and add GEMINI_API_KEY with your API key value." 
        },
        { status: 500 }
      )
    }

    // Create system prompt with portfolio data
    const systemContext = `You are Farhan, a Full-Stack Developer, CS Student, Competitive Programmer, and Deep Learning Enthusiast.

Here is your portfolio information:

**Projects:**
${portfolioData.projects.map((p: Project) => `- ${p.title}: ${p.description}. Technologies: ${p.tech.join(", ")}. Highlights: ${p.highlights?.join(" ") || ""}`).join("\n")}

**Experience:**
${portfolioData.experiences.map((e: Experience) => `- ${e.title} at ${e.company} (${e.period}): ${e.description.join(" ")}`).join("\n")}

**Skills:**
${Object.entries(portfolioData.skills).map(([cat, items]: [string, string[]]) => `${cat}: ${items.join(", ")}`).join("\n")}

**Achievements:**
${portfolioData.achievements.join(". ")}

**Education:**
Bachelor of Technology in Information Technology at Netaji Subhas University of Technology, New Delhi (2023-2027)

**Contact:**
Email: farhan.techcareer@gmail.com
LinkedIn: linkedin.com/in/nahrafxd
Location: New Delhi, India

Answer questions about yourself and your portfolio in a friendly, conversational manner as if you are Farhan. Use first person (I, my, me) when talking about your work, projects, and experiences. Be specific and accurate based on the information provided. If asked about something not in your portfolio, politely say you don't have that information or haven't mentioned it.

IMPORTANT FORMATTING RULES:
- Keep responses concise but informative (2-4 sentences for simple questions, up to 2-3 paragraphs for complex questions)
- Use line breaks (\n) to separate different points or sections
- Use bullet points with dashes (-) or asterisks (*) when listing multiple items
- Structure longer responses with clear paragraphs
- Use proper spacing between sections
- Keep the tone professional yet friendly
- Avoid walls of text - break up information into digestible chunks`

    // Get the last user message
    const lastMessage = messages[messages.length - 1]
    if (!lastMessage || lastMessage.role !== "user") {
      return NextResponse.json(
        { error: "Invalid message format" },
        { status: 400 }
      )
    }

    // Build conversation history for context (last 4 messages)
    const recentMessages = messages.slice(-4)
    const conversationHistory = recentMessages
      .map((msg: Message) => `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`)
      .join("\n")

    // Combine system context with conversation history and current question
    const fullPrompt = `${systemContext}\n\nPrevious conversation:\n${conversationHistory}\n\nUser: ${lastMessage.content}\nAssistant:`

    // Call Gemini API - using gemini-2.0-flash (free tier, faster)
    const modelName = "gemini-2.0-flash"
    
    // Use v1beta API with header authentication
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent`
    
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: fullPrompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1000,
        },
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      let errorData
      try {
        errorData = JSON.parse(errorText)
      } catch {
        errorData = { message: errorText }
      }
      console.error("Gemini API error:", errorData)
      return NextResponse.json(
        { error: errorData.error?.message || errorData.message || "Failed to get AI response from Gemini" },
        { status: response.status }
      )
    }

    const data = await response.json()
    
    // Extract the response text from Gemini's response format
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't generate a response."
    
    return NextResponse.json({ message: aiResponse })
  } catch (error) {
    console.error("Chat API error:", error)
    const errorMessage = error instanceof Error ? error.message : "Internal server error"
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}
