"use client"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Save, Plus, GraduationCap, CheckCircle, X } from "lucide-react"

interface Education {
  degree: string; field: string; institution: string; period: string; coursework: string[]
}

export default function EducationPage() {
  const [data, setData] = useState<{ education: Education;[k: string]: unknown } | null>(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [newCourse, setNewCourse] = useState("")

  useEffect(() => { 
    fetch("/api/admin/portfolio")
      .then(r => r.ok ? r.json() : null)
      .then(d => { if (d && !d.error) setData(d) })
      .catch(console.error)
  }, [])

  const handleSave = async () => {
    if (!data) return; setSaving(true)
    try {
      const res = await fetch("/api/admin/portfolio", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
      if (res.ok) { setSaved(true); setTimeout(() => setSaved(false), 3000) }
    } catch (e) { console.error(e) }
    setSaving(false)
  }

  const updateEdu = (field: keyof Education, val: unknown) => {
    if (!data) return; setData({ ...data, education: { ...data.education, [field]: val } })
  }

  const addCourse = () => {
    if (!data || !newCourse.trim()) return
    updateEdu("coursework", [...data.education.coursework, newCourse.trim()])
    setNewCourse("")
  }

  const removeCourse = (i: number) => {
    if (!data) return
    updateEdu("coursework", data.education.coursework.filter((_, idx) => idx !== i))
  }

  if (!data) return <div className="flex items-center justify-center h-64"><div className="h-8 w-8 border-2 border-[#58a6ff]/30 border-t-[#58a6ff] rounded-full animate-spin" /></div>

  const ic = "bg-[#0d1117] border-[#30363d] text-white focus-visible:ring-[#58a6ff]"

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-white">Education</h1><p className="text-[#7d8590] mt-1">Edit your education details</p></div>
        <Button onClick={handleSave} disabled={saving} className="bg-[#238636] hover:bg-[#2ea043] text-white border-0">
          {saved ? <><CheckCircle className="h-4 w-4 mr-2" />Saved!</> : <><Save className="h-4 w-4 mr-2" />{saving ? "Saving..." : "Save"}</>}
        </Button>
      </div>

      <Card className="bg-[#161b22] border-[#30363d]">
        <CardHeader><CardTitle className="text-white flex items-center gap-2 text-base"><GraduationCap className="h-4 w-4 text-[#58a6ff]" />Education Details</CardTitle></CardHeader>
        <CardContent className="space-y-4 pt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2"><label className="text-sm font-medium text-[#e6edf3]">Degree</label><Input value={data.education.degree} onChange={e => updateEdu("degree", e.target.value)} className={ic} /></div>
            <div className="space-y-2"><label className="text-sm font-medium text-[#e6edf3]">Field</label><Input value={data.education.field} onChange={e => updateEdu("field", e.target.value)} className={ic} /></div>
            <div className="space-y-2"><label className="text-sm font-medium text-[#e6edf3]">Institution</label><Input value={data.education.institution} onChange={e => updateEdu("institution", e.target.value)} className={ic} /></div>
            <div className="space-y-2"><label className="text-sm font-medium text-[#e6edf3]">Period</label><Input value={data.education.period} onChange={e => updateEdu("period", e.target.value)} className={ic} placeholder="2023 - 2027" /></div>
          </div>
          <div className="space-y-3">
            <label className="text-sm font-medium text-[#e6edf3]">Relevant Coursework</label>
            <div className="flex flex-wrap gap-2">
              {data.education.coursework.map((course, i) => (
                <Badge key={i} className="bg-[#21262d] text-[#58a6ff] border-[#30363d] text-sm py-1 px-3">
                  {course}<button onClick={() => removeCourse(i)} className="ml-2 hover:text-[#f85149]"><X className="h-3 w-3" /></button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input value={newCourse} onChange={e => setNewCourse(e.target.value)} placeholder="Add course..." className={`${ic} flex-1`} onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addCourse())} />
              <Button onClick={addCourse} size="sm" className="bg-[#21262d] hover:bg-[#30363d] text-white border border-[#30363d]"><Plus className="h-4 w-4" /></Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
