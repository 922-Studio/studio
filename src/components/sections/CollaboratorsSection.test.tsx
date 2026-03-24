import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { CollaboratorsSection } from './CollaboratorsSection'

vi.mock('@/lib/content', () => ({
  getPeople: () => [
    {
      slug: 'gregor',
      name: 'Gregor Krykon',
      role: 'Full-Stack Developer & Infrastructure Lead',
      bio: 'Started coding at 15.',
      portfolioUrl: 'https://gregor.922-studio.com',
      order: 1,
    },
    {
      slug: 'iustus',
      name: 'Iustus Krykon',
      role: 'Junior Hobby Developer',
      bio: 'Building ANIZO.',
      portfolioUrl: 'https://iustus.922-studio.com',
      order: 2,
    },
  ],
}))

describe('CollaboratorsSection', () => {
  it('renders the section heading', () => {
    render(<CollaboratorsSection />)
    expect(screen.getByRole('heading', { name: 'The Team' })).toBeInTheDocument()
  })

  it('renders Gregor Krykon card', () => {
    render(<CollaboratorsSection />)
    expect(screen.getByText('Gregor Krykon')).toBeInTheDocument()
  })

  it('renders Iustus Krykon card', () => {
    render(<CollaboratorsSection />)
    expect(screen.getByText('Iustus Krykon')).toBeInTheDocument()
  })

  it('renders collaborator roles', () => {
    render(<CollaboratorsSection />)
    expect(screen.getByText('Full-Stack Developer & Infrastructure Lead')).toBeInTheDocument()
    expect(screen.getByText('Junior Hobby Developer')).toBeInTheDocument()
  })

  it('renders portfolio links', () => {
    render(<CollaboratorsSection />)
    const links = screen.getAllByRole('link', { name: /Portfolio/i })
    expect(links.length).toBeGreaterThanOrEqual(2)
  })

  it('portfolio links point to correct URLs', () => {
    render(<CollaboratorsSection />)
    const links = screen.getAllByRole('link', { name: /Portfolio/i })
    const hrefs = links.map(l => l.getAttribute('href'))
    expect(hrefs).toContain('https://gregor.922-studio.com')
    expect(hrefs).toContain('https://iustus.922-studio.com')
  })
})
