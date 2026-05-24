import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useThemeStore } from '@/features/theme/stores/useThemeStore';
import { useTheme } from '@/features/theme/composables/useTheme';

describe('Theme Feature', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
    document.documentElement.style.removeProperty('--color-primary-h');
    document.documentElement.style.removeProperty('--color-primary-s');
    document.documentElement.style.removeProperty('--color-primary-l');
  });

  describe('useThemeStore', () => {
    it('initializes with default theme', () => {
      const store = useThemeStore();
      expect(store.themeId).toBe('default');
      expect(store.customColor).toBeNull();
    });

    it('sets theme and applies to dom', () => {
      const store = useThemeStore();
      store.setTheme('dark');
      expect(store.themeId).toBe('dark');
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
      expect(localStorage.getItem('theme-id')).toBe('dark');
    });

    it('sets custom color and applies to dom', () => {
      const store = useThemeStore();
      store.setCustomColor('#ff0000');
      expect(store.customColor?.hex).toBe('#ff0000');
      expect(store.customColor?.h).toBe(0);
      expect(store.customColor?.s).toBe(100);
      expect(store.customColor?.l).toBe(50);
      expect(document.documentElement.style.getPropertyValue('--color-primary-h')).toBe('0');
      expect(document.documentElement.style.getPropertyValue('--color-primary-s')).toBe('100%');
      expect(document.documentElement.style.getPropertyValue('--color-primary-l')).toBe('50%');
      expect(localStorage.getItem('theme-custom-color')).toBe('#ff0000');
    });

    it('resets custom color', () => {
      const store = useThemeStore();
      store.setCustomColor('#ff0000');
      store.resetCustomColor();
      expect(store.customColor).toBeNull();
      expect(document.documentElement.style.getPropertyValue('--color-primary-h')).toBe('');
      expect(localStorage.getItem('theme-custom-color')).toBeNull();
    });

    it('initializes from localStorage', () => {
      localStorage.setItem('theme-id', 'ocean');
      localStorage.setItem('theme-custom-color', '#00ff00');
      const store = useThemeStore();
      store.initialize();
      expect(store.themeId).toBe('ocean');
      expect(store.customColor?.hex).toBe('#00ff00');
      expect(document.documentElement.getAttribute('data-theme')).toBe('ocean');
      expect(document.documentElement.style.getPropertyValue('--color-primary-h')).toBe('120');
    });

    it('initializes without localStorage applies default', () => {
      const store = useThemeStore();
      store.initialize();
      expect(document.documentElement.getAttribute('data-theme')).toBe('default');
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
