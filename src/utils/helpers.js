const helpers = {
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
