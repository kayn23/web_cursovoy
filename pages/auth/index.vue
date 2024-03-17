<script lang="ts" setup>
import { object, string } from 'yup'
import type { IUser } from '~/types/user.type'
import { useAuthStore } from '~/store/authStore'

const authStore = useAuthStore()

const schema = object({
  email: string().email().required(),
  password: string().required().min(6),
})
async function auth({ email, password }: Pick<IUser, 'email' | 'password'>) {
  const { data } = await useFetch<{ token: string }>('/api/auth', {
    method: 'post',
    body: {
      user: {
        email,
        password,
      },
    },
  })
  if (data.value) {
    authStore.token = data.value.token
    navigateTo('/account')
  }
}
</script>
<template>
  <div class="my-10 p-4 bg-nord-5 dark:bg-nord-3 bg-opacity-70 rounded-md mx-auto max-w-[440px]">
    <client-only>
      <h1 class="mb-4 text-3xl text-center">Войти</h1>
      <vForm
        :validation-schema="schema"
        v-slot="{ handleSubmit }"
      >
        <form @submit="handleSubmit($event, auth)">
          <vField
            name="email"
            v-slot="{ field, errors }"
          >
            <div class="form-field">
              <label>
                <p class="field-label">Email</p>
                <input
                  v-bind="field"
                  class="form-input"
                  autocomplete="none"
                />
                <el-popover
                  placement="top-start"
                  title="Validation error"
                  :width="200"
                  trigger="hover"
                  :content="errors.join(',')"
                  v-if="errors.length > 0"
                >
                  <template #reference>
                    <div class="error-target">!</div>
                  </template>
                </el-popover>
              </label>
            </div>
          </vField>
          <vField
            name="password"
            v-slot="{ field, errors }"
          >
            <div class="form-field">
              <label>
                <p class="field-label">Пароль</p>
                <input
                  v-bind="field"
                  class="form-input"
                  type="password"
                  autocomplete="none"
                />
                <el-popover
                  placement="top-start"
                  title="Validation error"
                  :width="200"
                  trigger="hover"
                  :content="errors.join(',')"
                  v-if="errors.length > 0"
                >
                  <template #reference>
                    <div class="error-target">!</div>
                  </template>
                </el-popover>
              </label>
            </div>
            <el-button
              size="large"
              type="primary"
              class="w-full"
              native-type="submit"
            >
              Войти
            </el-button>
            <div class="flex justify-center mt-4">
              <NuxtLink
                to="/auth/reg"
                class="text-sm"
              >
                Зарегистрироваться
              </NuxtLink>
            </div>
          </vField>
        </form>
      </vForm>
    </client-only>
  </div>
</template>
<style lang="sass" scope>
.form-field
  @apply mb-4
</style>
