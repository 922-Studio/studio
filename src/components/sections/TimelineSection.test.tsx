import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TimelineSection } from './TimelineSection'

vi.mock('@/lib/content', () => ({
  getTimelineEntries: () => [
    {
      slug: '2026-03-server-expansion',
      date: '2026-03-24',
      title: '3-Server Lab Expansion',
      description: 'Acquired 3 new servers.',
      tags: ['infrastructure', 'hardware'],
    },
    {
      slug: '2025-10-homelab-launch',
      date: '2025-10-01',
      title: 'HomeLab Goes Live',
      description: 'Self-hosted home server.',
      tags: ['infrastructure', 'milestone'],
    },
  ],
}))

describe('TimelineSection', () => {
  it('renders the section heading', () => {
    render(<TimelineSection />)
    expect(screen.getByRole('heading', { name: 'Timeline' })).toBeInTheDocument()
  })

  it('renders timeline entry titles', () => {
    render(<TimelineSection />)
    expect(screen.getByText('3-Server Lab Expansion')).toBeInTheDocument()
    expect(screen.getByText('HomeLab Goes Live')).toBeInTheDocument()
  })

  it('renders timeline entry descriptions', () => {
    render(<TimelineSection />)
    expect(screen.getByText('Acquired 3 new servers.')).toBeInTheDocument()
  })

  it('renders tags as pills', () => {
    render(<TimelineSection />)
    expect(screen.getAllByText('infrastructure').length).toBeGreaterThan(0)
    expect(screen.getByText('hardware')).toBeInTheDocument()
  })
})
