"use client"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Save, Plus, Trash2, Briefcase, CheckCircle, ChevronDown, ChevronUp } from "lucide-react"

interface Experience {
  title: string; company: string; location: string; url: string
  period: string; type: string; description: string[]
}

export default function ExperiencePage() {
  const [data, setData] = useState<{ experiences: Experience[];[k: string]: unknown } | null>(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [expanded, setExpanded] = useState<number | null>(null)

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

  const addExperience = () => {
    if (!data) return
    const e: Experience = { title: "New Role", company: "", location: "", url: "", period: "", type: "Full-time", description: [""] }
    setData({ ...data, experiences: [...data.experiences, e] })
    setExpanded(data.experiences.length)
  }

  const updateExp = (i: number, field: keyof Experience, val: unknown) => {
    if (!data) return
    const exps = [...data.experiences]; exps[i] = { ...exps[i], [field]: val }
    setData({ ...data, experiences: exps })
  }

  const removeExp = (i: number) => { if (!data) return; setData({ ...data, experiences: data.experiences.filter((_, idx) => idx !== i) }); setExpanded(null) }

  const updateDesc = (ei: number, di: number, val: string) => {
    if (!data) return
    const exps = [...data.experiences]; const desc = [...exps[ei].description]; desc[di] = val
    exps[ei] = { ...exps[ei], description: desc }; setData({ ...data, experiences: exps })
  }

  const addDesc = (i: number) => { if (!data) return; const exps = [...data.experiences]; exps[i] = { ...exps[i], description: [...exps[i].description, ""] }; setData({ ...data, experiences: exps }) }
  const removeDesc = (ei: number, di: number) => { if (!data) return; const exps = [...data.experiences]; exps[ei] = { ...exps[ei], description: exps[ei].description.filter((_, idx) => idx !== di) }; setData({ ...data, experiences: exps }) }

  if (!data) return <div className="flex items-center justify-center h-64"><div className="h-8 w-8 border-2 border-[#58a6ff]/30 border-t-[#58a6ff] rounded-full animate-spin" /></div>

  const ic = "bg-[#0d1117] border-[#30363d] text-white focus-visible:ring-[#58a6ff]"

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-white">Experience</h1><p className="text-[#7d8590] mt-1">Manage your work experience</p></div>
        <div className="flex gap-2">
          <Button onClick={addExperience} className="bg-[#1f6feb] hover:bg-[#388bfd] text-white border-0"><Plus className="h-4 w-4 mr-2" />Add Experience</Button>
          <Button onClick={handleSave} disabled={saving} className="bg-[#238636] hover:bg-[#2ea043] text-white border-0">
            {saved ? <><CheckCircle className="h-4 w-4 mr-2" />Saved!</> : <><Save className="h-4 w-4 mr-2" />{saving ? "Saving..." : "Save"}</>}
          </Button>
        </div>
      </div>

      {data.experiences.map((exp, i) => (
        <Card key={i} className="bg-[#161b22] border-[#30363d]">
          <CardHeader className="cursor-pointer" onClick={() => setExpanded(expanded === i ? null : i)}>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white flex items-center gap-2 text-base"><Briefcase className="h-4 w-4 text-[#3fb950]" />{exp.title}<span className="text-[#7d8590] font-normal text-sm">at {exp.company}</span></CardTitle>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="ghost" className="text-[#f85149] hover:bg-[#f85149]/10 h-8 w-8 p-0" onClick={e => { e.stopPropagation(); removeExp(i) }}><Trash2 className="h-4 w-4" /></Button>
                {expanded === i ? <ChevronUp className="h-4 w-4 text-[#7d8590]" /> : <ChevronDown className="h-4 w-4 text-[#7d8590]" />}
              </div>
            </div>
          </CardHeader>
          {expanded === i && (
            <CardContent className="space-y-4 pt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2"><label className="text-sm font-medium text-[#e6edf3]">Title</label><Input value={exp.title} onChange={e => updateExp(i, "title", e.target.value)} className={ic} /></div>
                <div className="space-y-2"><label className="text-sm font-medium text-[#e6edf3]">Company</label><Input value={exp.company} onChange={e => updateExp(i, "company", e.target.value)} className={ic} /></div>
                <div className="space-y-2"><label className="text-sm font-medium text-[#e6edf3]">Location</label><Input value={exp.location} onChange={e => updateExp(i, "location", e.target.value)} className={ic} /></div>
                <div className="space-y-2"><label className="text-sm font-medium text-[#e6edf3]">URL</label><Input value={exp.url} onChange={e => updateExp(i, "url", e.target.value)} className={ic} /></div>
                <div className="space-y-2"><label className="text-sm font-medium text-[#e6edf3]">Period</label><Input value={exp.period} onChange={e => updateExp(i, "period", e.target.value)} className={ic} placeholder="e.g. Jan 2024 – Present" /></div>
                <div className="space-y-2"><label className="text-sm font-medium text-[#e6edf3]">Type</label><Input value={exp.type} onChange={e => updateExp(i, "type", e.target.value)} className={ic} placeholder="Full-time, Freelance, Intern..." /></div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between"><label className="text-sm font-medium text-[#e6edf3]">Description Points</label><Button onClick={() => addDesc(i)} size="sm" className="bg-[#21262d] hover:bg-[#30363d] text-white border border-[#30363d] h-7 text-xs"><Plus className="h-3 w-3 mr-1" />Add Point</Button></div>
                {exp.description.map((d, di) => (
                  <div key={di} className="flex gap-2">
                    <Textarea value={d} onChange={e => updateDesc(i, di, e.target.value)} className={`${ic} min-h-[60px] flex-1`} />
                    <Button size="sm" variant="ghost" className="text-[#f85149] hover:bg-[#f85149]/10 h-8 w-8 p-0 mt-1" onClick={() => removeDesc(i, di)}><Trash2 className="h-3 w-3" /></Button>
                  </div>
                ))}
              </div>
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  )
}
