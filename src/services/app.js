import { app as settings } from 'src/settings'
import { REST, RESTError } from './rest'

export default class extends REST {
  static get settings () {
    return settings
  }

  static obtainToken (params) {
    return this._post('token/create', {}, params).then((data) => {
      return data
    }).catch((error) => {
      throw new RESTError(error, 'Не удалось авторизоваться')
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

  static getAttempById (id) {
    return this._get(`test/attempt_list/by_attempt_id/${id}`, {}, {}).then((data) => {
      return data
    }).catch((error) => {
      throw new RESTError(error, 'Не удалось получить попытку')
    })
  }
}
