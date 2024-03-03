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

  static getTopic () {
    return this._get('test/topic', {}, {}).then((data) => {
      return data
    }).catch((error) => {
      throw new RESTError(error, 'Не удалось получить темы')
    })
  }

  static getAuthor () {
    return this._get('test/author', {}, {}).then((data) => {
      return data
    }).catch((error) => {
      throw new RESTError(error, 'Не удалось получить авторов')
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
    return this._get(`test/attempt/by_attempt_id/${id}`, {}, {}).then((data) => {
      return data
    }).catch((error) => {
      throw new RESTError(error, 'Не удалось получить попытку')
    })
  }

  static getAttemptForTest (id) {
    return this._get(`test/attempt/user_attempt_by_id/${id}`, {}).then((data) => {
      return data
    }).catch((error) => {
      throw new RESTError(error, 'Не удалось получить попытки пользователя по определенному тесту')
    })
  }

  static getAttemptForUser () {
    return this._get('test/attempt', {}).then((data) => {
      return data
    }).catch((error) => {
      throw new RESTError(error, 'Не удалось получить попытки пользователя')
    })
  }

  static addUserAttempt (params) {
    return this._get(`test/attempt/${params}`, {}, {}).then((data) => {
      const tokens = data
      return tokens
    }).catch((error) => {
      throw new RESTError(error, 'Не удалось создать пользователя')
    })
  }

  static getSearchTest (params) {
    return this._get('test/test', params, {}).then((data) => {
      const tokens = data
      return tokens
    }).catch((error) => {
      throw new RESTError(error, 'Не удалось получить тесты')
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

  static getAdminTest (test) {
    return this._get(`test/test/full_description_test/${test}`, {}, {}).then((data) => {
      return data
    }).catch((error) => {
      throw new RESTError(error, 'Не удалось получить тест')
    })
  }

  static getAdminTestSubtests (test) {
    return this._get(`test/test/full_test/${test}`, {}, {}).then((data) => {
      return data
    }).catch((error) => {
      throw new RESTError(error, 'Не удалось получить сабтесты')
    })
  }

  static getAdminTestScale (test) {
    return this._get(`test/test/full_scales/${test}`, {}, {}).then((data) => {
      return data
    }).catch((error) => {
      throw new RESTError(error, 'Не удалось получить шкалы')
    })
  }

  static getAdminTestKeys (test) {
    return this._get(`test/test/question_answer/${test}`, {}, {}).then((data) => {
      return data
    }).catch((error) => {
      throw new RESTError(error, 'Не удалось получить ключи')
    })
  }
}
