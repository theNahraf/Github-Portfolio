"use client"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Save, Plus, Trash2, Trophy, CheckCircle } from "lucide-react"

export default function AchievementsPage() {
  const [data, setData] = useState<{ achievements: string[];[k: string]: unknown } | null>(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

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

  const addAchievement = () => { if (!data) return; setData({ ...data, achievements: [...data.achievements, ""] }) }
  const updateAchievement = (i: number, val: string) => { if (!data) return; const a = [...data.achievements]; a[i] = val; setData({ ...data, achievements: a }) }
  const removeAchievement = (i: number) => { if (!data) return; setData({ ...data, achievements: data.achievements.filter((_, idx) => idx !== i) }) }

  if (!data) return <div className="flex items-center justify-center h-64"><div className="h-8 w-8 border-2 border-[#58a6ff]/30 border-t-[#58a6ff] rounded-full animate-spin" /></div>

  const ic = "bg-[#0d1117] border-[#30363d] text-white focus-visible:ring-[#58a6ff]"

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-white">Achievements</h1><p className="text-[#7d8590] mt-1">Manage your achievements</p></div>
        <div className="flex gap-2">
          <Button onClick={addAchievement} className="bg-[#1f6feb] hover:bg-[#388bfd] text-white border-0"><Plus className="h-4 w-4 mr-2" />Add</Button>
          <Button onClick={handleSave} disabled={saving} className="bg-[#238636] hover:bg-[#2ea043] text-white border-0">
            {saved ? <><CheckCircle className="h-4 w-4 mr-2" />Saved!</> : <><Save className="h-4 w-4 mr-2" />{saving ? "Saving..." : "Save"}</>}
          </Button>
        </div>
      </div>

      <Card className="bg-[#161b22] border-[#30363d]">
        <CardHeader><CardTitle className="text-white flex items-center gap-2 text-base"><Trophy className="h-4 w-4 text-[#ffa657]" />Achievements List</CardTitle></CardHeader>
        <CardContent className="space-y-3 pt-0">
          {data.achievements.map((achievement, i) => (
            <div key={i} className="flex gap-2 items-start">
              <span className="text-[#ffa657] mt-2.5 text-sm flex-shrink-0">★</span>
              <Input value={achievement} onChange={e => updateAchievement(i, e.target.value)} className={`${ic} flex-1`} />
              <Button size="sm" variant="ghost" className="text-[#f85149] hover:bg-[#f85149]/10 h-9 w-9 p-0 flex-shrink-0" onClick={() => removeAchievement(i)}><Trash2 className="h-4 w-4" /></Button>
            </div>
          ))}
          {data.achievements.length === 0 && <p className="text-[#7d8590] text-sm text-center py-4">No achievements yet. Click &quot;Add&quot; to create one.</p>}
        </CardContent>
      </Card>
    </div>
  )
}
