import { beforeAll } from 'vitest';

beforeAll(() => {
  const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => {
        store[key] = value.toString();
      },
      /* eslint-disable @typescript-eslint/no-dynamic-delete */
      removeItem: (key: string) => {
        delete store[key];
      },
      /* eslint-enable @typescript-eslint/no-dynamic-delete */
      clear: () => {
        store = {};
      }
    };
  })();

  if (typeof globalThis !== 'undefined') {
    Object.defineProperty(globalThis, 'localStorage', { value: localStorageMock, writable: true });
  }
  if (typeof window !== 'undefined') {
    Object.defineProperty(window, 'localStorage', { value: localStorageMock, writable: true });
  }
});
