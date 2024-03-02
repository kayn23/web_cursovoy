<script lang="ts" setup></script>
<template>
  <div class="main-container-height">
    <main-header class="fixed left-0 right-0 top-0" />
    <main class="mt-24 max-w-5xl tablet:px-2">
      <slot />
    </main>
    <!-- <TheFooter :class="theme"  /> -->
  </div>
</template>
<style lang="sass"></style>
