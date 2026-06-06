import nodemailer from 'nodemailer'
import axios from 'axios'
import { createClient } from '@supabase/supabase-js'

function getSupabase() {
  const url = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL
  const key = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY
  if (!url || !key) return null
  return createClient(url, key)
}

async function parseJsonBody(req) {
  if (req.body) {
    if (typeof req.body === 'string') {
      try {
        return JSON.parse(req.body)
      } catch {
        return {}
      }
    }
    if (typeof req.body === 'object') return req.body
  }

  if (typeof req.text === 'function') {
    const raw = await req.text()
    return raw ? JSON.parse(raw) : {}
  }

  return new Promise((resolve, reject) => {
    let data = ''
    req.on('data', (chunk) => {
      data += chunk.toString()
    })
    req.on('end', () => {
      try {
        resolve(data ? JSON.parse(data) : {})
      } catch (e) {
        reject(e)
      }
    })
    req.on('error', reject)
  })
}

async function sendEmailNotification({ name, email, subject, message }) {
  const emailUser = process.env.EMAIL_USER
  const emailPass = process.env.EMAIL_PASS

  if (!emailUser || !emailPass) {
    console.error('Email notification skipped: EMAIL_USER or EMAIL_PASS not set on server')
    return false
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: emailUser,
      pass: emailPass,
    },
  })

  await transporter.verify()

  const htmlBody = `
    <div style="font-family: Inter, Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; background: #0f0c22; color: #e2e8f0; border-radius: 12px; border: 1px solid rgba(139,92,246,0.2);">
      <h2 style="color: #a78bfa; margin-top: 0;">New Portfolio Message</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 0; color: #6b5f8a; font-size: 13px; width: 80px;">Name</td>
          <td style="padding: 8px 0; color: #fff; font-weight: 600;">${escapeHtml(name)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #6b5f8a; font-size: 13px;">Email</td>
          <td style="padding: 8px 0;"><a href="mailto:${escapeHtml(email)}" style="color: #a78bfa;">${escapeHtml(email)}</a></td>
        </tr>
        ${subject ? `<tr>
          <td style="padding: 8px 0; color: #6b5f8a; font-size: 13px;">Subject</td>
          <td style="padding: 8px 0; color: #c4b5fd;">${escapeHtml(subject)}</td>
        </tr>` : ''}
        <tr>
          <td style="padding: 8px 0; color: #6b5f8a; font-size: 13px; vertical-align: top;">Message</td>
          <td style="padding: 8px 0; color: #e2e8f0; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(message)}</td>
        </tr>
      </table>
    </div>
  `

  await transporter.sendMail({
    from: `"Portfolio" <${emailUser}>`,
    to: emailUser,
    subject: `New Portfolio Message from ${name}`,
    html: htmlBody,
  })

  return true
}

async function sendWhatsAppNotification({ name, email, message }) {
  const phone = process.env.WHATSAPP_PHONE
  const apiKey = process.env.CALLMEBOT_API_KEY
  if (!phone || !apiKey) return

  const text = `New message from ${name} | Email: ${email} | Message: ${message}`

  await axios.get('https://api.callmebot.com/whatsapp.php', {
    params: {
      phone,
      text,
      apikey: apiKey,
    },
  })
}

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  let body
  try {
    body = await parseJsonBody(req)
  } catch {
    return res.status(400).json({ ok: false, error: 'Invalid JSON body' })
  }

  const { name, email, subject, message } = body

  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: 'Name, email, and message are required.' })
  }

  const supabase = getSupabase()
  if (!supabase) {
    return res.status(500).json({ ok: false, error: 'Supabase not configured' })
  }

  const { error } = await supabase
    .from('contact_messages')
    .insert({ name, email, subject: subject || null, message })

  if (error) {
    return res.status(500).json({ ok: false, error: error.message })
  }

  const payload = { name, email, subject, message }

  try {
    await sendEmailNotification(payload)
  } catch (err) {
    console.error('Email notification failed:', err.message)
  }

  try {
    await sendWhatsAppNotification(payload)
  } catch (err) {
    console.error('WhatsApp notification failed:', err.message)
  }

  return res.status(200).json({ ok: true })
}
