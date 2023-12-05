<template>
  <div :class="['modal', modelValue&&'modal--active']" @click="closeModal">
    <div class="modal__content" @click.stop>
      <div :class="['flex items-center q-mb-sm', title?'justify-between':'justify-end']">
        <div v-if="title" class="text-h2 text-primary">{{title}}</div>
        <q-btn flat round @click="closeModal">
          <q-icon name="close"/>
        </q-btn>
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
    }
  },
  methods: {
    closeModal () {
      this.$emit('update:modelValue', false)
    }
  }
}
</script>
