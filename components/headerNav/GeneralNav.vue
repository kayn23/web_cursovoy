<script lang="ts" setup>
const { authStore, userStore } = useInitStore()
</script>
<template>
  <nav class="nav">
    <NuxtLink to="/">Home</NuxtLink>
    <header-nav-login-user-nav v-if="authStore.isLogin" />
    <header-nav-not-auth-nav v-else />
    <header-nav-admin-nav v-if="userStore.isAdmin" />
  </nav>
</template>
<style lang="sass" scope>
.nav > *
  @apply mx-2
</style>
