<template>
    <top-bar class="q-mb-lg"/>
    <div class="col-grow row justify-center items-center q-pb-md">
      <div>
        <div class="text-h1 text-center text-primary text-bold q-mb-md">404</div>
        <div class="text-h3 text-center q-mb-md text-secondary">для дополнительной информации вы можете обратиться к администратору</div>
        <div>
          <router-link to="/" class="text-h4 flex justify-center text-primary">Вернуться на главную</router-link>
        </div>
      </div>
    </div>
</template>

<script>
import TopBar from 'components/top-bar.vue'

export default {
  name: 'error-404',
  components: { TopBar }
}
</script>
