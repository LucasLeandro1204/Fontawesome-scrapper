'use strict';

const Axios   = require('axios');
const Cheerio = require('cheerio');

class Parser {
  constructor () {
    this.body = {};
    this.url = 'http://fontawesome.io/icons';
  }

  static json () {
    let self = new this();

    return new Promise((resolve, reject) => {
      self._fetch()
        .then(() => resolve(self.icons()))
        .catch((err) => {
          reject(err);
        });
    });
  }

  icons () {
    const $ = Cheerio.load(this.body);

    return $('#icons section:not(#new)').map((i, section) => {
      section = $(section);

      let category = section.attr('id');
      let icons = section.find('i');

      return {
        [category]: icons.map((i, icon) => {
          return $(icon).attr('class');
        }).get(),
      }
    }).get();
  }

  _fetch () {
    return Axios.get(this.url).then(({ data: body }) => this.body = body);
  }
}

module.exports = Parser;
