import axios from 'axios'

export default class RestService {
  constructor () {
    this.baseUrl = 'https://openmensa.org/api'
    this.instance = axios.create({
      baseURL: this.baseUrl
    })
  }

  async getAllCanteens () {
    let self = this
    let pageNumber
    let allCanteens
    await this.instance.get('/v2/canteens/')
      .then((response) => {
        pageNumber = response.headers['x-total-pages']
        allCanteens = [].concat(response.data)
      })
    for (let i = 2; i <= pageNumber; i++) {
      allCanteens = allCanteens.concat(await self.getCanteenPage(i))
    }
    return allCanteens
  }

  async getCanteenPage (pageNumber) {
    let canteenPage
    await this.instance.get('/v2/canteens/', {
      params: {
        page: pageNumber }})
      .then((result) => {
        canteenPage = result.data
      })
    return canteenPage
  }
}
