<template>
  <div :class="['modal', modelValue&&'modal--active']" @click="closeModal">
    <div :class="['modal__content',center&&'modal__center']" @click.stop>
      <div :class="['flex items-center q-mb-md', title?'justify-between':'justify-end']">
        <div v-if="title" class="text-h4 text-bold text-primary">{{title}}</div>
        <span class="cursor-pointer" @click="closeModal">
          <q-icon name="close" size="17px"/>
        </span>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'modal-wrapper',
  props: {
    title: {
      type: String,
      default () {
        return null
      }
    },
    modelValue: {
      type: Boolean,
      default () {
        return false
      }
    },
    center: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  methods: {
    closeModal () {
      this.$emit('update:modelValue', false)
    }
  }
}
</script>
