import axios from 'axios'

export default class RestService {
  constructor () {
    this.baseUrl = 'https://openmensa.org/api/v2/'
    this.instance = axios.create({
      baseURL: this.baseUrl
    })
  }

  async getAllCanteens () {
    let self = this
    let pageNumber
    let allCanteens
    await this.instance.get('canteens')
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
    await this.instance.get('canteens', {
      params: {
        page: pageNumber }})
      .then((result) => {
        canteenPage = result.data
      })
    return canteenPage
  }

  async getMealsByCanteenId (canteenID) {
    let meals
    await this.instance.get('canteens/' + canteenID + '/meals')
      .then((response) => {
        meals = response.data
      })
    return meals
  }

  async getTodayOpen (canteenID) {
    let open
    let now = new Date()
    let nowString = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate()
    await this.instance.get('canteens/' + canteenID + '/days/' + nowString)
      .then((response) => {
        open = !response.data.closed
      })
      .catch(() => {
        open = false
      })
    return open
  }
}
