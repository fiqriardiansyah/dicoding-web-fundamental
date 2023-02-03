import client from './axios';

class Apis {
  static getAllGenre() {
    return client.get('/genre/movie/list');
  }

  static getGenreMovies(id) {
    return client.get(`discover/movie?with_genres=${id}`);
  }

  static getUpcomingMovies() {
    return client.get('/movie/upcoming');
  }

  static getSearchMovies(query) {
    return client.get(`/search/movie?query=${query}`);
  }

  static getMovie(id) {
    return client.get(`/movie/${id}`);
  }
}

export default Apis;
