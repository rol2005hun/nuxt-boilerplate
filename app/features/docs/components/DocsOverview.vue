<script setup lang="ts">
const sectionIds = ['quickStart', 'architecture', 'i18n'] as const;
</script>

<template>
  <section class="docs">
    <p class="docs__eyebrow">{{ $t('docs.eyebrow') }}</p>
    <h1 class="docs__title">{{ $t('docs.title') }}</h1>
    <p class="docs__subtitle">{{ $t('docs.subtitle') }}</p>

    <div class="docs__actions">
      <AppButton href="/" variant="primary">
        {{ $t('docs.actions.primary') }}
      </AppButton>
      <AppButton href="/login" variant="secondary">
        {{ $t('docs.actions.secondary') }}
      </AppButton>
    </div>

    <div class="docs__grid">
      <AppCard v-for="sectionId in sectionIds" :key="sectionId" padding="lg" class="docs__card">
        <h2 class="docs__card-title">{{ $t(`docs.sections.${sectionId}.title`) }}</h2>
        <p class="docs__card-description">{{ $t(`docs.sections.${sectionId}.description`) }}</p>
      </AppCard>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.docs {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-12) var(--space-2);

  &__eyebrow {
    font-size: var(--text-xs);
    font-weight: var(--font-weight-semibold);
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--color-text-secondary);
  }

  &__title {
    font-size: var(--text-4xl);
    color: var(--color-text-primary);
    text-align: center;
  }

  &__subtitle {
    max-width: 62ch;
    text-align: center;
    color: var(--color-text-secondary);
    font-size: var(--text-lg);
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--space-3);
    margin-top: var(--space-2);
  }

  &__grid {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: var(--space-4);
    margin-top: var(--space-4);
  }

  &__card {
    height: 100%;
  }

  &__card-title {
    font-size: var(--text-lg);
    color: var(--color-text-primary);
    margin-bottom: var(--space-2);
  }

  &__card-description {
    color: var(--color-text-secondary);
    line-height: 1.6;
  }
}
</style>
