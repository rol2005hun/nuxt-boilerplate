<script setup lang="ts">
const { t } = useI18n();

useHead({
  title: t('docs.metaTitle')
});
</script>

<template>
  <DocsOverview />
</template>
