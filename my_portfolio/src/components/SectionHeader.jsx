export default function SectionHeader({ tag, title, subtitle }) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-4 mb-4">
        <span className="section-tag">{tag}</span>
        <div className="section-line" />
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">{title}</h2>
      {subtitle && <p className="text-muted text-base max-w-xl">{subtitle}</p>}
    </div>
  )
}
