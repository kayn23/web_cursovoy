<script lang="ts" setup>
import * as yup from 'yup'
import type { IUser } from '~/types/user.type'
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  name: yup.string().required().min(3),
  lastName: yup.string().required().min(3),
  phone: yup.string().required().matches(phoneRegExp, 'Phone number is not valid'),
  documentNumber: yup.string().required(),
})
const userStore = useUserStore()
async function registration(user: Omit<IUser, 'id'>) {
  const { data } = await useFetch<{ token: string }>('/api/auth/reg', {
    method: 'post',
    body: {
      user,
    },
  })
  if (data.value) {
    userStore.token = data.value.token
    navigateTo('/account')
  }
}
</script>
<template>
  <div class="my-10 p-4 bg-nord-5 dark:bg-nord-3 bg-opacity-70 rounded-md mx-auto max-w-[440px]">
    <client-only>
      <h1 class="mb-4 text-3xl text-center">Регистрация</h1>
      <vForm
        :validation-schema="schema"
        v-slot="{ handleSubmit }"
      >
        <form @submit="handleSubmit($event, registration)">
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
          </vField>
          <vField
            name="name"
            v-slot="{ field, errors }"
          >
            <div class="form-field">
              <label>
                <p class="field-label">Имя</p>
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
            name="lastName"
            v-slot="{ field, errors }"
          >
            <div class="form-field">
              <label>
                <p class="field-label">Фамилия</p>
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
            name="documentNumber"
            v-slot="{ field, errors }"
          >
            <div class="form-field">
              <label>
                <p class="field-label">Номер документа</p>
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
            name="phone"
            v-slot="{ field, errors }"
          >
            <div class="form-field">
              <label>
                <p class="field-label">Телефон</p>
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
          <el-button
            size="large"
            type="primary"
            class="w-full"
            native-type="submit"
          >
            Зарегистрироваться
          </el-button>
          <div class="flex justify-center mt-4">
            <NuxtLink
              to="/auth"
              class="text-sm"
            >
              Войти
            </NuxtLink>
          </div>
        </form>
      </vForm>
    </client-only>
  </div>
</template>
<style lang="sass" scope>
.form-field
  @apply mb-4
</style>
