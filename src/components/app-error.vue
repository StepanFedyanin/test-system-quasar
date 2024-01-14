<template>
  <div v-if="showModal" class="error">
    <div class="card error__container text-secondary">
      {{errorMessages || 'произошла какая-то ошибка'}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'app-error',
  computed: {
    showModal () {
      if (this.error) {
        this.hideModal()
      }
      return !!this.error
    },
    error () {
      return this.$store.state.error
    },
    errorMessages () {
      return this.$store.state.error?.detail || ''
    }
  },
  methods: {
    hideModal () {
      setTimeout(() => {
        this.$store.dispatch('hideError')
      }, 5000)
    }
  }
}
</script>
