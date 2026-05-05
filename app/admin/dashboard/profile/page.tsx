"use client"
import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Save, User, MapPin, Building, Mail, Phone, Globe, CheckCircle, Camera, AlertCircle } from "lucide-react"

interface ProfileData {
  name: string; username: string; tagline: string; bio: string
  detailedBio: string; detailedBioSub: string; institution: string
  location: string; email: string; phone: string; avatarFallback: string
}

interface SocialData {
  github: string; linkedin: string; twitter: string
  linkedinDisplay: string; leetcode: string
}

export default function ProfileEditorPage() {
  const [data, setData] = useState<{ profile: ProfileData; socialLinks: SocialData; [k: string]: unknown } | null>(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [imageStatus, setImageStatus] = useState<{ type: "success" | "error"; message: string } | null>(null)
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)
  const [profileImageKey, setProfileImageKey] = useState(0)

  useEffect(() => { fetch("/api/admin/portfolio").then(r => r.json()).then(setData) }, [])

  const handleSave = async () => {
    if (!data) return; setSaving(true)
    try {
      const res = await fetch("/api/admin/portfolio", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
      if (res.ok) { setSaved(true); setTimeout(() => setSaved(false), 3000) }
    } catch (e) { console.error(e) }
    setSaving(false)
  }

  const handleImageUpload = async (file: File) => {
    setUploading(true); setImageStatus(null)
    const formData = new FormData(); formData.append("image", file)
    try {
      const res = await fetch("/api/admin/profile-image", { method: "POST", body: formData })
      const result = await res.json()
      if (res.ok) {
        setImageStatus({ type: "success", message: "Profile picture updated!" })
        // Update the profileImageUrl in data with the Cloudinary URL
        if (result.url && data) {
          setData({ ...data, profileImageUrl: result.url })
        }
        setProfileImageKey(k => k + 1)
        setTimeout(() => setImageStatus(null), 3000)
      } else {
        setImageStatus({ type: "error", message: result.error || "Upload failed" })
      }
    } catch { setImageStatus({ type: "error", message: "Connection error" }) }
    setUploading(false)
  }

  const up = (f: string, v: string) => { if (data) setData({ ...data, profile: { ...data.profile, [f]: v } }) }
  const us = (f: string, v: string) => { if (data) setData({ ...data, socialLinks: { ...data.socialLinks, [f]: v } }) }

  if (!data) return <div className="flex items-center justify-center h-64"><div className="h-8 w-8 border-2 border-[#58a6ff]/30 border-t-[#58a6ff] rounded-full animate-spin" /></div>

  const ic = "bg-[#0d1117] border-[#30363d] text-white focus-visible:ring-[#58a6ff]"

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-white">Profile</h1><p className="text-[#7d8590] mt-1">Edit your personal information</p></div>
        <Button onClick={handleSave} disabled={saving} className="bg-[#238636] hover:bg-[#2ea043] text-white border-0">
          {saved ? <><CheckCircle className="h-4 w-4 mr-2" />Saved!</> : <><Save className="h-4 w-4 mr-2" />{saving ? "Saving..." : "Save Changes"}</>}
        </Button>
      </div>

      {/* Profile Picture */}
      <Card className="bg-[#161b22] border-[#30363d]">
        <CardHeader><CardTitle className="text-white flex items-center gap-2 text-base"><Camera className="h-4 w-4 text-[#58a6ff]" />Profile Picture</CardTitle></CardHeader>
        <CardContent className="pt-0">
          {imageStatus && (
            <div className={`flex items-center gap-2 p-3 rounded-lg text-sm mb-4 ${imageStatus.type === "success" ? "bg-[#238636]/10 border border-[#238636]/20 text-[#3fb950]" : "bg-[#f85149]/10 border border-[#f85149]/20 text-[#f85149]"}`}>
              {imageStatus.type === "success" ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
              <span>{imageStatus.message}</span>
            </div>
          )}
          <div className="flex items-center gap-6">
            <div className="relative group">
              <img
                key={profileImageKey}
                src={(data as Record<string, unknown>)?.profileImageUrl as string || `/profile2.jpeg?t=${profileImageKey}`}
                alt="Profile"
                className="h-24 w-24 rounded-full object-cover border-2 border-[#30363d]"
              />
              <button
                onClick={() => fileRef.current?.click()}
                className="absolute inset-0 rounded-full bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                disabled={uploading}
              >
                <Camera className="h-6 w-6 text-white" />
              </button>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) handleImageUpload(f) }} />
            </div>
            <div>
              <p className="text-[#e6edf3] font-medium">Change Profile Picture</p>
              <p className="text-[#7d8590] text-sm mt-1">JPEG, PNG, WebP. Max 5MB.</p>
              <Button onClick={() => fileRef.current?.click()} disabled={uploading} size="sm" className="mt-3 bg-[#21262d] hover:bg-[#30363d] text-white border border-[#30363d]">
                {uploading ? "Uploading..." : "Choose Image"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Basic Info */}
      <Card className="bg-[#161b22] border-[#30363d]">
        <CardHeader><CardTitle className="text-white flex items-center gap-2 text-base"><User className="h-4 w-4 text-[#58a6ff]" />Basic Information</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2"><label className="text-sm font-medium text-[#e6edf3]">Name</label><Input value={data.profile.name} onChange={e => up("name", e.target.value)} className={ic} /></div>
            <div className="space-y-2"><label className="text-sm font-medium text-[#e6edf3]">Username</label><Input value={data.profile.username} onChange={e => up("username", e.target.value)} className={ic} /></div>
          </div>
          <div className="space-y-2"><label className="text-sm font-medium text-[#e6edf3]">Tagline</label><Input value={data.profile.tagline} onChange={e => up("tagline", e.target.value)} className={ic} /></div>
          <div className="space-y-2"><label className="text-sm font-medium text-[#e6edf3]">Short Bio</label><Textarea value={data.profile.bio} onChange={e => up("bio", e.target.value)} className={`${ic} min-h-[80px]`} /></div>
          <div className="space-y-2"><label className="text-sm font-medium text-[#e6edf3]">Detailed Bio (Desktop)</label><Input value={data.profile.detailedBio} onChange={e => up("detailedBio", e.target.value)} className={ic} /></div>
          <div className="space-y-2"><label className="text-sm font-medium text-[#e6edf3]">Detailed Bio Description</label><Textarea value={data.profile.detailedBioSub} onChange={e => up("detailedBioSub", e.target.value)} className={`${ic} min-h-[80px]`} /></div>
        </CardContent>
      </Card>

      {/* Contact */}
      <Card className="bg-[#161b22] border-[#30363d]">
        <CardHeader><CardTitle className="text-white flex items-center gap-2 text-base"><Mail className="h-4 w-4 text-[#58a6ff]" />Contact Information</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2"><label className="text-sm font-medium text-[#e6edf3] flex items-center gap-2"><Building className="h-3.5 w-3.5 text-[#7d8590]" />Institution</label><Input value={data.profile.institution} onChange={e => up("institution", e.target.value)} className={ic} /></div>
          <div className="space-y-2"><label className="text-sm font-medium text-[#e6edf3] flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-[#7d8590]" />Location</label><Input value={data.profile.location} onChange={e => up("location", e.target.value)} className={ic} /></div>
          <div className="space-y-2"><label className="text-sm font-medium text-[#e6edf3] flex items-center gap-2"><Mail className="h-3.5 w-3.5 text-[#7d8590]" />Email</label><Input value={data.profile.email} onChange={e => up("email", e.target.value)} className={ic} /></div>
          <div className="space-y-2"><label className="text-sm font-medium text-[#e6edf3] flex items-center gap-2"><Phone className="h-3.5 w-3.5 text-[#7d8590]" />Phone</label><Input value={data.profile.phone} onChange={e => up("phone", e.target.value)} className={ic} /></div>
        </CardContent>
      </Card>

      {/* Social */}
      <Card className="bg-[#161b22] border-[#30363d]">
        <CardHeader><CardTitle className="text-white flex items-center gap-2 text-base"><Globe className="h-4 w-4 text-[#58a6ff]" />Social Links</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2"><label className="text-sm font-medium text-[#e6edf3]">GitHub</label><Input value={data.socialLinks.github} onChange={e => us("github", e.target.value)} className={ic} /></div>
          <div className="space-y-2"><label className="text-sm font-medium text-[#e6edf3]">LinkedIn</label><Input value={data.socialLinks.linkedin} onChange={e => us("linkedin", e.target.value)} className={ic} /></div>
          <div className="space-y-2"><label className="text-sm font-medium text-[#e6edf3]">Twitter</label><Input value={data.socialLinks.twitter} onChange={e => us("twitter", e.target.value)} className={ic} /></div>
          <div className="space-y-2"><label className="text-sm font-medium text-[#e6edf3]">LeetCode</label><Input value={data.socialLinks.leetcode} onChange={e => us("leetcode", e.target.value)} className={ic} /></div>
        </CardContent>
      </Card>
    </div>
  )
}
