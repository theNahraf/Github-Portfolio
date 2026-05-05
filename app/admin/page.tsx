"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock, FileText, AlertCircle, Eye, EyeOff, ShieldCheck } from "lucide-react"

function generateCaptcha() {
  const a = Math.floor(Math.random() * 20) + 1
  const b = Math.floor(Math.random() * 20) + 1
  const ops = ['+', '-', '×'] as const
  const op = ops[Math.floor(Math.random() * ops.length)]
  let answer: number
  switch (op) {
    case '+': answer = a + b; break
    case '-': answer = a - b; break
    case '×': answer = a * b; break
  }
  return { question: `${a} ${op} ${b} = ?`, answer }
}

export default function AdminLoginPage() {
  const [password, setPassword] = useState("")
  const [captchaInput, setCaptchaInput] = useState("")
  const [captcha, setCaptcha] = useState({ question: "", answer: 0 })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  useEffect(() => { setCaptcha(generateCaptcha()) }, [])

  const refreshCaptcha = () => {
    setCaptcha(generateCaptcha())
    setCaptchaInput("")
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Validate captcha
    if (parseInt(captchaInput) !== captcha.answer) {
      setError("Incorrect captcha answer. Please try again.")
      refreshCaptcha()
      setLoading(false)
      return
    }

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })

      if (res.ok) {
        router.push("/admin/dashboard")
      } else {
        const data = await res.json()
        setError(data.error || "Invalid password")
        refreshCaptcha()
      }
    } catch {
      setError("Connection error. Please try again.")
      refreshCaptcha()
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0d1117] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-[#238636]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-[#58a6ff]/5 rounded-full blur-3xl" />
      </div>

      <Card className="w-full max-w-md bg-[#161b22] border-[#30363d] relative z-10 shadow-2xl shadow-black/50">
        <CardHeader className="text-center pb-4 pt-8">
          <div className="mx-auto mb-4 h-16 w-16 rounded-2xl bg-gradient-to-br from-[#238636] to-[#58a6ff] flex items-center justify-center shadow-lg shadow-[#238636]/20">
            <FileText className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-white">Admin Dashboard</CardTitle>
          <p className="text-[#7d8590] text-sm mt-1">Enter your password to access the dashboard</p>
        </CardHeader>
        <CardContent className="pb-8 px-8">
          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-[#f85149]/10 border border-[#f85149]/20 text-[#f85149] text-sm">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#e6edf3] flex items-center gap-2">
                <Lock className="h-3.5 w-3.5 text-[#7d8590]" />
                Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="bg-[#0d1117] border-[#30363d] text-white placeholder:text-[#484f58] focus-visible:ring-[#58a6ff] pr-10 h-11"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7d8590] hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* CAPTCHA */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#e6edf3] flex items-center gap-2">
                <ShieldCheck className="h-3.5 w-3.5 text-[#7d8590]" />
                Security Check
              </label>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-[#0d1117] border border-[#30363d] rounded-lg px-4 py-2.5 select-none">
                  <span className="text-[#58a6ff] font-mono text-lg font-bold tracking-wider">{captcha.question}</span>
                </div>
                <button
                  type="button"
                  onClick={refreshCaptcha}
                  className="p-2.5 rounded-lg bg-[#21262d] border border-[#30363d] text-[#7d8590] hover:text-white hover:bg-[#30363d] transition-colors text-xs"
                >
                  ↻
                </button>
              </div>
              <Input
                type="number"
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
                placeholder="Your answer"
                className="bg-[#0d1117] border-[#30363d] text-white placeholder:text-[#484f58] focus-visible:ring-[#58a6ff] h-11"
              />
            </div>

            <Button
              type="submit"
              disabled={loading || !password || !captchaInput}
              className="w-full bg-[#238636] hover:bg-[#2ea043] text-white border-0 h-11 font-medium transition-all disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Authenticating...
                </div>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
