"use client"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Save, Plus, Trash2, Code, CheckCircle, ChevronDown, ChevronUp, X } from "lucide-react"

interface Project {
  title: string; description: string; tech: string[]; github: string; demo: string
  date: string; stars: number; forks: number; language: string; highlights: string[]
}

export default function ProjectsPage() {
  const [data, setData] = useState<{ projects: Project[];[k: string]: unknown } | null>(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [expanded, setExpanded] = useState<number | null>(null)
  const [newTech, setNewTech] = useState("")

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

  const addProject = () => {
    if (!data) return
    const p: Project = { title: "New Project", description: "", tech: [], github: "", demo: "", date: new Date().getFullYear().toString(), stars: 0, forks: 0, language: "JavaScript", highlights: [] }
    setData({ ...data, projects: [...data.projects, p] })
    setExpanded(data.projects.length)
  }

  const updateProject = (i: number, field: keyof Project, val: unknown) => {
    if (!data) return
    const projects = [...data.projects]
    projects[i] = { ...projects[i], [field]: val }
    setData({ ...data, projects })
  }

  const removeProject = (i: number) => {
    if (!data) return
    setData({ ...data, projects: data.projects.filter((_, idx) => idx !== i) })
    setExpanded(null)
  }

  const addHighlight = (i: number) => {
    if (!data) return
    const projects = [...data.projects]
    projects[i] = { ...projects[i], highlights: [...projects[i].highlights, ""] }
    setData({ ...data, projects })
  }

  const updateHighlight = (pi: number, hi: number, val: string) => {
    if (!data) return
    const projects = [...data.projects]
    const highlights = [...projects[pi].highlights]
    highlights[hi] = val
    projects[pi] = { ...projects[pi], highlights }
    setData({ ...data, projects })
  }

  const removeHighlight = (pi: number, hi: number) => {
    if (!data) return
    const projects = [...data.projects]
    projects[pi] = { ...projects[pi], highlights: projects[pi].highlights.filter((_, idx) => idx !== hi) }
    setData({ ...data, projects })
  }

  const addTech = (i: number) => {
    if (!data || !newTech.trim()) return
    const projects = [...data.projects]
    projects[i] = { ...projects[i], tech: [...projects[i].tech, newTech.trim()] }
    setData({ ...data, projects })
    setNewTech("")
  }

  const removeTech = (pi: number, ti: number) => {
    if (!data) return
    const projects = [...data.projects]
    projects[pi] = { ...projects[pi], tech: projects[pi].tech.filter((_, idx) => idx !== ti) }
    setData({ ...data, projects })
  }

  if (!data) return <div className="flex items-center justify-center h-64"><div className="h-8 w-8 border-2 border-[#58a6ff]/30 border-t-[#58a6ff] rounded-full animate-spin" /></div>

  const ic = "bg-[#0d1117] border-[#30363d] text-white focus-visible:ring-[#58a6ff]"

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-white">Projects</h1><p className="text-[#7d8590] mt-1">Manage your featured projects</p></div>
        <div className="flex gap-2">
          <Button onClick={addProject} className="bg-[#1f6feb] hover:bg-[#388bfd] text-white border-0"><Plus className="h-4 w-4 mr-2" />Add Project</Button>
          <Button onClick={handleSave} disabled={saving} className="bg-[#238636] hover:bg-[#2ea043] text-white border-0">
            {saved ? <><CheckCircle className="h-4 w-4 mr-2" />Saved!</> : <><Save className="h-4 w-4 mr-2" />{saving ? "Saving..." : "Save"}</>}
          </Button>
        </div>
      </div>

      {data.projects.map((project, i) => (
        <Card key={i} className="bg-[#161b22] border-[#30363d]">
          <CardHeader className="cursor-pointer" onClick={() => setExpanded(expanded === i ? null : i)}>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white flex items-center gap-2 text-base">
                <Code className="h-4 w-4 text-[#58a6ff]" />{project.title}
                <Badge className="bg-[#21262d] text-[#7d8590] border-[#30363d] text-xs">{project.language}</Badge>
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="ghost" className="text-[#f85149] hover:text-[#ff7b72] hover:bg-[#f85149]/10 h-8 w-8 p-0" onClick={(e) => { e.stopPropagation(); removeProject(i) }}>
                  <Trash2 className="h-4 w-4" />
                </Button>
                {expanded === i ? <ChevronUp className="h-4 w-4 text-[#7d8590]" /> : <ChevronDown className="h-4 w-4 text-[#7d8590]" />}
              </div>
            </div>
          </CardHeader>
          {expanded === i && (
            <CardContent className="space-y-4 pt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2"><label className="text-sm font-medium text-[#e6edf3]">Title</label><Input value={project.title} onChange={e => updateProject(i, "title", e.target.value)} className={ic} /></div>
                <div className="space-y-2"><label className="text-sm font-medium text-[#e6edf3]">Language</label><Input value={project.language} onChange={e => updateProject(i, "language", e.target.value)} className={ic} /></div>
                <div className="space-y-2"><label className="text-sm font-medium text-[#e6edf3]">GitHub URL</label><Input value={project.github} onChange={e => updateProject(i, "github", e.target.value)} className={ic} /></div>
                <div className="space-y-2"><label className="text-sm font-medium text-[#e6edf3]">Demo URL</label><Input value={project.demo} onChange={e => updateProject(i, "demo", e.target.value)} className={ic} /></div>
                <div className="space-y-2"><label className="text-sm font-medium text-[#e6edf3]">Date</label><Input value={project.date} onChange={e => updateProject(i, "date", e.target.value)} className={ic} /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2"><label className="text-sm font-medium text-[#e6edf3]">Stars</label><Input type="number" value={project.stars} onChange={e => updateProject(i, "stars", parseInt(e.target.value) || 0)} className={ic} /></div>
                  <div className="space-y-2"><label className="text-sm font-medium text-[#e6edf3]">Forks</label><Input type="number" value={project.forks} onChange={e => updateProject(i, "forks", parseInt(e.target.value) || 0)} className={ic} /></div>
                </div>
              </div>
              <div className="space-y-2"><label className="text-sm font-medium text-[#e6edf3]">Description</label><Textarea value={project.description} onChange={e => updateProject(i, "description", e.target.value)} className={`${ic} min-h-[80px]`} /></div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#e6edf3]">Technologies</label>
                <div className="flex flex-wrap gap-2 mb-2">{project.tech.map((t, ti) => (<Badge key={ti} className="bg-[#21262d] text-[#58a6ff] border-[#30363d]">{t}<button onClick={() => removeTech(i, ti)} className="ml-1.5 hover:text-[#f85149]"><X className="h-3 w-3" /></button></Badge>))}</div>
                <div className="flex gap-2"><Input value={newTech} onChange={e => setNewTech(e.target.value)} placeholder="Add technology..." className={`${ic} flex-1`} onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addTech(i))} /><Button onClick={() => addTech(i)} size="sm" className="bg-[#21262d] hover:bg-[#30363d] text-white border border-[#30363d]"><Plus className="h-4 w-4" /></Button></div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between"><label className="text-sm font-medium text-[#e6edf3]">Highlights</label><Button onClick={() => addHighlight(i)} size="sm" className="bg-[#21262d] hover:bg-[#30363d] text-white border border-[#30363d] h-7 text-xs"><Plus className="h-3 w-3 mr-1" />Add</Button></div>
                {project.highlights.map((h, hi) => (
                  <div key={hi} className="flex gap-2">
                    <Textarea value={h} onChange={e => updateHighlight(i, hi, e.target.value)} className={`${ic} min-h-[60px] flex-1`} />
                    <Button size="sm" variant="ghost" className="text-[#f85149] hover:bg-[#f85149]/10 h-8 w-8 p-0 flex-shrink-0 mt-1" onClick={() => removeHighlight(i, hi)}><Trash2 className="h-3 w-3" /></Button>
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
