import { describe, it, expect } from 'vitest';
import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime';

import DocsOverview from '@/features/docs/components/DocsOverview.vue';
import DocsPage from '@/pages/docs.vue';

mockNuxtImport('useI18n', () => {
  return () => ({
    t: (key: string) => key
  });
});

describe('Docs feature', () => {
  it('renders docs page', async () => {
    const wrapper = await mountSuspended(DocsPage);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders docs overview section', async () => {
    const wrapper = await mountSuspended(DocsOverview);
    expect(wrapper.find('section').exists()).toBe(true);
  });
});
