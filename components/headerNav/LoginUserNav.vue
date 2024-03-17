<script lang="ts" setup>
const userState = useUserStore()
</script>
<template>
  <NuxtLink to="/account">Аккаунт</NuxtLink>
  <NuxtLink
    to="#"
    @click="userState.signOut()"
  >
    Выйти
  </NuxtLink>
</template>
<style lang="sass"></style>
