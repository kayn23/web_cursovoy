<script lang="ts" setup>
definePageMeta({
  layout: 'account',
  middleware: ['is-login', 'is-admin'],
})
</script>
<template>
  <div>invoices new</div>
</template>
<style lang="sass"></style>
