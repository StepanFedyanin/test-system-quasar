<template>
  <div/>
</template>

<script>
import { useMeta } from 'quasar'
import { helpers } from 'src/utils/helpers'

export default {
  name: 'meta-tags',
  setup (props) {
    const $helpers = helpers
    useMeta(() => {
      return {
        title: $helpers.createTitle(props.data, props.route),
        meta: {
          description: { name: 'description', content: $helpers.createDescription(props.data, props.route) },
          keywords: { name: 'keywords', content: $helpers.createKeywords(props.data, props.route) }
        },
        htmlAttr: {
          // lang: 'ru'
        }
      }
    })
  },
  props: {
    data: {
      type: Object,
      default () { return {} }
    },
    route: {
      type: Object,
      default () { return {} }
    }
  }
}
</script>
