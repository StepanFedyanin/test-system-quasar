const ajax = {
  timeout: 75000, responseType: 'json', responseEncoding: 'utf8'
}
const serviceUrl = {
  url: '//tests.flexidev.ru', localPath: '//localhost', protocol: 'https', port: '443', api: '/api', onLocal: false
}
const app = {
  url: `${serviceUrl.protocol}://${serviceUrl.url}${serviceUrl.api}`,
  token: 'c7d63a2e58d186ae3760a5f7c690293e973c08c4'
}
const accountMenu = {
  authorized: [{
    link: '/all_tests', name: 'allTests', title: 'Все тесты'
  }, {
    link: '/passed_tests', name: 'passedTests', title: 'Пройденные тесты'
  }],
  notAuthorized: [{
    link: '/all_tests', name: 'allTests', title: 'Все тесты'
  }]
}
const logger = {
  url: `${serviceUrl.url}/logger`,
  level: 'debug',
  token: 'c7d63a2e58d186ae3760a5f7c690293e973c08c4'
}
export {
  ajax, app, accountMenu, logger
}
