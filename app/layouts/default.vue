<script setup lang="ts">
import AppLanguagePicker from '@/components/shared/LanguagePicker.vue';

const { themeId, themes, setTheme } = useTheme();
const { isAuthenticated, currentUser, logout } = useAuth();

const themeOpen = ref(false);
const themeBtn = ref<HTMLElement | null>(null);

function toggleTheme() {
  themeOpen.value = !themeOpen.value;
}

function selectTheme(id: string) {
  setTheme(id as Parameters<typeof setTheme>[0]);
  themeOpen.value = false;
}

function handleThemeKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') themeOpen.value = false;
}

onClickOutside(themeBtn, () => {
  themeOpen.value = false;
});
</script>

<template>
  <div class="layout">
    <header class="layout__header">
      <nav class="layout__nav">
        <NuxtLink to="/" class="layout__logo">
          {{ $t('core.appName') }}
        </NuxtLink>

        <div class="layout__nav-actions">
          <AppButton href="/docs" variant="ghost">{{ $t('docs.nav') }}</AppButton>

          <div ref="themeBtn" class="theme-picker" @keydown="handleThemeKeydown">
            <button
              id="theme-toggle-btn"
              class="theme-picker__trigger"
              :aria-expanded="themeOpen"
              aria-label="Change theme"
              type="button"
              @click="toggleTheme">
              <AppIcon :name="themes.find((t) => t.id === themeId)?.icon ?? 'ph:palette'" />
              <AppIcon
                name="ph:caret-down"
                class="theme-picker__caret"
                :class="{ 'theme-picker__caret--open': themeOpen }" />
            </button>

            <Transition name="theme-popup">
              <div
                v-if="themeOpen"
                class="theme-picker__popup"
                role="listbox"
                aria-label="Select theme">
                <div class="theme-picker__header">{{ $t('core.layout.theme') }}</div>
                <div class="theme-picker__options">
                  <button
                    v-for="theme in themes"
                    :id="`theme-opt-${theme.id}`"
                    :key="theme.id"
                    type="button"
                    class="theme-picker__option"
                    :class="{
                      'theme-picker__option--active': themeId === theme.id,
                      'theme-picker__option--dark': theme.dark
                    }"
                    role="option"
                    :aria-selected="themeId === theme.id"
                    @click="selectTheme(theme.id)">
                    <AppIcon :name="theme.icon" class="theme-picker__option-icon" />
                    <span class="theme-picker__option-label">{{ theme.label }}</span>
                    <AppIcon
                      v-if="themeId === theme.id"
                      name="ph:check-bold"
                      class="theme-picker__option-check" />
                  </button>
                </div>
              </div>
            </Transition>
          </div>

          <AppLanguagePicker />

          <template v-if="isAuthenticated">
            <span class="layout__user">{{ currentUser?.name }}</span>
            <AppButton variant="ghost" @click="logout">
              <AppIcon name="ph:sign-out" />
            </AppButton>
          </template>
          <template v-else>
            <AppButton href="/login" variant="secondary">{{ $t('core.nav.signIn') }}</AppButton>
          </template>
        </div>
      </nav>
    </header>

    <main class="layout__main">
      <slot />
    </main>

    <footer class="layout__footer">
      <p>{{ $t('core.appName') }} © {{ new Date().getFullYear() }}</p>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  background-color: var(--color-bg);
  color: var(--color-text-primary);
  transition:
    background-color 0.3s ease,
    color 0.3s ease;

  &__header {
    position: sticky;
    top: 0;
    z-index: 100;
    background-color: var(--color-surface);
    border-bottom: 1px solid var(--color-border);
    padding: var(--space-3) var(--space-6);
  }

  &__nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: var(--max-width);
    margin: 0 auto;
  }

  &__logo {
    font-size: var(--text-lg);
    font-weight: 700;
    color: var(--color-text-primary);
    text-decoration: none;
  }

  &__nav-actions {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--space-3);
  }

  &__user {
    font-size: var(--text-sm);
    color: var(--color-text-secondary);
  }

  &__main {
    flex: 1;
    max-width: var(--max-width);
    width: 100%;
    margin: 0 auto;
    padding: var(--space-8) var(--space-6);
  }

  &__footer {
    text-align: center;
    padding: var(--space-6);
    color: var(--color-text-secondary);
    font-size: var(--text-sm);
    border-top: 1px solid var(--color-border);
  }
}

.theme-picker {
  position: relative;

  &__trigger {
    display: flex;
    align-items: center;
    gap: var(--space-1);
    padding: var(--space-2) var(--space-2);
    background-color: var(--color-surface-hover);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    color: var(--color-text-secondary);
    font-size: 1rem;
    cursor: pointer;
    transition: all var(--transition-fast);

    &:hover {
      color: var(--color-text-primary);
      border-color: var(--color-border-hover);
      background-color: var(--color-surface-hover);
    }

    &[aria-expanded='true'] {
      color: var(--color-primary);
      border-color: var(--color-primary);
      box-shadow: 0 0 0 3px var(--color-ring);
    }
  }

  &__caret {
    font-size: 0.75rem;
    transition: transform var(--transition-fast);

    &--open {
      transform: rotate(180deg);
    }
  }

  &__popup {
    position: absolute;
    top: calc(100% + var(--space-2));
    right: 0;
    min-width: 10rem;
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-xl);
    box-shadow:
      0 0 0 1px color-mix(in srgb, var(--color-primary) 8%, transparent),
      var(--shadow-xl);
    padding: var(--space-2);
    z-index: 1000; /* Added a fallback for dropdown if --z-dropdown is missing */
  }

  &__header {
    font-size: var(--text-xs);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--color-text-secondary);
    padding: var(--space-1) var(--space-2) var(--space-2);
  }

  &__options {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
  }

  &__option {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    width: 100%;
    padding: var(--space-2) var(--space-3);
    background: none;
    border: none;
    border-radius: var(--radius-lg);
    font-size: var(--text-sm);
    font-weight: 500;
    color: var(--color-text-secondary);
    cursor: pointer;
    transition: all var(--transition-fast);
    text-align: left;

    &:hover {
      background-color: var(--color-surface-hover);
      color: var(--color-text-primary);
    }

    &--active {
      color: var(--color-primary);
      background-color: var(--color-primary-subtle);
    }

    &--dark {
      .theme-picker__option-icon {
        color: #a78bfa;
      }
    }
  }

  &__option-icon {
    font-size: 1rem;
    flex-shrink: 0;
    color: var(--color-primary);
  }

  &__option-label {
    flex: 1;
  }

  &__option-check {
    font-size: 0.75rem;
    color: var(--color-primary);
    flex-shrink: 0;
  }
}

.theme-popup-enter-active,
.theme-popup-leave-active {
  transition: all var(--transition-fast);
}

.theme-popup-enter-from,
.theme-popup-leave-to {
  opacity: 0;
  transform: translateY(-6px) scale(0.97);
  transform-origin: top right;
}
</style>
