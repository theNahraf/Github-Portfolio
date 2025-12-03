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
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY environment variable is not set" },
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

Answer questions about yourself and your portfolio in a friendly, conversational manner as if you are Farhan. Use first person (I, my, me) when talking about your work, projects, and experiences. Be specific and accurate based on the information provided. If asked about something not in your portfolio, politely say you don't have that information or haven't mentioned it.`

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
          maxOutputTokens: 500,
        },
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      console.error("Gemini API error:", error)
      return NextResponse.json(
        { error: error.error?.message || "Failed to get AI response from Gemini" },
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
