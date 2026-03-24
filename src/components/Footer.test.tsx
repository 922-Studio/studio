import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Footer } from './Footer'

describe('Footer', () => {
  it('renders the copyright notice', () => {
    render(<Footer />)
    expect(screen.getByText(/2026 922-Studio/)).toBeInTheDocument()
  })

  it('renders the Next.js link', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: 'Next.js' })).toBeInTheDocument()
  })

  it('renders the Tailwind CSS link', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: 'Tailwind CSS' })).toBeInTheDocument()
  })

  it('renders the GitHub link', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: 'GitHub' })).toBeInTheDocument()
  })
})
