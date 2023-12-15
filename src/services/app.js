import { app as settings } from 'src/settings'
import { REST, RESTError } from './rest'

export default class extends REST {
  static get settings () {
    return settings
  }

  static refreshToken (token) {
    return this._post('token/refresh', {}, { refresh: token }).then((data) => {
      return data
    }).catch((error) => {
      throw new RESTError(error, 'Не удалось обновит токен')
    })
  }

  static obtainToken (params) {
    return this._post('token/create', {}, params).then((data) => {
      const tokens = data
      return tokens
    }).catch((error) => {
      throw new RESTError(error, 'Не удалось авторизоваться')
    })
  }

  static createUser (params) {
    return this._post('user/create_user', {}, params).then((data) => {
      const tokens = data
      return tokens
    }).catch((error) => {
      throw new RESTError(error, 'Не удалось создать пользователя')
    })
  }

  static getUser () {
    return this._get('user', {}).then((data) => {
      return data
    }).catch((error) => {
      throw new RESTError(error, 'Не удалось получить пользователя')
    })
  }

  static updateUser (params) {
    return this._post('user/update_user', {}, params).then((data) => {
      return data
    }).catch((error) => {
      throw new RESTError(error, 'Не удалось обновить данные пользователя')
    })
  }

  static getCategory () {
    return this._get('test/category', {}, {}).then((data) => {
      return data
    }).catch((error) => {
      throw new RESTError(error, 'Не удалось получить категории')
    })
  }

  static getTestForId (id) {
    return this._get(`test/test/${id}`, {}, {}).then((data) => {
      return data
    }).catch((error) => {
      throw new RESTError(error, 'Не удалось получить тест')
    })
  }

  static getSubTest (id) {
    return this._get(`test/subtest/${id}`, {}, {}).then((data) => {
      return data
    }).catch((error) => {
      throw new RESTError(error, 'Не удалось получить сабтест')
    })
  }

  static pushAnswer (test) {
    return this._post('test/attempt/create_attempt', {}, test).then((data) => {
      return data
    }).catch((error) => {
      throw new RESTError(error, 'Не удалось отправить ответ')
    })
  }

  static getAttemptById (id) {
    return this._get(`test/attempt_list/by_attempt_id/${id}`, {}, {}).then((data) => {
      return data
    }).catch((error) => {
      throw new RESTError(error, 'Не удалось получить попытку')
    })
  }

  static getAttemptForTest (id) {
    return this._get(`test/attempt_list/user_attempt_by_id/${id}`, {}).then((data) => {
      return data
    }).catch((error) => {
      throw new RESTError(error, 'Не удалось получить попытки пользователя по определенному тесту')
    })
  }

  static getAttemptForUser () {
    return this._get('test/attempt_list', {}).then((data) => {
      return data
    }).catch((error) => {
      throw new RESTError(error, 'Не удалось получить попытки пользователя')
    })
  }

  static addUserAttempt (params) {
    return this._get(`test/attempt_list/${params}`, {}, {}).then((data) => {
      const tokens = data
      return tokens
    }).catch((error) => {
      throw new RESTError(error, 'Не удалось создать пользователя')
    })
  }

  static getMetas () {
    return this._get('test/seo_scheme', {}, {}).then((data) => {
      return data
    }).catch((error) => {
      throw new RESTError(error, 'Не удалось получить мета')
    })
  }

  static getAdminTests (pagination) {
    return this._get(`test/test/big_test/limit=${pagination.limit}/offset=${pagination.offset}`, {}, {}).then((data) => {
      return data
    }).catch((error) => {
      throw new RESTError(error, 'Не удалось получить тесты')
    })
  }
}
