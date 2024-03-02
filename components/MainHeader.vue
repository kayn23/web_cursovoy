<script lang="ts" setup></script>
<template>
  <header
    class="p-4 bg-nord-5 shadow-nord-4 shadow-md dark:shadow-none dark:bg-nord-1 flex items-center justify-between"
  >
    <NuxtLink to="/" class="flex items-center">
      <img src="~/assets/logo.png" alt="Logo" class="w-[64px] rounded-full bg-nard-4" />
      <span class="text-4xl">FastDelivery</span>
    </NuxtLink>
    <div class="flex items-center">
      <general-nav class="mr-4" />
      <color-mode-selector></color-mode-selector>
    </div>
  </header>
</template>
<style lang="sass"></style>
