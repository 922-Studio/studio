import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { HeroSection } from './HeroSection'

describe('HeroSection', () => {
  it('renders the studio title', () => {
    render(<HeroSection />)
    expect(screen.getByRole('heading', { name: '922-Studio' })).toBeInTheDocument()
  })

  it('renders the tagline', () => {
    render(<HeroSection />)
    expect(screen.getByText('A small group of hobby developers building real things.')).toBeInTheDocument()
  })

  it('renders the subtitle', () => {
    render(<HeroSection />)
    expect(screen.getByText('Web apps, APIs, games, and self-hosted infrastructure — shipped and running.')).toBeInTheDocument()
  })
})
