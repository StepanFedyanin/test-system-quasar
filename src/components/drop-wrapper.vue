<template>
  <div class="dropwrapper">
    <div @click="changeShow" :class="['dropwrapper__title flex items-center cursor-pointer',titleStyle]">
      <div>
        {{title}}
      </div>
      <q-icon  v-if="show" color="black" name="expand_more" size="20px"/>
      <q-icon  v-else color="black" name="expand_less" size="20px"/>
    </div>
    <div :class="['dropwrapper__content', show&&'dropwrapper__content--active']">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'drop-wrapper',
  props: {
    title: {
      type: String,
      default () {
        return ''
      }
    },
    titleStyle: {
      type: String,
      default () {
        return ''
      }
    }
  },
  data () {
    return {
      show: false
    }
  },
  methods: {
    changeShow () {
      this.show = !this.show
    }
  }
}
</script>
