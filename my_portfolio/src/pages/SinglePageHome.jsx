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
    <section id="home" className="min-h-[80vh] relative flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-10">
          <div className="grid grid-cols-12 gap-2">
            {Array.from({ length: 144 }).map((_, i) => (
              <div key={i} className="w-1 h-1 bg-blue-400 rounded-full opacity-20"></div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Content */}
          <div className="lg:col-span-7">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-4">
              {tagline}
            </h1>
            
            <p className="text-base md:text-lg text-gray-300 leading-relaxed mb-6 max-w-2xl">
              {description}
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              <button 
                onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg"
              >
                View my work
              </button>
              <button 
                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-blue-400 text-blue-400 px-6 py-3 rounded-full font-semibold hover:bg-blue-400 hover:text-white transition-all duration-300"
              >
                Get in touch
              </button>
            </div>

            {/* Status Indicator */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-400">Open to internships and junior developer roles</span>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-3">
              {['Python', 'Flask', 'React', 'Supabase', 'Docker', 'Scikit-learn'].map(tech => (
                <span key={tech} className="px-3 py-1.5 bg-gray-800/50 border border-blue-700 rounded-full text-sm text-gray-300">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Right Content - Profile Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative">
              {/* Profile Image with Gradient Border */}
              <div className="relative z-10">
                <div className="w-64 h-64 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 p-1">
                  <div className="w-full h-full rounded-full overflow-hidden bg-gray-800 flex items-center justify-center">
                    {profile?.avatar_url ? (
                      <img 
                        src={profile.avatar_url} 
                        alt={name} 
                        className="w-full h-full object-cover rounded-full" 
                      />
                    ) : (
                      <span className="material-symbols-outlined text-6xl text-gray-400">person</span>
                    )}
                  </div>
                </div>
              </div>
                
              {/* Floating Info Cards - Repositioned */}
              <div className="absolute -right-8 top-6 bg-gray-800/90 backdrop-blur border border-gray-700 rounded-xl p-3 min-w-44 z-20">
                <div className="text-xs text-gray-400 mb-1">Shipped at WeConnectInnovation</div>
                <div className="text-white font-medium text-sm">Hotel Booking System</div>
                <div className="text-xs text-gray-400">Vercel + Railway</div>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                  <span className="text-xs text-green-400">Live</span>
                </div>
              </div>

              <div className="absolute -left-8 bottom-6 bg-gray-800/90 backdrop-blur border border-gray-700 rounded-xl p-3 min-w-36 z-20">
                <div className="text-xs text-gray-400 mb-1">Project hosting</div>
                <div className="text-white font-medium text-sm">Prompt Vault</div>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                  <span className="text-xs text-green-400">Live</span>
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
    <section id="about" className="py-12 bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <span className="text-blue-400 font-semibold text-sm uppercase tracking-wider">About me</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-4">Who I Am</h2>
          <p className="text-gray-400 text-base max-w-2xl mx-auto">
            Get to know more about my background, skills, and what drives my passion for technology.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-8">
            <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-2xl p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-700 flex items-center justify-center shrink-0">
                  {profile?.avatar_url ? (
                    <img src={profile.avatar_url} alt={name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="material-symbols-outlined text-3xl text-gray-400">person</span>
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{name}</h3>
                  <p className="text-blue-400 font-medium">{profile?.tagline || 'Software Developer'}</p>
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
                <div className="mt-6">
                  <h4 className="text-base font-semibold text-white mb-3">Core Expertise</h4>
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
            <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-2xl p-6 h-full">
              <h4 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-blue-400">school</span>
                Education
              </h4>
              
              <div className="space-y-6">
                {education.length > 0 ? (
                  education.map((item, index) => (
                    <div key={item.id} className="relative">
                      <div className="flex items-start gap-4">
                        <div className={`w-3 h-3 rounded-full mt-1 ${index === 0 ? 'bg-blue-500' : 'bg-gray-600'}`}></div>
                        <div>
                          <p className="text-blue-400 text-sm font-medium">{item.period}</p>
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
                    <span className="material-symbols-outlined text-blue-400 text-lg">workspace_premium</span>
                    Honors & Awards
                  </h5>
                  <div className="space-y-2">
                    {honors.map((honor) => (
                      <div key={honor.id} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
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
    <section id="experience" className="py-12 bg-gray-800">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <span className="text-blue-400 font-semibold text-sm uppercase tracking-wider">Experience</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-4">My Journey</h2>
          <p className="text-gray-400 text-base max-w-2xl mx-auto">
            A timeline of my educational and professional experiences in software development.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-600"></div>
            
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <div key={index} className="relative flex items-start gap-6">
                  {/* Timeline dot */}
                  <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center ${
                    index === 0 ? 'bg-gradient-to-r from-blue-600 to-indigo-600' : 'bg-gray-600'
                  }`}>
                    <span className="material-symbols-outlined text-white">
                      {exp.type === 'Work' ? 'work' : 'school'}
                    </span>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 bg-gray-700/30 border border-gray-600 rounded-xl p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{exp.title}</h3>
                        <p className="text-blue-400 font-medium">{exp.company}</p>
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
    <section id="projects" className="py-12 bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <span className="text-blue-400 font-semibold text-sm uppercase tracking-wider">Projects</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-4">Featured Work</h2>
          <p className="text-gray-400 text-base max-w-2xl mx-auto">
            A showcase of my recent projects and technical implementations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.length > 0 ? (
            projects.slice(0, 6).map((project) => (
              <div key={project.id} className="group bg-gray-800/50 backdrop-blur border border-gray-700 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-300">
                {project.image_url && (
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={project.image_url} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-blue-600/20 text-blue-300 text-xs rounded-full">
                      {project.category || 'Web App'}
                    </span>
                    {project.live_url && (
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-xs text-green-400">Live</span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-base font-semibold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-3 line-clamp-2">{project.description}</p>
                  
                  {project.technologies && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
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
                        className="text-blue-400 hover:text-white transition-colors"
                      >
                        <span className="material-symbols-outlined">open_in_new</span>
                      </a>
                    )}
                    {project.github_url && (
                      <a 
                        href={project.github_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-white transition-colors"
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
    <section id="services" className="py-12 bg-gray-800">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <span className="text-blue-400 font-semibold text-sm uppercase tracking-wider">Services</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-4">What I Offer</h2>
          <p className="text-gray-400 text-base max-w-2xl mx-auto">
            Professional services and solutions I provide to help bring your ideas to life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.length > 0 ? (
            services.map((service, index) => (
              <div key={service.id} className="bg-gray-700/30 border border-gray-600 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mb-6">
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
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
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
              <div key={index} className="bg-gray-700/30 border border-gray-600 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mb-6">
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

  // Default skills if none exist
  const defaultSkills = {
    'Frontend': [
      { id: 1, name: 'React', proficiency: 90, icon_url: null },
      { id: 2, name: 'JavaScript', proficiency: 85, icon_url: null },
      { id: 3, name: 'HTML/CSS', proficiency: 95, icon_url: null },
      { id: 4, name: 'Tailwind CSS', proficiency: 88, icon_url: null }
    ],
    'Backend': [
      { id: 5, name: 'Python', proficiency: 92, icon_url: null },
      { id: 6, name: 'Flask', proficiency: 80, icon_url: null },
      { id: 7, name: 'Node.js', proficiency: 75, icon_url: null },
      { id: 8, name: 'Supabase', proficiency: 85, icon_url: null }
    ],
    'Data Science': [
      { id: 9, name: 'Pandas', proficiency: 88, icon_url: null },
      { id: 10, name: 'Scikit-learn', proficiency: 82, icon_url: null },
      { id: 11, name: 'NumPy', proficiency: 85, icon_url: null }
    ],
    'Tools': [
      { id: 12, name: 'Docker', proficiency: 75, icon_url: null },
      { id: 13, name: 'Git', proficiency: 90, icon_url: null },
      { id: 14, name: 'VS Code', proficiency: 95, icon_url: null }
    ]
  }

  const displaySkills = Object.keys(skillCategories).length > 0 ? skillCategories : defaultSkills

  return (
    <section id="skills" className="py-12 bg-gray-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-4">
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
            <span className="text-blue-400 font-semibold text-sm uppercase tracking-wider">Skills</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-4">Technical Expertise</h2>
          <p className="text-gray-400 text-base max-w-2xl mx-auto">
            Technologies and tools I work with to build amazing digital experiences.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="space-y-10">
          {Object.entries(displaySkills).map(([category, categorySkills]) => (
            <div key={category} className="skill-category">
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
                <div className="bg-gray-800/50 backdrop-blur border border-blue-500/20 rounded-full px-6 py-2">
                  <h3 className="text-xl font-semibold text-white">{category}</h3>
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-blue-500/30 via-transparent to-transparent"></div>
              </div>

              {/* Skills Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {categorySkills.map((skill, index) => (
                  <div
                    key={skill.id}
                    className="group skill-card bg-gray-800/30 backdrop-blur border border-gray-700/50 rounded-2xl p-6 hover:border-blue-500/50 hover:bg-gray-700/30 transition-all duration-300 hover:transform hover:-translate-y-2"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Skill Icon */}
                    <div className="relative mb-4">
                      {skill.icon_url ? (
                        <div className="w-14 h-14 rounded-xl overflow-hidden mx-auto bg-gray-700/50 flex items-center justify-center">
                          <img src={skill.icon_url} alt={skill.name} className="w-10 h-10" />
                        </div>
                      ) : (
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                          <span className="material-symbols-outlined text-white text-2xl">code</span>
                        </div>
                      )}
                      {/* Floating badge */}
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="material-symbols-outlined text-white text-xs">star</span>
                      </div>
                    </div>

                    {/* Skill Name */}
                    <h4 className="font-semibold text-white text-center mb-4 group-hover:text-blue-300 transition-colors">
                      {skill.name}
                    </h4>

                    {/* Progress Bar */}
                    {skill.proficiency && (
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-400">Proficiency</span>
                          <span className="text-blue-400 font-medium">{skill.proficiency}%</span>
                        </div>
                        <div className="relative">
                          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-1000 ease-out skill-progress"
                              style={{ 
                                width: `${skill.proficiency}%`,
                                '--progress-width': `${skill.proficiency}%`
                              }}
                            >
                              <div className="h-full bg-white/20 animate-pulse"></div>
                            </div>
                          </div>
                          {/* Glow effect */}
                          <div 
                            className="absolute top-0 h-2 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full opacity-50 blur-sm transition-all duration-1000 ease-out"
                            style={{ width: `${skill.proficiency}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    {/* Skill Level Badge */}
                    <div className="mt-4 text-center">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        (skill.proficiency || 80) >= 90 ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                        (skill.proficiency || 80) >= 75 ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                        'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                      }`}>
                        {(skill.proficiency || 80) >= 90 ? 'Expert' : (skill.proficiency || 80) >= 75 ? 'Advanced' : 'Intermediate'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-blue-600/10 to-indigo-600/10 border border-blue-500/20 rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-white mb-4">Ready to work together?</h3>
            <p className="text-gray-400 mb-6">Let's build something amazing with these technologies.</p>
            <button
              onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
            >
              Start a project
            </button>
          </div>
        </div>
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
    <section id="contact" className="py-12 bg-gray-800">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <span className="text-blue-400 font-semibold text-sm uppercase tracking-wider">Contact</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-4">Let's Talk</h2>
          <p className="text-gray-400 text-base max-w-2xl mx-auto">
            Have a project in mind or want to discuss opportunities? I'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-gray-700/30 border border-gray-600 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Send me a message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2.5 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2.5 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
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
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="Project inquiry"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                <textarea
                  name="message"
                  required
                  rows={6}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-2.5 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-gray-700/30 border border-gray-600 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Get in touch</h3>
              <div className="space-y-3">
                {profile?.email && (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                      <span className="material-symbols-outlined text-white text-base">mail</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Email</p>
                      <a href={`mailto:${profile.email}`} className="text-blue-400 hover:text-blue-300">
                        {profile.email}
                      </a>
                    </div>
                  </div>
                )}
                
                {profile?.phone && (
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                      <span className="material-symbols-outlined text-white text-lg">call</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Phone</p>
                      <a href={`tel:${profile.phone}`} className="text-blue-400 hover:text-blue-300">
                        {profile.phone}
                      </a>
                    </div>
                  </div>
                )}
                
                {profile?.location && (
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                      <span className="material-symbols-outlined text-white text-lg">location_on</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Location</p>
                      <p className="text-blue-400">{profile.location}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Social Links */}
            {socialLinks.length > 0 && (
              <div className="bg-gray-700/30 border border-gray-600 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Follow me</h3>
                <div className="grid grid-cols-2 gap-3">
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-3 bg-gray-800/50 border border-gray-600 rounded-lg hover:border-blue-500/50 hover:bg-gray-700/50 transition-all duration-300"
                    >
                      <span className="material-symbols-outlined text-blue-400">{link.icon}</span>
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