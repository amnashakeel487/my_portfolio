import nodemailer from 'nodemailer'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const envPath = resolve(__dirname, '../.env')

try {
  const envText = readFileSync(envPath, 'utf8')
  for (const line of envText.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq === -1) continue
    const key = trimmed.slice(0, eq).trim()
    const val = trimmed.slice(eq + 1).trim()
    if (!process.env[key]) process.env[key] = val
  }
} catch {
  console.error('Could not read .env file')
  process.exit(1)
}

const emailUser = process.env.EMAIL_USER
const emailPass = process.env.EMAIL_PASS

if (!emailUser || !emailPass) {
  console.error('Missing EMAIL_USER or EMAIL_PASS in .env')
  process.exit(1)
}

console.log('Testing Gmail SMTP for:', emailUser)

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: { user: emailUser, pass: emailPass },
})

try {
  await transporter.verify()
  console.log('SMTP connection OK')
  const info = await transporter.sendMail({
    from: `"Portfolio Test" <${emailUser}>`,
    to: emailUser,
    subject: 'Portfolio email test',
    text: 'If you see this, Gmail is working.',
  })
  console.log('Email sent:', info.messageId)
} catch (err) {
  console.error('Email failed:', err.message)
  process.exit(1)
}
