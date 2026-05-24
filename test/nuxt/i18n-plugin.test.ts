import { describe, it, expect, vi } from 'vitest';
import i18nPlugin from '@/plugins/i18n-locales';

describe('i18n-locales plugin', () => {
  it('merges locale messages correctly', () => {
    const mergeLocaleMessage = vi.fn();
    const nuxtApp = {
      $i18n: {
        mergeLocaleMessage
      }
    };

    // Call the plugin setup manually to trigger coverage and logic
    /* eslint-disable @typescript-eslint/no-explicit-any */
    if (typeof i18nPlugin === 'function') {
      // Fallback if defineNuxtPlugin returns a function
      (i18nPlugin as any)(nuxtApp as any);
    } else if (i18nPlugin && typeof i18nPlugin === 'object' && (i18nPlugin as any).setup) {
      (i18nPlugin as any).setup(nuxtApp as any);
    }
    /* eslint-enable @typescript-eslint/no-explicit-any */

    // Since it globs the actual files, we know it should call mergeLocaleMessage at least once
    expect(mergeLocaleMessage).toHaveBeenCalled();
    // Verify it passes 'en' as the locale
    expect(mergeLocaleMessage).toHaveBeenCalledWith('en', expect.any(Object));
  });
});
