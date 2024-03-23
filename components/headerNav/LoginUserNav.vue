<script lang="ts" setup>
const { userStore } = useInitStore()
function signOut() {
  userStore.signOut().then(() => {
    navigateTo('/')
  })
}
</script>
<template>
  <NuxtLink to="/account">Аккаунт</NuxtLink>
  <NuxtLink
    to="#"
    @click="signOut"
  >
    Выйти
  </NuxtLink>
</template>
<style lang="sass"></style>
