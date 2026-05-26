<script setup lang="ts">
import { NuxtLink } from '#components';

interface Props {
  to?: string;
  icon?: string;
  label: string;
  active?: boolean;
}

const props = defineProps<Props>();
</script>

<template>
  <component
    :is="props.to ? NuxtLink : 'button'"
    :to="props.to"
    class="app-sidebar-item"
    :class="{ 'app-sidebar-item--active': props.active }"
    :exact-active-class="'app-sidebar-item--active'"
    type="button">
    <AppIcon v-if="props.icon" :name="props.icon" class="app-sidebar-item__icon" />
    <span class="app-sidebar__text">{{ props.label }}</span>
  </component>
</template>

<style lang="scss">
.app-sidebar-item {
  display: flex;
  align-items: center;
  width: 3rem;
  height: 3rem;
  margin: 0 0.75rem 4px;
  padding: 0 0 0 0.85rem;
  overflow: hidden;
  border: none;
  border-radius: var(--radius-lg);
  background: none;
  color: var(--color-text-secondary);
  cursor: pointer;
  font-size: var(--text-sm);
  font-weight: var(--font-weight-medium);
  text-decoration: none;
  transition:
    width 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    background-color var(--transition-fast),
    color var(--transition-fast);
  white-space: nowrap;

  &:hover {
    background-color: var(--color-surface-hover);
    color: var(--color-text-primary);
  }

  &--active {
    background-color: var(--color-primary-subtle);
    color: var(--color-text-primary);
    font-weight: var(--font-weight-bold);
  }

  &__icon {
    flex-shrink: 0;
    font-size: 1.5rem;
  }
}
</style>
