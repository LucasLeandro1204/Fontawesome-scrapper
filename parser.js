'use strict';

const Axios   = require('axios');
const Cheerio = require('cheerio');

class Parser {
  constructor () {
    this.url = 'http://fontawesome.io/icons';
  }

  static json () {
    let self = new this();

    return new Promise((resolve, reject) => {
      self._fetch()
        .then(body => resolve(self.icons(body)))
        .catch(err => reject(err));
    });
  }

  icons (body) {
    const $ = Cheerio.load(body);
    let obj = {};

    $('#icons section:not(#new)').each((i, section) => {
      section = $(section);

      let category = section.attr('id');
      let icons = section.find('i');

      obj[category] = icons.map((i, icon) => $(icon).attr('class')).get();
    });

    return obj;
  }

  _fetch () {
    return Axios.get(this.url).then(({ data: body }) => body);
  }
}

module.exports = Parser;
