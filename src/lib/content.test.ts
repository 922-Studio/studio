import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { Mock } from 'vitest'

// ---------------------------------------------------------------------------
// Mock 'fs' and 'gray-matter' before importing the module under test.
// ---------------------------------------------------------------------------
vi.mock('fs')
vi.mock('gray-matter')
vi.mock('reading-time', () => ({
  default: () => ({ text: '1 min read' }),
}))

import fs from 'fs'
import matter from 'gray-matter'

const mockExistsSync = fs.existsSync as Mock
const mockReaddirSync = fs.readdirSync as Mock
const mockReadFileSync = fs.readFileSync as Mock
const mockMatter = matter as unknown as Mock

beforeEach(() => {
  vi.resetAllMocks()
})

describe('getPeople', () => {
  it('returns empty array when directory does not exist', async () => {
    mockExistsSync.mockReturnValue(false)
    const { getPeople } = await import('./content')
    expect(getPeople()).toEqual([])
  })

  it('returns parsed people sorted by order', async () => {
    mockExistsSync.mockReturnValue(true)
    mockReaddirSync.mockReturnValue(['iustus.mdx', 'gregor.mdx'])
    mockReadFileSync.mockReturnValue('')
    mockMatter
      .mockReturnValueOnce({
        data: { name: 'Iustus', role: 'Junior', bio: 'Bio', portfolioUrl: 'https://i.com', order: 2 },
        content: '',
      })
      .mockReturnValueOnce({
        data: { name: 'Gregor', role: 'Lead', bio: 'Bio', portfolioUrl: 'https://g.com', order: 1 },
        content: '',
      })

    const { getPeople } = await import('./content')
    const people = getPeople()
    expect(people[0].name).toBe('Gregor')
    expect(people[1].name).toBe('Iustus')
  })
})

describe('getTimelineEntries', () => {
  it('returns entries sorted by date descending', async () => {
    mockExistsSync.mockReturnValue(true)
    mockReaddirSync.mockReturnValue(['old.mdx', 'new.mdx'])
    mockReadFileSync.mockReturnValue('')
    mockMatter
      .mockReturnValueOnce({
        data: { date: '2025-01-01', title: 'Old', description: 'D', tags: [] },
        content: '',
      })
      .mockReturnValueOnce({
        data: { date: '2026-03-24', title: 'New', description: 'D', tags: [] },
        content: '',
      })

    const { getTimelineEntries } = await import('./content')
    const entries = getTimelineEntries()
    expect(entries[0].title).toBe('New')
    expect(entries[1].title).toBe('Old')
  })
})

describe('getProjects', () => {
  it('returns project data from MDX frontmatter', async () => {
    mockExistsSync.mockReturnValue(true)
    mockReaddirSync.mockReturnValue(['homeapi.mdx'])
    mockReadFileSync.mockReturnValue('')
    mockMatter.mockReturnValueOnce({
      data: {
        name: 'HomeAPI',
        type: 'Backend',
        description: 'FastAPI backend.',
        techTags: ['Python', 'FastAPI'],
        url: 'https://lab-api.922-studio.com',
        status: 'active',
      },
      content: '',
    })

    const { getProjects } = await import('./content')
    const projects = getProjects()
    expect(projects[0].name).toBe('HomeAPI')
    expect(projects[0].type).toBe('Backend')
    expect(projects[0].techTags).toContain('Python')
  })
})

describe('getBlogPosts', () => {
  it('returns blog posts sorted by date descending', async () => {
    mockExistsSync.mockReturnValue(true)
    mockReaddirSync.mockReturnValue(['old-post.mdx', 'new-post.mdx'])
    mockReadFileSync.mockReturnValue('')
    mockMatter
      .mockReturnValueOnce({
        data: {
          title: 'Old Post',
          date: '2025-01-01',
          excerpt: 'Old',
          tags: [],
          author: 'Gregor',
        },
        content: 'Old content',
      })
      .mockReturnValueOnce({
        data: {
          title: 'New Post',
          date: '2026-03-24',
          excerpt: 'New',
          tags: [],
          author: 'Gregor',
        },
        content: 'New content',
      })

    const { getBlogPosts } = await import('./content')
    const posts = getBlogPosts()
    expect(posts[0].title).toBe('New Post')
    expect(posts[1].title).toBe('Old Post')
  })
})

describe('getBlogPost', () => {
  it('returns a post by slug', async () => {
    mockExistsSync.mockReturnValue(true)
    mockReaddirSync.mockReturnValue(['welcome.mdx'])
    mockReadFileSync.mockReturnValue('')
    mockMatter.mockReturnValueOnce({
      data: {
        title: 'Welcome',
        date: '2026-03-24',
        excerpt: 'Hello',
        tags: [],
        author: 'Gregor',
      },
      content: 'Content here',
    })

    const { getBlogPost } = await import('./content')
    const post = getBlogPost('welcome')
    expect(post?.title).toBe('Welcome')
    expect(post?.slug).toBe('welcome')
  })

  it('returns undefined for unknown slug', async () => {
    mockExistsSync.mockReturnValue(true)
    mockReaddirSync.mockReturnValue(['welcome.mdx'])
    mockReadFileSync.mockReturnValue('')
    mockMatter.mockReturnValueOnce({
      data: {
        title: 'Welcome',
        date: '2026-03-24',
        excerpt: 'Hello',
        tags: [],
        author: 'Gregor',
      },
      content: 'Content here',
    })

    const { getBlogPost } = await import('./content')
    expect(getBlogPost('not-found')).toBeUndefined()
  })
})
