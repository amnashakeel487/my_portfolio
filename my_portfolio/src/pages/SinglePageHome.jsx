import { useState, useEffect } from 'react'
import { getProfile, getProjects, getAllSkills, getEducation, getExpertise, getHonors, getServices, submitContactMessage } from '../lib/supabase'

export default function SinglePageHome() {
  const [profile, setProfile] = useState(null)
  const [projects, setProjects] = useState([])
  const [skills, setSkills] = useState([])
  const [education, setEducation] = useState([])
  const [expertise, setExpertise] = useState([])
  const [honors, setHonors] = useState([])
  const [services, setServices] = useState([])

  useEffect(() => {
    getProfile().then(setProfile)
    getProjects().then(setProjects)
    getAllSkills().then(setSkills)
    getEducation().then(setEducation)
    getExpertise().then(setExpertise)
    getHonors().then(setHonors)
    getServices().then(setServices)
  }, [])

  const name = profile?.full_name || 'Your Name'

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <HeroSection profile={profile} />
      
      {/* About Section */}
      <AboutSection profile={profile} education={education} expertise={expertise} honors={honors} />
      
      {/* Experience Section */}
      <ExperienceSection />
      
      {/* Projects Section */}
      <ProjectsSection projects={projects} />
      
      {/* Services Section */}
      <ServicesSection services={services} />
      
      {/* Skills Section */}
      <SkillsSection skills={skills} />
      
      {/* Contact Section */}
      <ContactSection profile={profile} />
    </div>
  )
}

// Hero Section Component
function HeroSection({ profile }) {
  const name = profile?.full_name || 'Amna Shakeel'
  const tagline = 'I build Python web apps and take them live.'
  const description = `Hi, I'm ${name.split(' ')[0] || 'Amna Shakeel'}, a Software Engineering student at COMSATS University. I build backend and full-stack projects with Flask, React and Supabase, and use Pandas and Scikit-learn for data analysis and machine learning.`

  return (
    <section id="home" className="min-h-screen relative flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-10">
          <div className="grid grid-cols-12 gap-2">
            {Array.from({ length: 144 }).map((_, i) => (
              <div key={i} className="w-1 h-1 bg-purple-400 rounded-full opacity-20"></div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Content */}
          <div className="lg:col-span-7">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6">
              {tagline}
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8 max-w-2xl">
              {description}
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <button 
                onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg"
              >
                View my work
              </button>
              <button 
                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-purple-400 text-purple-400 px-8 py-4 rounded-full font-semibold hover:bg-purple-400 hover:text-white transition-all duration-300"
              >
                Get in touch
              </button>
            </div>

            {/* Status Indicator */}
            <div className="flex items-center gap-3 mb-8">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-400">Open to internships and junior developer roles</span>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-3">
              {['Python', 'Flask', 'React', 'Supabase', 'Docker', 'Scikit-learn'].map(tech => (
                <span key={tech} className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-full text-sm text-gray-300">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Right Content - Profile Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative">
              {/* Profile Image with Gradient Border */}
              <div className="relative">
                <div className="w-80 h-80 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 p-1">
                  <div className="w-full h-full rounded-full overflow-hidden bg-gray-800 flex items-center justify-center">
                    {profile?.avatar_url ? (
                      <img 
                        src={profile.avatar_url} 
                        alt={name} 
                        className="w-full h-full object-cover rounded-full" 
                      />
                    ) : (
                      <span className="material-symbols-outlined text-8xl text-gray-400">person</span>
                    )}
                  </div>
                </div>
                
                {/* Floating Info Cards */}
                <div className="absolute -right-8 top-16 bg-gray-800/90 backdrop-blur border border-gray-700 rounded-xl p-4 min-w-48">
                  <div className="text-xs text-gray-400 mb-1">Shipped at WeConnectInnovation</div>
                  <div className="text-white font-medium">Hotel Booking System</div>
                  <div className="text-xs text-gray-400">Vercel + Railway</div>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-xs text-green-400">Live</span>
                  </div>
                </div>

                <div className="absolute -left-8 bottom-20 bg-gray-800/90 backdrop-blur border border-gray-700 rounded-xl p-4 min-w-40">
                  <div className="text-xs text-gray-400 mb-1">Project hosting</div>
                  <div className="text-white font-medium">Prompt Vault</div>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-xs text-green-400">Live</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
// About Section Component
function AboutSection({ profile, education, expertise, honors }) {
  const name = profile?.full_name || 'Your Name'
  const bio = profile?.bio || "Passionate about building digital experiences that merge aesthetics with deep functionality."

  return (
    <section id="about" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-16">
          <span className="text-purple-400 font-semibold text-sm uppercase tracking-wider">About me</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">Who I Am</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Get to know more about my background, skills, and what drives my passion for technology.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Profile Info */}
          <div className="lg:col-span-8">
            <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-2xl p-8">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-700 flex items-center justify-center shrink-0">
                  {profile?.avatar_url ? (
                    <img src={profile.avatar_url} alt={name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="material-symbols-outlined text-3xl text-gray-400">person</span>
                  )}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{name}</h3>
                  <p className="text-purple-400 font-medium">{profile?.tagline || 'Software Developer'}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">location_on</span>
                      {profile?.location || 'Location'}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">schedule</span>
                      {profile?.experience_years || '2+ Years'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 leading-relaxed">{bio}</p>
              </div>

              {/* Core Expertise */}
              {expertise.length > 0 && (
                <div className="mt-8">
                  <h4 className="text-lg font-semibold text-white mb-4">Core Expertise</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {expertise.map((item) => (
                      <div key={item.id} className="bg-gray-700/30 border border-gray-600 rounded-lg p-4">
                        <h5 className="font-medium text-white">{item.title}</h5>
                        <p className="text-sm text-gray-400 mt-1">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Education & Honors */}
          <div className="lg:col-span-4">
            <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-2xl p-8 h-full">
              <h4 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-purple-400">school</span>
                Education
              </h4>
              
              <div className="space-y-6">
                {education.length > 0 ? (
                  education.map((item, index) => (
                    <div key={item.id} className="relative">
                      <div className="flex items-start gap-4">
                        <div className={`w-3 h-3 rounded-full mt-1 ${index === 0 ? 'bg-purple-500' : 'bg-gray-600'}`}></div>
                        <div>
                          <p className="text-purple-400 text-sm font-medium">{item.period}</p>
                          <h5 className="text-white font-medium">{item.title}</h5>
                          <p className="text-gray-400 text-sm">{item.institution}</p>
                          {item.description && (
                            <p className="text-gray-500 text-xs mt-1">{item.description}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    <span className="material-symbols-outlined text-4xl mb-4 block">school</span>
                    <p>Add education details in admin panel</p>
                  </div>
                )}
              </div>

              {/* Honors */}
              {honors.length > 0 && (
                <div className="mt-8 pt-8 border-t border-gray-700">
                  <h5 className="text-white font-medium mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-purple-400 text-lg">workspace_premium</span>
                    Honors & Awards
                  </h5>
                  <div className="space-y-2">
                    {honors.map((honor) => (
                      <div key={honor.id} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                        <span className="text-gray-300">{honor.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
// Experience Section Component
function ExperienceSection() {
  const experiences = [
    {
      period: "2023 - Present",
      title: "Software Engineering Student",
      company: "COMSATS University",
      description: "Studying software engineering fundamentals, data structures, algorithms, and modern web development technologies.",
      type: "Education"
    },
    {
      period: "2023",
      title: "Intern Developer",
      company: "WeConnectInnovation",
      description: "Built and deployed hotel booking system using modern web technologies. Gained experience in full-stack development.",
      type: "Work"
    }
  ]

  return (
    <section id="experience" className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-16">
          <span className="text-purple-400 font-semibold text-sm uppercase tracking-wider">Experience</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">My Journey</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A timeline of my educational and professional experiences in software development.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-600"></div>
            
            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <div key={index} className="relative flex items-start gap-8">
                  {/* Timeline dot */}
                  <div className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center ${
                    index === 0 ? 'bg-gradient-to-r from-purple-600 to-blue-600' : 'bg-gray-600'
                  }`}>
                    <span className="material-symbols-outlined text-white">
                      {exp.type === 'Work' ? 'work' : 'school'}
                    </span>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 bg-gray-700/30 border border-gray-600 rounded-xl p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-white">{exp.title}</h3>
                        <p className="text-purple-400 font-medium">{exp.company}</p>
                      </div>
                      <span className="text-sm text-gray-400 bg-gray-800 px-3 py-1 rounded-full">{exp.period}</span>
                    </div>
                    <p className="text-gray-300">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Projects Section Component  
function ProjectsSection({ projects }) {
  return (
    <section id="projects" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-16">
          <span className="text-purple-400 font-semibold text-sm uppercase tracking-wider">Projects</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">Featured Work</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A showcase of my recent projects and technical implementations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.length > 0 ? (
            projects.slice(0, 6).map((project) => (
              <div key={project.id} className="group bg-gray-800/50 backdrop-blur border border-gray-700 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-300">
                {project.image_url && (
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={project.image_url} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-purple-600/20 text-purple-300 text-xs rounded-full">
                      {project.category || 'Web App'}
                    </span>
                    {project.live_url && (
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-xs text-green-400">Live</span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>
                  
                  {project.technologies && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.split(',').slice(0, 3).map((tech, i) => (
                        <span key={i} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-3">
                    {project.live_url && (
                      <a 
                        href={project.live_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-purple-400 hover:text-white transition-colors"
                      >
                        <span className="material-symbols-outlined">open_in_new</span>
                      </a>
                    )}
                    {project.github_url && (
                      <a 
                        href={project.github_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-purple-400 hover:text-white transition-colors"
                      >
                        <span className="material-symbols-outlined">code</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <span className="material-symbols-outlined text-6xl text-gray-600 mb-4 block">folder_open</span>
              <p className="text-gray-500">No projects to display. Add some in the admin panel.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
// Services Section Component
function ServicesSection({ services }) {
  return (
    <section id="services" className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-16">
          <span className="text-purple-400 font-semibold text-sm uppercase tracking-wider">Services</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">What I Offer</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Professional services and solutions I provide to help bring your ideas to life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.length > 0 ? (
            services.map((service, index) => (
              <div key={service.id} className="bg-gray-700/30 border border-gray-600 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-white">
                    {service.icon || 'code'}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{service.title}</h3>
                <p className="text-gray-400 mb-6">{service.description}</p>
                {service.features && (
                  <ul className="space-y-2">
                    {service.features.split(',').slice(0, 3).map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                        {feature.trim()}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))
          ) : (
            // Default services
            [
              {
                title: "Web Development",
                description: "Full-stack web applications using modern frameworks and technologies.",
                icon: "web"
              },
              {
                title: "Backend Development", 
                description: "Robust server-side applications with databases and API integrations.",
                icon: "dns"
              },
              {
                title: "Data Analysis",
                description: "Data processing and machine learning solutions using Python libraries.",
                icon: "analytics"
              }
            ].map((service, index) => (
              <div key={index} className="bg-gray-700/30 border border-gray-600 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-white">
                    {service.icon}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{service.title}</h3>
                <p className="text-gray-400">{service.description}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}

// Skills Section Component
function SkillsSection({ skills }) {
  const skillCategories = skills.reduce((acc, skill) => {
    const category = skill.category || 'Other'
    if (!acc[category]) acc[category] = []
    acc[category].push(skill)
    return acc
  }, {})

  return (
    <section id="skills" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-16">
          <span className="text-purple-400 font-semibold text-sm uppercase tracking-wider">Skills</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">Technical Expertise</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Technologies and tools I work with to build amazing digital experiences.
          </p>
        </div>

        {Object.keys(skillCategories).length > 0 ? (
          <div className="space-y-12">
            {Object.entries(skillCategories).map(([category, categorySkills]) => (
              <div key={category}>
                <h3 className="text-2xl font-semibold text-white mb-8 text-center">{category}</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                  {categorySkills.map((skill) => (
                    <div key={skill.id} className="group bg-gray-800/50 border border-gray-700 rounded-xl p-6 text-center hover:border-purple-500/50 hover:bg-gray-700/50 transition-all duration-300">
                      {skill.icon_url ? (
                        <img src={skill.icon_url} alt={skill.name} className="w-12 h-12 mx-auto mb-4" />
                      ) : (
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                          <span className="material-symbols-outlined text-white">code</span>
                        </div>
                      )}
                      <h4 className="font-medium text-white group-hover:text-purple-300 transition-colors">{skill.name}</h4>
                      {skill.proficiency && (
                        <div className="mt-3">
                          <div className="bg-gray-600 h-2 rounded-full overflow-hidden">
                            <div 
                              className="bg-gradient-to-r from-purple-600 to-blue-600 h-full rounded-full transition-all duration-500"
                              style={{ width: `${skill.proficiency}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-400 mt-1 block">{skill.proficiency}%</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <span className="material-symbols-outlined text-6xl text-gray-600 mb-4 block">psychology</span>
            <p className="text-gray-500">No skills to display. Add some in the admin panel.</p>
          </div>
        )}
      </div>
    </section>
  )
}
// Contact Section Component
function ContactSection({ profile }) {
  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message')
    }

    try {
      const result = await submitContactMessage(data)
      
      if (result.ok) {
        alert('Message sent successfully!')
        e.target.reset()
      } else {
        throw new Error(result.error || 'Failed to send message')
      }
    } catch (error) {
      alert('Failed to send message. Please try again.')
    }
  }

  const socialLinks = [
    { name: 'LinkedIn', url: profile?.linkedin_url, icon: 'linkedin' },
    { name: 'GitHub', url: profile?.github_url, icon: 'github' },
    { name: 'Twitter', url: profile?.twitter_url, icon: 'twitter' },
    { name: 'YouTube', url: profile?.youtube_url, icon: 'youtube' }
  ].filter(link => link.url)

  return (
    <section id="contact" className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-16">
          <span className="text-purple-400 font-semibold text-sm uppercase tracking-wider">Contact</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">Let's Talk</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Have a project in mind or want to discuss opportunities? I'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-gray-700/30 border border-gray-600 rounded-2xl p-8">
            <h3 className="text-2xl font-semibold text-white mb-6">Send me a message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  required
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  placeholder="Project inquiry"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                <textarea
                  name="message"
                  required
                  rows={6}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none"
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-gray-700/30 border border-gray-600 rounded-2xl p-8">
              <h3 className="text-2xl font-semibold text-white mb-6">Get in touch</h3>
              <div className="space-y-4">
                {profile?.email && (
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                      <span className="material-symbols-outlined text-white text-lg">mail</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Email</p>
                      <a href={`mailto:${profile.email}`} className="text-purple-400 hover:text-purple-300">
                        {profile.email}
                      </a>
                    </div>
                  </div>
                )}
                
                {profile?.phone && (
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                      <span className="material-symbols-outlined text-white text-lg">call</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Phone</p>
                      <a href={`tel:${profile.phone}`} className="text-purple-400 hover:text-purple-300">
                        {profile.phone}
                      </a>
                    </div>
                  </div>
                )}
                
                {profile?.location && (
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                      <span className="material-symbols-outlined text-white text-lg">location_on</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Location</p>
                      <p className="text-purple-400">{profile.location}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Social Links */}
            {socialLinks.length > 0 && (
              <div className="bg-gray-700/30 border border-gray-600 rounded-2xl p-8">
                <h3 className="text-xl font-semibold text-white mb-6">Follow me</h3>
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 bg-gray-800/50 border border-gray-600 rounded-lg hover:border-purple-500/50 hover:bg-gray-700/50 transition-all duration-300"
                    >
                      <span className="material-symbols-outlined text-purple-400">{link.icon}</span>
                      <span className="text-white font-medium">{link.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}