<script setup lang="ts">
interface Props {
  name: string;
  size?: string | number;
}

const props = withDefaults(defineProps<Props>(), {
  size: '1.25rem'
});
</script>

<template>
  <span class="app-icon" :style="{ '--app-icon-size': String(props.size) }">
    <ClientOnly>
      <Icon :name="props.name" :size="String(props.size)" />
    </ClientOnly>
  </span>
</template>

<style scoped lang="scss">
.app-icon {
  display: inline-flex;
  flex-shrink: 0;
  width: var(--app-icon-size);
  height: var(--app-icon-size);
  line-height: 0;
  color: inherit;
}

.app-icon :deep(svg) {
  display: block;
}
</style>
