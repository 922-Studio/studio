import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ProjectsSection } from './ProjectsSection'
import type { Project } from '@/lib/content'

const mockProjects: Project[] = [
  {
    slug: 'homeapi',
    name: 'HomeAPI',
    type: 'Backend',
    description: 'FastAPI backend.',
    techTags: ['Python', 'FastAPI'],
    url: 'https://lab-api.922-studio.com',
    status: 'active',
  },
  {
    slug: 'homeui',
    name: 'HomeUI',
    type: 'Frontend',
    description: 'React dashboard.',
    techTags: ['TypeScript', 'React'],
    url: 'https://lab.922-studio.com',
    status: 'active',
  },
  {
    slug: 'sweatvalley-bingo',
    name: 'Sweatvalley Bingo',
    type: 'Game',
    description: 'Multiplayer bingo.',
    techTags: ['Node.js', 'Socket.io'],
    url: 'https://sweatvalley-bingo.922-studio.com',
    status: 'active',
  },
  {
    slug: 'discord-bot',
    name: 'EggVault',
    type: 'App',
    description: 'Discord bot.',
    techTags: ['Python', 'discord.py'],
    status: 'active',
  },
]

describe('ProjectsSection', () => {
  it('renders the section heading', () => {
    render(<ProjectsSection projects={mockProjects} />)
    expect(screen.getByRole('heading', { name: 'Projects' })).toBeInTheDocument()
  })

  it('renders all project names', () => {
    render(<ProjectsSection projects={mockProjects} />)
    expect(screen.getByText('HomeAPI')).toBeInTheDocument()
    expect(screen.getByText('HomeUI')).toBeInTheDocument()
    expect(screen.getByText('Sweatvalley Bingo')).toBeInTheDocument()
    expect(screen.getByText('EggVault')).toBeInTheDocument()
  })

  it('renders filter buttons', () => {
    render(<ProjectsSection projects={mockProjects} />)
    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Backend' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Frontend' })).toBeInTheDocument()
  })

  it('filters by Backend type', () => {
    render(<ProjectsSection projects={mockProjects} />)
    fireEvent.click(screen.getByRole('button', { name: 'Backend' }))
    expect(screen.getByText('HomeAPI')).toBeInTheDocument()
    expect(screen.queryByText('HomeUI')).not.toBeInTheDocument()
  })

  it('shows all projects when All filter is selected', () => {
    render(<ProjectsSection projects={mockProjects} />)
    fireEvent.click(screen.getByRole('button', { name: 'Backend' }))
    fireEvent.click(screen.getByRole('button', { name: 'All' }))
    expect(screen.getByText('HomeAPI')).toBeInTheDocument()
    expect(screen.getByText('HomeUI')).toBeInTheDocument()
  })

  it('renders Visit links for projects with URLs', () => {
    render(<ProjectsSection projects={mockProjects} />)
    const visitLinks = screen.getAllByRole('link', { name: /Visit/i })
    expect(visitLinks.length).toBeGreaterThan(0)
  })

  it('renders tech tags', () => {
    render(<ProjectsSection projects={mockProjects} />)
    expect(screen.getAllByText('Python').length).toBeGreaterThan(0)
    expect(screen.getByText('FastAPI')).toBeInTheDocument()
  })
})
