<script lang="ts" setup>
definePageMeta({
  middleware: ['is-login'],
  layout: 'account',
})
const { authStore, userStore } = useInitStore()
const headers = new Headers()
headers.append('authorization', authStore.token || '')
const { data } = await useFetch('/api/orders', {
  server: false,
  headers,
})
</script>
<template>
  <div class="p-4">
    <admin-header-panel v-if="userStore.isAdmin"></admin-header-panel>
    <div v-if="data?.value.length > 0">
      <invoices-card
        v-for="item in data?.value"
        :key="item.id"
        :order="item"
      />
    </div>
    <div v-else>Нет заказов</div>
  </div>
</template>
<style lang="sass"></style>
