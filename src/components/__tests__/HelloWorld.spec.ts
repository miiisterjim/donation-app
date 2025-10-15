import { describe, it, vi, expect, afterEach, beforeEach } from 'vitest'

import { flushPromises, mount } from '@vue/test-utils'
import HelloWorld from '../HelloWorld.vue'

function createMockFetchResponse<T>(data: T, init: ResponseInit = { status: 200 }) {
  const headers = new Headers({ 'Content-Type': 'application/json' })
  return {
    ok: true,
    status: init.status,
    headers,
    json: async () => data,
  } as unknown as Response
}

describe('HelloWorld', () => {
  const name = 'James'

  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockResolvedValue(
          createMockFetchResponse({ message: `Hello ${name}` }) as unknown as Response,
        ),
    )
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it('populates the <h1> with the provided name', async () => {
    const wrapper = mount(HelloWorld, { props: { name: name } })

    // wait for onMounted -> fetch -> state update
    await flushPromises()

    // Assert fetch was called (optionally with the expected URL)
    expect(globalThis.fetch).toHaveBeenCalled()
    expect(globalThis.fetch).toHaveBeenCalledWith(`/api/message?name=${name}`)

    // Assert the H1 contains the mocked text
    const h1 = wrapper.get('h1')
    expect(h1.text()).toBe(`Hello ${name}`)
  })
})
