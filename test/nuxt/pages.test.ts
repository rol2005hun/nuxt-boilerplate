import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime';
import { ref } from 'vue';

import App from '@/app.vue';
import DefaultLayout from '@/layouts/default.vue';
import LoginPage from '@/pages/login.vue';
import IndexPage from '@/pages/index.vue';

const authState = {
  isAuthenticated: ref(false),
  currentUser: ref<{ name: string } | null>(null),
  isLoading: ref(false),
  error: ref<string | null>(null),
  login: vi.fn(async () => undefined),
  logout: vi.fn()
};

mockNuxtImport('useAuth', () => {
  return () => ({
    isAuthenticated: authState.isAuthenticated,
    currentUser: authState.currentUser,
    isLoading: authState.isLoading,
    error: authState.error,
    login: authState.login,
    logout: authState.logout
  });
});

beforeEach(() => {
  authState.isAuthenticated.value = false;
  authState.currentUser.value = null;
  authState.isLoading.value = false;
  authState.error.value = null;
  authState.login.mockClear();
  authState.logout.mockClear();
});

describe('App & Pages', () => {
  it('renders app.vue without crashing', async () => {
    const wrapper = await mountSuspended(App);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders index.vue without crashing', async () => {
    const wrapper = await mountSuspended(IndexPage);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders the login page', async () => {
    const wrapper = await mountSuspended(LoginPage);

    expect(wrapper.text()).toContain('Sign in');
    expect(wrapper.find('#email').exists()).toBe(true);
    expect(wrapper.find('#password').exists()).toBe(true);
  });

  it('submits the login form', async () => {
    const wrapper = await mountSuspended(LoginPage);

    await wrapper.get('#email').setValue('test@example.com');
    await wrapper.get('#password').setValue('secret123');
    await wrapper.get('form').trigger('submit.prevent');

    expect(authState.login).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'secret123'
    });
  });

  it('renders login error and loading state', async () => {
    authState.error.value = 'Invalid email or password. Please try again.';
    authState.isLoading.value = true;

    const wrapper = await mountSuspended(LoginPage);

    expect(wrapper.text()).toContain('Invalid email or password. Please try again.');
    expect(wrapper.text()).toContain('Signing in...');
  });

  it('renders the default layout shell', async () => {
    const wrapper = await mountSuspended(DefaultLayout, {
      slots: {
        default: () => 'Layout content'
      }
    });

    expect(wrapper.text()).toContain('Layout content');
    expect(wrapper.find('main.layout__main').exists()).toBe(true);
    expect(wrapper.find('.language-picker').exists()).toBe(true);
  });

  it('renders authenticated layout actions', async () => {
    authState.isAuthenticated.value = true;
    authState.currentUser.value = { name: 'Ada Lovelace' };

    const wrapper = await mountSuspended(DefaultLayout, {
      slots: {
        default: () => 'Layout content'
      }
    });

    expect(wrapper.text()).toContain('Ada Lovelace');
    expect(wrapper.find('button').exists()).toBe(true);
  });
});
