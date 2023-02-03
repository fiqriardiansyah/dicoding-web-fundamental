import qstring from 'query-string';
import {
  menu, pages, PAGE_DETAIL, PAGE_INDEX,
} from './constant';

class Utils {
  static initial() {
    const { location } = window;
    const parse = qstring.parse(location.hash);
    // hash url [menu, sub, movie]
    if (Object.keys(parse).length === 0) {
      window.location = '#menu=upcoming';
      return {
        menu: 'upcoming',
      };
    }
    if ('movie' in parse) {
      return parse;
    }
    if (!menu.find((el) => el.name === parse.menu)) {
      window.location = '#menu=upcoming';
      return {
        menu: 'upcoming',
      };
    }
    return parse;
  }

  static getMenu() {
    const { location } = window;
    const parse = qstring.parse(location.hash);
    return parse.menu;
  }

  static getSubMenu() {
    const { location } = window;
    const parse = qstring.parse(location.hash);
    return parse.sub;
  }

  static setMenu(name) {
    const stringifyHash = qstring.stringify({ menu: name });
    window.location = `#${stringifyHash}`;
  }

  static setSubMenu(id) {
    const mn = this.getMenu();
    const merge = {
      menu: mn,
      sub: id,
    };
    const stringifyHash = qstring.stringify(merge);
    window.location = `#${stringifyHash}`;
  }

  static setMovie(id) {
    const stringifyHash = qstring.stringify({ movie: id });
    window.location = `#${stringifyHash}`;
  }

  static getMovie() {
    const { location } = window;
    const parse = qstring.parse(location.hash);
    return parse.movie;
  }

  static getPage() {
    const movie = this.getMovie();
    if (movie) {
      return pages.find((el) => el.name === PAGE_DETAIL);
    }
    return pages.find((el) => el.name === PAGE_INDEX);
  }

  static cutText(length, string) {
    if (!string) return '-';
    return string?.length > length ? `${string.slice(0, length)}...` : string;
  }
}

export default Utils;
