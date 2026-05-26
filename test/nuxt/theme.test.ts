import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { nextTick } from 'vue';
import { useThemeStore } from '@/features/theme/stores/useThemeStore';
import { useTheme } from '@/features/theme/composables/useTheme';

function clearCookie(name: string): void {
  document.cookie = `${name}=; Max-Age=0; path=/`;
}

describe('Theme Feature', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    document.documentElement.removeAttribute('data-theme');
    document.documentElement.style.removeProperty('--color-primary-h');
    document.documentElement.style.removeProperty('--color-primary-s');
    document.documentElement.style.removeProperty('--color-primary-l');

    clearCookie('theme-id');
    clearCookie('theme-custom-color');
  });

  describe('useThemeStore', () => {
    it('initializes with default theme', () => {
      const store = useThemeStore();
      expect(store.themeId).toBe('default');
      expect(store.customColor).toBeNull();
    });

    it('sets theme and applies to dom', async () => {
      const store = useThemeStore();
      store.setTheme('dark');
      await nextTick();
      expect(store.themeId).toBe('dark');
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    });

    it('sets custom color and applies to dom', async () => {
      const store = useThemeStore();
      store.setCustomColor('#ff0000');
      await nextTick();
      expect(store.customColor?.hex).toBe('#ff0000');
      expect(store.customColor?.h).toBe(0);
      expect(store.customColor?.s).toBe(100);
      expect(store.customColor?.l).toBe(50);
      expect(document.documentElement.style.getPropertyValue('--color-primary-h')).toBe('0');
      expect(document.documentElement.style.getPropertyValue('--color-primary-s')).toBe('100%');
      expect(document.documentElement.style.getPropertyValue('--color-primary-l')).toBe('50%');
      expect(document.documentElement.style.getPropertyValue('--color-primary-foreground')).toBe(
        '#0f172a'
      );
    });

    it('resets custom color', async () => {
      const store = useThemeStore();
      store.setCustomColor('#ff0000');
      store.resetCustomColor();
      await nextTick();
      expect(store.customColor).toBeNull();
      expect(document.documentElement.style.getPropertyValue('--color-primary-h')).toBe('');
      expect(document.documentElement.style.getPropertyValue('--color-primary-foreground')).toBe(
        ''
      );
    });

    it('initializes without cookie applies default', () => {
      const store = useThemeStore();
      store.initialize();
      expect(document.documentElement.getAttribute('data-theme')).toBe('default');
    });

    it('initializes from theme cookie', () => {
      document.cookie = 'theme-id=dark; path=/';

      const store = useThemeStore();
      store.initialize();

      expect(store.themeId).toBe('dark');
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    });
  });

  describe('useTheme', () => {
    it('exposes store methods and state', () => {
      const { themeId, customColor, themes, setTheme, setCustomColor, resetCustomColor } =
        useTheme();
      expect(themeId.value).toBe('default');
      expect(customColor.value).toBeNull();
      expect(themes.length).toBe(3);

      setTheme('dark');
      expect(themeId.value).toBe('dark');

      setCustomColor('#ff0000');
      expect(customColor.value?.hex).toBe('#ff0000');

      resetCustomColor();
      expect(customColor.value).toBeNull();
    });
  });
});
