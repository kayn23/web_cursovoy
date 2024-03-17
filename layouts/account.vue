<script lang="ts" setup>
const { userStore } = useInitStore()
useAsyncData(() => {
  return userStore.getUserInfo()
})
// userStore.getUserInfo().then((res) => {
//   console.log(res)
// })
</script>
<template>
  <div class="main-container-height">
    <main-header class="fixed left-0 right-0 top-0 z-50" />
    <main class="mt-20 tablet:px-2 text-justify">
      <slot />
    </main>
    <!-- <TheFooter :class="theme"  /> -->
    <el-backtop
      :right="50"
      :bottom="50"
    />
    <div>
      <pre>
        {{ userStore.currentUser }}
      </pre>
    </div>
    <main-footer></main-footer>
  </div>
</template>
<style lang="sass"></style>
