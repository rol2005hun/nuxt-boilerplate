import type { ThemeId, CustomColor } from '../types/theme.types';

import { getReadableForegroundColor } from '@/utils/color';

function readCookieValue(name: string): string | null {
  if (!import.meta.client) {
    return null;
  }

  const cookie = document.cookie.split('; ').find((entry) => entry.startsWith(`${name}=`));

  if (!cookie) {
    return null;
  }

  const value = decodeURIComponent(cookie.slice(name.length + 1));
  return value.length > 0 ? value : null;
}

function parseThemeId(value: string | null): ThemeId | null {
  if (value === 'default' || value === 'dark' || value === 'ocean') {
    return value;
  }

  return null;
}

function parseCustomColor(value: string | null): CustomColor | null {
  if (!value) {
    return null;
  }

  return { hex: value, ...hexToHsl(value) };
}

export const useThemeStore = defineStore('theme', () => {
  const themeIdCookie = useCookie<ThemeId>('theme-id', {
    default: () => 'default',
    maxAge: 60 * 60 * 24 * 365
  });
  const customColorCookie = useCookie<string | null>('theme-custom-color', {
    default: () => null,
    maxAge: 60 * 60 * 24 * 365
  });

  const initialThemeId: ThemeId = parseThemeId(readCookieValue('theme-id')) ?? 'default';
  const themeId = ref<ThemeId>(initialThemeId);

  const initialCustom = parseCustomColor(readCookieValue('theme-custom-color'));
  const customColor = ref<CustomColor | null>(initialCustom);

  watch(themeId, (value) => {
    themeIdCookie.value = value;
  });

  watch(customColor, (value) => {
    customColorCookie.value = value?.hex ?? null;
  });

  function applyThemeToDom(id: ThemeId) {
    document.documentElement.setAttribute('data-theme', id);
  }

  function applyColorToDom(color: CustomColor) {
    const el = document.documentElement;
    el.style.setProperty('--color-primary-h', String(color.h));
    el.style.setProperty('--color-primary-s', `${color.s}%`);
    el.style.setProperty('--color-primary-l', `${color.l}%`);
    el.style.setProperty('--color-primary-foreground', getReadableForegroundColor(color.hex));
  }

  function setTheme(id: ThemeId) {
    themeId.value = id;
    if (import.meta.client) {
      document.documentElement.classList.add('no-transition');
      applyThemeToDom(id);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          document.documentElement.classList.remove('no-transition');
        });
      });
    }
  }

  function setCustomColor(hex: string) {
    const hsl = hexToHsl(hex);
    const color: CustomColor = { hex, ...hsl };
    customColor.value = color;
    if (import.meta.client) applyColorToDom(color);
  }

  function resetCustomColor() {
    customColor.value = null;
    if (import.meta.client) {
      const el = document.documentElement;
      el.style.removeProperty('--color-primary-h');
      el.style.removeProperty('--color-primary-s');
      el.style.removeProperty('--color-primary-l');
      el.style.removeProperty('--color-primary-foreground');
    }
  }

  function initialize() {
    if (!import.meta.client) {
      return;
    }

    applyThemeToDom(themeId.value);

    if (customColor.value) {
      applyColorToDom(customColor.value);
    }
  }

  return { themeId, customColor, setTheme, setCustomColor, resetCustomColor, initialize };
});
