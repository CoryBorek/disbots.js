const EventEmitter = require('events');
const fetch = require('node-fetch')


response = "";
class DISBOTS extends EventEmitter {


  constructor(client, secret, /*autopostats,*/ webhook) {
    super();
    this.base_url = 'https://disbots.gg';
    this.client = client;
    this.secret = secret;
    //this.autopoststats = autopoststats,
    this.webhook = webhook
    this.webhookserver = null;
    this.webhooktask = null;
    this.autoposttask = null;

    if (webhook.port != null) console.log("port is not null");
    /*if (autopostats) setInterval(() => {
      console.log(postGuildCount())
    }, 300000)*/
    }

    async sendRequest(method, endpoint, data, requiresauth)
    {
      let headers;
      if (requiresauth)
      headers = {
        'Content-Type': 'application/json',
        'Authorization': this.secret.toString()
      }
      else
      headers = {
        'Content-Type': 'application/json',
      }

      let fetched = null
      let fetch_data = {}
      if (method === 'get') fetch_data = {
        method: method,
        headers: headers
      }
      else fetch_data = {
        method: method,
        body: JSON.stringify(data),
        headers: headers
      }
      await fetch(this.base_url + endpoint, fetch_data)
      .then(res => res.text())
      .then(text => fetched = text)
      .catch(err => console.log(err))

      //console.log(JSON.stringify(fetched))
      return fetched
    }

    async getBot(botID) {
      const data = {}
      return await this.sendRequest('get', '/api/bot/' + botID, data, false)
    }
    async postGuildCount(guildCount) {
      const data = {
        'servers': guildCount.toString()
      }
      return await this.sendRequest('put', '/api/stats', data, true)
    }

    async getUserBots(userID)
    {
      const data = {}
      return await this.sendRequest('get', '/api/user/' + userID + '/bots', data, false)
    }




}
module.exports = DISBOTS
