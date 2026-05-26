<script setup lang="ts">
const isPinned = useCookie<boolean>('app-sidebar-pinned', {
  default: () => false
});

const isHovered = ref(false);
</script>

<template>
  <aside
    class="app-sidebar"
    :class="{ 'app-sidebar--pinned': isPinned, 'app-sidebar--hovered': isHovered }"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false">
    <div class="app-sidebar__header">
      <div class="app-sidebar__header-top">
        <slot name="header-top" />
        <button
          class="app-sidebar__pin"
          :class="{ 'app-sidebar__pin--active': isPinned }"
          type="button"
          title="Pin sidebar"
          @click="isPinned = !isPinned">
          <AppIcon :name="isPinned ? 'ph:push-pin-slash' : 'ph:push-pin'" />
        </button>
      </div>
      <slot name="header-bottom" />
    </div>

    <nav class="app-sidebar__nav">
      <slot />
    </nav>

    <div v-if="$slots.footer" class="app-sidebar__footer">
      <slot name="footer" />
    </div>
  </aside>
</template>

<style lang="scss">
.app-sidebar {
  width: 4.5rem;
  max-width: 4.5rem;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
  height: 100dvh;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: var(--color-surface);
  border-right: 1px solid var(--color-border);
  transition:
    width 0.35s cubic-bezier(0.4, 0, 0.2, 1),
    max-width 0.35s cubic-bezier(0.4, 0, 0.2, 1);

  &__text,
  &__user-info,
  &__logout {
    max-width: 0;
    overflow: hidden;
    opacity: 0;
    white-space: nowrap;
    transition:
      opacity 0.15s linear 0.2s,
      max-width 0s 0.35s,
      margin 0s 0.35s,
      padding 0s 0.35s,
      border 0s 0.35s;
  }

  &__text {
    margin-left: 0;
  }

  &__logout {
    padding: 0;
    margin: 0;
    border: 0;
    transition:
      background-color var(--transition-fast),
      color var(--transition-fast),
      opacity 0.15s linear 0.2s,
      max-width 0s 0.35s,
      margin 0s 0.35s,
      padding 0s 0.35s,
      border 0s 0.35s;
  }

  &:hover,
  &--pinned,
  &--hovered {
    width: 15rem;
    max-width: 15rem;

    .app-sidebar__text,
    .app-sidebar__user-info {
      max-width: 15rem;
      opacity: 1;
      transition: opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .app-sidebar__logout {
      max-width: 15rem;
      padding: var(--space-2);
      opacity: 1;
      transition:
        opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1),
        background-color var(--transition-fast),
        color var(--transition-fast);
    }

    .app-sidebar__text {
      margin-left: 0.75rem;
    }

    .app-sidebar-item {
      width: 13.5rem;
    }

    .app-sidebar__brand {
      transform: scale(1);
    }

    .app-sidebar__mode-badge {
      max-width: 8rem;

      .app-sidebar__text {
        margin-left: 4px;
      }
    }
  }

  &__header {
    width: 15rem;
    display: flex;
    flex-direction: column;
    gap: var(--space-5);
    padding: var(--space-4) 0 var(--space-4) 1rem;
    border-bottom: 1px solid var(--color-border);
  }

  &__header-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding-right: var(--space-4);
  }

  &__pin {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--space-1);
    border: none;
    background: none;
    color: var(--color-text-secondary);
    cursor: pointer;
    font-size: 1.6rem;
    transition: color 0.3s;

    &:hover,
    &--active {
      color: var(--color-primary);
    }
  }

  &__brand {
    display: flex;
    align-items: center;
    text-decoration: none;
    transform-origin: left center;
    transform: scale(0.7);
    transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &__mode-badge {
    display: inline-flex;
    align-items: center;
    align-self: flex-start;
    max-width: 2.5rem;
    overflow: hidden;
    padding: 6px 10px;
    border: 1px solid color-mix(in srgb, var(--color-primary) 25%, transparent);
    border-radius: var(--radius-full);
    background-color: var(--color-primary-subtle);
    color: var(--color-text-primary);
    font-size: 0.65rem;
    font-size: var(--text-xs);
    font-weight: var(--font-weight-semibold);
    letter-spacing: 0.04em;
    text-decoration: none;
    text-transform: uppercase;
    white-space: nowrap;
    transition:
      max-width 0.35s cubic-bezier(0.4, 0, 0.2, 1),
      background-color var(--transition-fast),
      color var(--transition-fast);

    &:hover {
      background-color: var(--color-surface-hover);
      color: var(--color-text-primary);
    }
  }

  &__mode-icon {
    font-size: 1rem;
  }

  &__nav {
    display: flex;
    flex: 1;
    flex-direction: column;
    width: 15rem;
    padding: var(--space-3) 0;
  }

  &__divider {
    width: 14rem;
    height: 1px;
    margin: var(--space-2) 0.5rem;
    background-color: var(--color-border);
  }

  &__footer {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    width: 15rem;
    padding: var(--space-3) 0.75rem var(--space-4) 0.75rem;
    border-top: 1px solid var(--color-border);
  }

  &__user-avatar {
    margin-left: 0.25rem;
  }

  &__user-info {
    display: flex;
    flex: 1;
    flex-direction: column;
  }

  &__user-name {
    overflow: hidden;
    color: var(--color-text-primary);
    font-size: var(--text-sm);
    font-weight: var(--font-weight-semibold);
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__user-email {
    overflow: hidden;
    color: var(--color-text-secondary);
    font-size: var(--text-xs);
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__logout {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    border: none;
    background: none;
    border-radius: var(--radius-md);
    color: var(--color-text-secondary);
    cursor: pointer;
    font-size: 1.2rem;

    &:hover {
      background-color: color-mix(in srgb, var(--color-danger) 10%, transparent);
      color: var(--color-danger);
    }
  }

  @media (max-width: 768px) {
    position: static;
    width: 100%;
    max-width: 100%;
    height: auto;
    border-right: none;
    border-bottom: 1px solid var(--color-border);

    &:hover,
    &--pinned,
    &--hovered {
      width: 100%;
      max-width: 100%;
    }

    &__pin {
      display: none;
    }
  }
}
</style>
