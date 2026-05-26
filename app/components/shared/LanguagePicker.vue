<script setup lang="ts">
const { locale, locales, setLocale } = useI18n();

const isOpen = ref(false);
const root = ref<HTMLElement | null>(null);

function togglePicker(): void {
  isOpen.value = !isOpen.value;
}

async function selectLocale(code: string): Promise<void> {
  await setLocale(code as never);
  isOpen.value = false;
}

function handleKeydown(event: KeyboardEvent): void {
  if (event.key === 'Escape') {
    isOpen.value = false;
  }
}

onClickOutside(root, () => {
  isOpen.value = false;
});
</script>

<template>
  <div ref="root" class="language-picker" @keydown="handleKeydown">
    <button
      id="language-picker-trigger"
      class="language-picker__trigger"
      type="button"
      :aria-label="$t('core.layout.changeLanguage')"
      aria-haspopup="listbox"
      :aria-expanded="isOpen ? 'true' : 'false'"
      @click="togglePicker">
      <AppIcon name="ph:translate" class="language-picker__trigger-icon" />
      <span class="language-picker__trigger-label">{{ locale.toUpperCase() }}</span>
      <AppIcon
        name="ph:caret-down"
        class="language-picker__caret"
        :class="{ 'language-picker__caret--open': isOpen }" />
    </button>

    <Transition name="language-picker-popup">
      <div
        v-if="isOpen"
        class="language-picker__popup"
        role="listbox"
        :aria-label="$t('core.layout.selectLanguage')">
        <div class="language-picker__header">{{ $t('core.layout.language') }}</div>
        <div class="language-picker__options">
          <button
            v-for="item in locales"
            :id="`language-picker-option-${item.code}`"
            :key="item.code"
            type="button"
            class="language-picker__option"
            :class="{ 'language-picker__option--active': locale === item.code }"
            role="option"
            :aria-selected="locale === item.code ? 'true' : 'false'"
            @click="selectLocale(item.code)">
            <span class="language-picker__option-label">{{ item.name }}</span>
            <AppIcon
              v-if="locale === item.code"
              name="ph:check-bold"
              class="language-picker__option-check" />
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.language-picker {
  position: relative;
  display: inline-flex;

  &__trigger {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-2) var(--space-3);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    background-color: var(--color-surface);
    color: var(--color-text-primary);
    cursor: pointer;
    font-size: var(--text-sm);
    font-weight: var(--font-weight-medium);
    transition:
      background-color var(--transition-fast),
      border-color var(--transition-fast),
      color var(--transition-fast),
      box-shadow var(--transition-fast),
      transform var(--transition-fast);

    &:hover {
      background-color: var(--color-surface-hover);
      border-color: var(--color-primary);
    }

    &:focus-visible {
      outline: none;
      box-shadow: 0 0 0 3px var(--color-ring);
    }

    &[aria-expanded='true'] {
      border-color: var(--color-primary);
      box-shadow: 0 0 0 1px color-mix(in srgb, var(--color-primary) 25%, transparent);
      transform: translateY(-1px);
    }
  }

  &__trigger-icon,
  &__caret,
  &__option-check {
    flex-shrink: 0;
    font-size: 0.875rem;
  }

  &__trigger-label {
    min-width: 1.5rem;
    letter-spacing: 0.08em;
  }

  &__caret {
    transition: transform var(--transition-fast);

    &--open {
      transform: rotate(180deg);
    }
  }

  &__popup {
    position: absolute;
    top: calc(100% + var(--space-2));
    right: 0;
    min-width: 11rem;
    padding: var(--space-2);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-xl);
    background-color: var(--color-surface);
    box-shadow: var(--shadow-xl);
    z-index: var(--z-dropdown);
  }

  &__header {
    padding: var(--space-1) var(--space-2) var(--space-2);
    color: var(--color-text-secondary);
    font-size: var(--text-xs);
    font-weight: var(--font-weight-semibold);
    letter-spacing: 0.08em;
    text-transform: uppercase;
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
    border: none;
    border-radius: var(--radius-lg);
    background: transparent;
    color: var(--color-text-secondary);
    cursor: pointer;
    font-size: var(--text-sm);
    font-weight: var(--font-weight-medium);
    text-align: left;
    transition:
      background-color var(--transition-fast),
      color var(--transition-fast);

    &:hover {
      background-color: var(--color-surface-hover);
      color: var(--color-text-primary);
    }

    &--active {
      background-color: color-mix(in srgb, var(--color-primary) 12%, var(--color-surface));
      color: var(--color-primary);
    }
  }

  &__option-label {
    flex: 1;
  }

  &__option-check {
    color: var(--color-primary);
  }
}

.language-picker-popup-enter-active,
.language-picker-popup-leave-active {
  transition:
    opacity var(--transition-base),
    transform var(--transition-base);
}

.language-picker-popup-enter-from,
.language-picker-popup-leave-to {
  opacity: 0;
  transform: translateY(-6px) scale(0.98);
}
</style>
