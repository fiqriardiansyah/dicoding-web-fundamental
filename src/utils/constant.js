export const UPCOMING = 'upcoming';
export const GENRE = 'genre';
export const SEARCH = 'search';
export const MOVIE = 'movie';
export const PAGE_INDEX = 'index';
export const PAGE_DETAIL = 'detail';

export const menu = [
  {
    id: 1,
    name: UPCOMING,
    child: null,
  },
  {
    id: 2,
    name: GENRE,
    child: [],
  },
  { // only for hash url when search
    id: 3,
    name: SEARCH,
    child: null,
  },
];

export const pages = [
  {
    id: 1,
    name: PAGE_INDEX,
  },
  {
    id: 2,
    name: PAGE_DETAIL,
  },
];
