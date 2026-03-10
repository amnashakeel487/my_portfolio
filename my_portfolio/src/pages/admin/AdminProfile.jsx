import { useState, useEffect, useRef } from 'react'
import { getProfile, updateProfile, createProfile, uploadImage } from '../../lib/supabase'

export default function AdminProfile() {
  const [profile, setProfile] = useState(null)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [uploading, setUploading] = useState(false)
  const [uploadingCv, setUploadingCv] = useState(false)
  const fileInputRef = useRef(null)
  const cvInputRef = useRef(null)

  useEffect(() => {
    getProfile().then((p) => {
      if (p) setProfile({ ...p })
      else setProfile({
        full_name: '', tagline: '', bio: '', bio_short: '', avatar_url: '', location: '', experience_years: '', languages: '',
        cv_url: '', email: '', linkedin_url: '', twitter_url: '', github_url: '', youtube_url: '',
      })
    })
  }, [])

  if (!profile) return <div className="p-8 text-slate-400">Loading...</div>

  const handleChange = (e) => {
    const { name, value } = e.target
    setProfile((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setMessage('')
    const { url, error } = await uploadImage(file, 'avatar')
    setUploading(false)
    if (error) {
      setMessage('Upload failed: ' + error)
      return
    }
    if (url) {
      setProfile((prev) => ({ ...prev, avatar_url: url }))
      if (profile.id) {
        const { error: saveErr } = await updateProfile(profile.id, { ...profile, avatar_url: url })
        if (saveErr) setMessage('Uploaded but save failed: ' + saveErr.message)
        else setMessage('Picture updated. It appears on the About Me page.')
      }
    }
  }

  const handleCvUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.type !== 'application/pdf') {
      setMessage('Please choose a PDF file.')
      return
    }
    setUploadingCv(true)
    setMessage('')
    const { url, error } = await uploadImage(file, 'cv')
    setUploadingCv(false)
    if (error) {
      setMessage('CV upload failed: ' + error)
      return
    }
    if (url) {
      setProfile((prev) => ({ ...prev, cv_url: url }))
      if (profile.id) {
        const { error: saveErr } = await updateProfile(profile.id, { ...profile, cv_url: url })
        if (saveErr) setMessage('Uploaded but save failed: ' + saveErr.message)
        else setMessage('CV uploaded. Visitors can open and download it from the home page.')
      } else {
        setMessage('CV uploaded. Save the profile to keep it.')
      }
    }
    e.target.value = ''
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setMessage('')
    const result = profile.id
      ? await updateProfile(profile.id, profile)
      : await createProfile(profile)
    setSaving(false)
    if (result.error) setMessage(result.error.message)
    else {
      setMessage('Saved.')
      if (result.data) setProfile((prev) => ({ ...prev, id: result.data.id }))
    }
  }

  return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-2xl font-bold text-white mb-6">Edit Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-start gap-6 p-4 rounded-xl bg-white/5 border border-primary/20">
          <div>
            <p className="text-sm font-medium text-slate-400 mb-2">Profile picture (shows on About Me)</p>
            <div
              className="w-28 h-28 rounded-xl bg-slate-800 border-2 border-primary/20 bg-cover bg-center"
              style={{ backgroundImage: profile.avatar_url ? `url(${profile.avatar_url})` : undefined }}
            />
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            <button type="button" onClick={() => fileInputRef.current?.click()} disabled={uploading} className="mt-2 text-sm text-primary hover:underline disabled:opacity-50">
              {uploading ? 'Uploading...' : 'Upload / Change photo'}
            </button>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white/5 border border-primary/20 space-y-3">
          <p className="text-sm font-medium text-slate-400">Resume / CV (PDF)</p>
          <p className="text-xs text-slate-500">Upload a PDF. It will open in a new tab on the home page so visitors can view and download it.</p>
          {profile.cv_url ? (
            <div className="flex flex-wrap items-center gap-3">
              <a href={profile.cv_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/20 text-primary text-sm font-medium hover:bg-primary/30">
                <span className="material-symbols-outlined text-lg">open_in_new</span>
                Open current CV
              </a>
              <input ref={cvInputRef} type="file" accept="application/pdf,.pdf" className="hidden" onChange={handleCvUpload} />
              <button type="button" onClick={() => cvInputRef.current?.click()} disabled={uploadingCv} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-primary/20 text-slate-300 text-sm hover:bg-white/5 disabled:opacity-50">
                {uploadingCv ? 'Uploading...' : 'Replace with new PDF'}
              </button>
            </div>
          ) : (
            <div>
              <input ref={cvInputRef} type="file" accept="application/pdf,.pdf" className="hidden" onChange={handleCvUpload} />
              <button type="button" onClick={() => cvInputRef.current?.click()} disabled={uploadingCv} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/20 text-primary text-sm font-medium hover:bg-primary/30 disabled:opacity-50">
                <span className="material-symbols-outlined">upload_file</span>
                {uploadingCv ? 'Uploading...' : 'Upload CV (PDF)'}
              </button>
            </div>
          )}
        </div>

        {['full_name', 'tagline', 'location', 'experience_years', 'languages', 'email', 'linkedin_url', 'twitter_url', 'github_url', 'youtube_url'].map((key) => (
          <div key={key}>
            <label className="block text-sm font-medium text-slate-400 mb-1">{key.replace(/_/g, ' ')}</label>
            <input
              name={key}
              value={profile[key] ?? ''}
              onChange={handleChange}
              className="w-full bg-white/5 border border-primary/20 rounded-xl px-4 py-2 text-white placeholder-slate-500 focus:ring-2 focus:ring-primary outline-none"
              placeholder={key}
              type={key === 'email' ? 'email' : 'text'}
            />
          </div>
        ))}
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">bio</label>
          <textarea name="bio" value={profile.bio ?? ''} onChange={handleChange} rows={4} className="w-full bg-white/5 border border-primary/20 rounded-xl px-4 py-2 text-white placeholder-slate-500 focus:ring-2 focus:ring-primary outline-none" placeholder="bio" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">bio short</label>
          <textarea name="bio_short" value={profile.bio_short ?? ''} onChange={handleChange} rows={2} className="w-full bg-white/5 border border-primary/20 rounded-xl px-4 py-2 text-white placeholder-slate-500 focus:ring-2 focus:ring-primary outline-none" placeholder="bio short" />
        </div>
        {message && <p className="text-sm text-slate-400">{message}</p>}
        <button type="submit" disabled={saving} className="px-6 py-2 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 disabled:opacity-50">
          {saving ? 'Saving...' : 'Save profile'}
        </button>
      </form>
    </div>
  )
}
