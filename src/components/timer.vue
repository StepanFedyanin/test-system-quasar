<template>
  <div class="card text-primary text-bold q-py-sm q-px-lg">
    {{currentTime}}
  </div>
</template>

<script>
export default {
  name: 'test-timer',
  props: {
    timerValue: {
      type: Number,
      default () {
        return null
      }
    }
  },
  data () {
    return {
      timer: null,
      date: null,
      currentTime: null
    }
  },
  created () {
    this.test = this.$store.state.test
    if (this.test.start_timer) {
      this.date = new Date(this.test.start_timer)
    } else {
      this.$store.dispatch('initTimer')
      this.date = this.$store.state.test.start_timer
    }
  },
  mounted () {
    this.timer = setInterval(() => {
      const date = new Date(this.date - new Date(new Date().getTime() - (this.timerValue * 1000)))
      this.currentTime = date.toLocaleTimeString('ru', { minute: '2-digit', second: '2-digit' })
      if (this.currentTime === '00:00') {
        this.timeIsOver()
      }
    }, 1000)
  },
  unmounted () {
    clearTimeout(this.timer)
  },
  methods: {
    timeIsOver () {
      clearTimeout(this.timer)
      this.$emit('end')
    }
  }
}
</script>
