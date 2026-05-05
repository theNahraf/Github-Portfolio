"use client"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Save, Plus, Trash2, Wrench, CheckCircle, X } from "lucide-react"

export default function SkillsPage() {
  const [data, setData] = useState<{ skills: Record<string, string[]>;[k: string]: unknown } | null>(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [newCategory, setNewCategory] = useState("")
  const [newSkills, setNewSkills] = useState<Record<string, string>>({})

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

  const addCategory = () => {
    if (!data || !newCategory.trim()) return
    setData({ ...data, skills: { ...data.skills, [newCategory.trim()]: [] } })
    setNewCategory("")
  }

  const removeCategory = (cat: string) => {
    if (!data) return
    const skills = { ...data.skills }; delete skills[cat]
    setData({ ...data, skills })
  }

  const addSkill = (cat: string) => {
    if (!data || !newSkills[cat]?.trim()) return
    const skills = { ...data.skills, [cat]: [...data.skills[cat], newSkills[cat].trim()] }
    setData({ ...data, skills })
    setNewSkills({ ...newSkills, [cat]: "" })
  }

  const removeSkill = (cat: string, i: number) => {
    if (!data) return
    const skills = { ...data.skills, [cat]: data.skills[cat].filter((_, idx) => idx !== i) }
    setData({ ...data, skills })
  }

  if (!data) return <div className="flex items-center justify-center h-64"><div className="h-8 w-8 border-2 border-[#58a6ff]/30 border-t-[#58a6ff] rounded-full animate-spin" /></div>

  const ic = "bg-[#0d1117] border-[#30363d] text-white focus-visible:ring-[#58a6ff]"

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-white">Skills</h1><p className="text-[#7d8590] mt-1">Manage your skill categories</p></div>
        <Button onClick={handleSave} disabled={saving} className="bg-[#238636] hover:bg-[#2ea043] text-white border-0">
          {saved ? <><CheckCircle className="h-4 w-4 mr-2" />Saved!</> : <><Save className="h-4 w-4 mr-2" />{saving ? "Saving..." : "Save"}</>}
        </Button>
      </div>

      {/* Add Category */}
      <Card className="bg-[#161b22] border-[#30363d]">
        <CardContent className="p-4">
          <div className="flex gap-2">
            <Input value={newCategory} onChange={e => setNewCategory(e.target.value)} placeholder="New category name..." className={`${ic} flex-1`} onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addCategory())} />
            <Button onClick={addCategory} className="bg-[#1f6feb] hover:bg-[#388bfd] text-white border-0"><Plus className="h-4 w-4 mr-2" />Add Category</Button>
          </div>
        </CardContent>
      </Card>

      {Object.entries(data.skills).map(([category, skills]) => (
        <Card key={category} className="bg-[#161b22] border-[#30363d]">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white flex items-center gap-2 text-base"><Wrench className="h-4 w-4 text-[#58a6ff]" />{category}</CardTitle>
              <Button size="sm" variant="ghost" className="text-[#f85149] hover:bg-[#f85149]/10 h-8 w-8 p-0" onClick={() => removeCategory(category)}><Trash2 className="h-4 w-4" /></Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 pt-0">
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <Badge key={i} className="bg-[#21262d] text-[#58a6ff] border-[#30363d] text-sm py-1 px-3">
                  {skill}
                  <button onClick={() => removeSkill(category, i)} className="ml-2 hover:text-[#f85149]"><X className="h-3 w-3" /></button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input value={newSkills[category] || ""} onChange={e => setNewSkills({ ...newSkills, [category]: e.target.value })} placeholder="Add skill..." className={`${ic} flex-1`} onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addSkill(category))} />
              <Button onClick={() => addSkill(category)} size="sm" className="bg-[#21262d] hover:bg-[#30363d] text-white border border-[#30363d]"><Plus className="h-4 w-4" /></Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
