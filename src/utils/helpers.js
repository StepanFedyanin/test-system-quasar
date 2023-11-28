import { parse, format } from 'fecha'
const helpers = {
  parseDate: (value, template) => {
    return parse(value, template)
  },

  formatDate: (value, template) => {
    console.log(format(value, template))
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
