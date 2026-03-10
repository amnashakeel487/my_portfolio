import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL or Anon Key missing. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env')
}

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

const BUCKET = 'portfolio'

// --- Auth ---
export async function signIn(email, password) {
  if (!supabase) return { error: { message: 'Supabase not configured' } }
  return await supabase.auth.signInWithPassword({ email, password })
}

export async function signOut() {
  if (!supabase) return
  return await supabase.auth.signOut()
}

export async function getSession() {
  if (!supabase) return Promise.resolve({ data: { session: null } })
  return await supabase.auth.getSession()
}

export function onAuthStateChange(callback) {
  if (!supabase) return () => {}
  return supabase.auth.onAuthStateChange(callback)
}

// --- Storage: upload image, return public URL ---
export async function uploadImage(file, path) {
  if (!supabase) return { url: null, error: 'Supabase not configured' }
  const ext = file.name.split('.').pop()
  const name = `${path}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
  const { error } = await supabase.storage.from(BUCKET).upload(name, file, { upsert: true })
  if (error) return { url: null, error: error.message }
  const { data: { publicUrl } } = supabase.storage.from(BUCKET).getPublicUrl(name)
  return { url: publicUrl, error: null }
}

export async function getProfile() {
  if (!supabase) return null
  const { data, error } = await supabase.from('profiles').select('*').limit(1).single()
  if (error) return null
  return data
}

export async function getEducation() {
  if (!supabase) return []
  const { data } = await supabase.from('education').select('*').order('sort_order', { ascending: true })
  return data || []
}

export async function getExpertise() {
  if (!supabase) return []
  const { data } = await supabase.from('expertise').select('*').order('sort_order', { ascending: true })
  return data || []
}

export async function getHonors() {
  if (!supabase) return []
  const { data } = await supabase.from('honors').select('*').order('sort_order', { ascending: true })
  return data || []
}

export async function getProjects(category = null) {
  if (!supabase) return []
  let query = supabase.from('projects').select('*').order('sort_order', { ascending: true })
  if (category && category !== 'All') query = query.eq('category', category)
  const { data } = await query
  return data || []
}

export async function getSkills(category = null) {
  if (!supabase) return []
  let query = supabase.from('skills').select('*').order('sort_order', { ascending: true })
  if (category) query = query.eq('category', category)
  const { data } = await query
  return data || []
}

export async function getAllSkills() {
  if (!supabase) return []
  const { data } = await supabase.from('skills').select('*').order('sort_order', { ascending: true })
  return data || []
}

export async function getServices() {
  if (!supabase) return []
  const { data } = await supabase.from('services').select('*').order('sort_order', { ascending: true })
  return data || []
}

export async function submitContactMessage({ name, email, subject, message }) {
  if (!supabase) return { ok: false, error: 'Supabase not configured' }
  const { error } = await supabase.from('contact_messages').insert({ name, email, subject, message })
  return { ok: !error, error: error?.message }
}

export async function getContactMessages() {
  if (!supabase) return []
  const { data } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false })
  return data || []
}

// --- Admin CRUD (requires authenticated user) ---
export async function updateProfile(id, payload) {
  if (!supabase) return { error: { message: 'Not configured' } }
  const { id: _id, created_at, ...rest } = payload
  return await supabase.from('profiles').update({ ...rest, updated_at: new Date().toISOString() }).eq('id', id)
}

export async function createProfile(payload) {
  if (!supabase) return { error: { message: 'Not configured' } }
  const { id: _id, created_at, updated_at, ...rest } = payload
  return await supabase.from('profiles').insert(rest).select().single()
}

export async function createProject(row) {
  if (!supabase) return { error: { message: 'Not configured' } }
  return await supabase.from('projects').insert(row).select().single()
}

export async function updateProject(id, row) {
  if (!supabase) return { error: { message: 'Not configured' } }
  return await supabase.from('projects').update({ ...row, updated_at: new Date().toISOString() }).eq('id', id)
}

export async function deleteProject(id) {
  if (!supabase) return { error: { message: 'Not configured' } }
  return await supabase.from('projects').delete().eq('id', id)
}

export async function createSkill(row) {
  if (!supabase) return { error: { message: 'Not configured' } }
  return await supabase.from('skills').insert(row).select().single()
}

export async function updateSkill(id, row) {
  if (!supabase) return { error: { message: 'Not configured' } }
  return await supabase.from('skills').update(row).eq('id', id)
}

export async function deleteSkill(id) {
  if (!supabase) return { error: { message: 'Not configured' } }
  return await supabase.from('skills').delete().eq('id', id)
}

export async function createEducation(row) {
  if (!supabase) return { error: { message: 'Not configured' } }
  return await supabase.from('education').insert(row).select().single()
}

export async function updateEducation(id, row) {
  if (!supabase) return { error: { message: 'Not configured' } }
  return await supabase.from('education').update(row).eq('id', id)
}

export async function deleteEducation(id) {
  if (!supabase) return { error: { message: 'Not configured' } }
  return await supabase.from('education').delete().eq('id', id)
}

export async function createExpertise(row) {
  if (!supabase) return { error: { message: 'Not configured' } }
  return await supabase.from('expertise').insert(row).select().single()
}

export async function updateExpertise(id, row) {
  if (!supabase) return { error: { message: 'Not configured' } }
  return await supabase.from('expertise').update(row).eq('id', id)
}

export async function deleteExpertise(id) {
  if (!supabase) return { error: { message: 'Not configured' } }
  return await supabase.from('expertise').delete().eq('id', id)
}

export async function createHonor(row) {
  if (!supabase) return { error: { message: 'Not configured' } }
  return await supabase.from('honors').insert(row).select().single()
}

export async function updateHonor(id, row) {
  if (!supabase) return { error: { message: 'Not configured' } }
  return await supabase.from('honors').update(row).eq('id', id)
}

export async function deleteHonor(id) {
  if (!supabase) return { error: { message: 'Not configured' } }
  return await supabase.from('honors').delete().eq('id', id)
}

export async function createService(row) {
  if (!supabase) return { error: { message: 'Not configured' } }
  return await supabase.from('services').insert(row).select().single()
}

export async function updateService(id, row) {
  if (!supabase) return { error: { message: 'Not configured' } }
  return await supabase.from('services').update(row).eq('id', id)
}

export async function deleteService(id) {
  if (!supabase) return { error: { message: 'Not configured' } }
  return await supabase.from('services').delete().eq('id', id)
}

export async function deleteContactMessage(id) {
  if (!supabase) return { error: { message: 'Not configured' } }
  return await supabase.from('contact_messages').delete().eq('id', id)
}
