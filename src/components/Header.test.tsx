import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from './ThemeProvider'
import { Header } from './Header'

function renderHeader() {
  return render(
    <ThemeProvider>
      <Header />
    </ThemeProvider>,
  )
}

describe('Header', () => {
  it('renders the Home nav link', () => {
    renderHeader()
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument()
  })

  it('renders the Blog nav link', () => {
    renderHeader()
    expect(screen.getByRole('link', { name: 'Blog' })).toBeInTheDocument()
  })

  it('renders the GitHub link', () => {
    renderHeader()
    expect(screen.getByRole('link', { name: 'GitHub' })).toBeInTheDocument()
  })

  it('GitHub link points to 922-Studio', () => {
    renderHeader()
    const githubLink = screen.getByRole('link', { name: 'GitHub' })
    expect(githubLink).toHaveAttribute('href', 'https://github.com/922-Studio')
  })
})
