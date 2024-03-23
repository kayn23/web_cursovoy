<script lang="ts" setup>
import type { IUser } from '~/types/user.type'
interface IPrors {
  user: IUser
  type?: 'sender' | 'recipient'
}
const props = defineProps<IPrors>()
const type = computed(() => {
  if (props.type === 'sender') return 'Отправитель'
  if (props.type === 'recipient') return 'Получатель'
  return 'Пользователь'
})
const { user } = toRefs(props)
</script>
<template>
  <div class="border rounded-lg p-4 w-full">
    <h2 class="text-3xl font-bold">{{ type }}</h2>
    <div :class="{ 'flex justify-between items-center tablet:block': !props.type }">
      <p
        class="text-xl"
        :class="{ 'no-type': !props.type }"
      >
        <span class="font-bold">Имя:</span><span> {{ user.name }}</span>
      </p>
      <p
        class="text-xl"
        :class="{ 'no-type': !props.type }"
      >
        <span class="font-bold">Фамилия:</span> {{ user.lastName }}
      </p>
      <p
        class="text-xl"
        :class="{ 'no-type': !props.type }"
      >
        <span class="font-bold">Номер документа:</span> {{ user.documentNumber }}
      </p>
      <p
        class="text-xl"
        :class="{ 'no-type': !props.type }"
      >
        <span class="font-bold">Email:</span> <a :href="'mailto:' + user.email">{{ user.email }}</a>
      </p>
      <p
        class="text-xl"
        :class="{ 'no-type': !props.type }"
      >
        <span class="font-bold">Телефон:</span> <a :href="'tel:' + user.phone">{{ user.phone }}</a>
      </p>
    </div>
  </div>
</template>
<style lang="sass">
.no-type
  @apply flex flex-col tablet:block
  *
    @apply block tablet:inline
</style>
