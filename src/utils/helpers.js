import { parse, format } from 'fecha'
import store from 'src/store'
const helpers = {
  parseDate: (value, template) => {
    return parse(value, template)
  },

  formatDate: (value, template) => {
    return format(value, template)
  },
  stringForNumber: (value, strings) => {
    let idx = 2
    let num = value
    if (num > 100) {
      num = num % 100
    }
    if ((num < 10) || (num > 19)) {
      const z = num % 10
      if (z === 1) {
        idx = 0
      } else if ((z > 1) && (z < 5)) {
        idx = 1
      }
    }
    return value + ' ' + strings[idx]
  },
  parseJwt: (token) => {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(
      function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      }
    ).join(''))
    return JSON.parse(jsonPayload)
  },
  removeKeys (obj, keys) {
    if (Array.isArray(obj)) {
      return obj.map((item) => this.removeKeys(item, keys))
    }
    const newObj = {}
    for (const key in obj) {
      if (!keys.includes(key)) {
        newObj[key] = obj[key]
      }
    }
    return newObj
  },
  createTitle: (obj, route) => {
    // if (obj.title) return obj.title
    // const metaTemplates = store.state.meta || {}
    // // const testTemplates = store.state.test || {}
    // let title = (metaTemplates.commonPfx?.title || '') + (metaTemplates[route.name]?.title || obj.name || route.meta.title) + ' ' + (metaTemplates.commonSfx?.title || '')
    // if (route.name.includes('Description')) {
    //   title = metaTemplates.description.replace('replace', testTemplates.name) || route.meta.title
    // }
    // if (route.name.includes('Response')) {
    //   title = metaTemplates.response.replace('replace', testTemplates.name) || route.meta.title
    // }
    // if (route.name.includes('Finale')) {
    //   title = metaTemplates.finale.replace('replace', testTemplates.name) || route.meta.title
    // }
    // console.log(route)
    // Object.keys(obj).forEach((key) => {
    //   title = title.replace(`%${key}%`, obj[key])
    // })
    // title = title.replace(/%.*%/, '')
    return 'title'
  },

  createDescription: (obj, route) => {
    // if (obj.description) return obj.description
    // const metaTemplates = store.state.meta || {}
    // let description = (metaTemplates.commonPfx?.description || '') + (metaTemplates[route.name]?.description || '') + ' ' + (metaTemplates.commonSfx?.description || '')
    // Object.keys(obj).forEach((key) => {
    //   description = description.replace(`%${key}%`, obj[key])
    // })
    // description = description.replace(/%.*%/, '')
    return 'description'
  },

  createKeywords: (obj, route) => {
    // if (obj.keywords) return obj.keywords
    // const metaTemplates = store.state.meta || {}
    // let keywords = (metaTemplates.commonPfx?.keywords || '') + (metaTemplates[route.name]?.keywords || '') + ' ' + (metaTemplates.commonSfx?.keywords || '')
    // Object.keys(obj).forEach((key) => {
    //   keywords = keywords.replace(`%${key}%`, obj[key])
    // })
    // keywords = keywords.replace(/%.*%/, '')
    return 'keywords'
  }

}
export default {
  install (app) {
    app.helpers = helpers
    app.config.globalProperties.$helpers = helpers
  }
}
export {
  helpers
}
