import Utils from '../utils/utils';
import {
  GENRE, SEARCH, UPCOMING,
} from '../utils/constant';
import { Apis } from '../config';

class MovieList extends HTMLElement {
  constructor() {
    super();
    this.apis = [
      {
        name: UPCOMING,
        api: () => Apis.getUpcomingMovies(),
      },
      {
        name: GENRE,
        api: (id) => Apis.getGenreMovies(id),
      },
      {
        name: SEARCH,
        api: (query) => Apis.getSearchMovies(query),
      },
    ];
  }

  connectedCallback() {
    if (Utils.getMenu()) {
      this.getMovies(Utils.getMenu(), Utils.getSubMenu());
    }
    window.addEventListener('hashchange', () => {
      window.scrollTo(0, 0);
      this.getMovies(Utils.getMenu(), Utils.getSubMenu());
    });
  }

  setLoading(loading) {
    if (loading) {
      this.setData(null);
    }
    this.loading = loading;
    this.render();
  }

  getMovies(menu, sub) {
    this.setLoading(true);
    this.apis.forEach((api) => {
      if (api.name === menu) {
        if (api.name === GENRE && !sub) return;
        api.api(sub).then((res) => {
          const { data } = res;
          if (data) {
            this.setData(data);
          }
          this.setLoading(false);
        }).catch((err) => {
          alert(err?.message || 'Ooops something went wrong');
        });
      }
    });
  }

  setData(data) {
    this.data = data;
    this.render();
  }

  render() {
    this.innerHTML = `
       <div id="container" class="w-full h-full mt-10">
       ${this.loading
    ? `<div class="w-full h-[400px] flex flex-col items-center justify-center">
              <loading-component size="100"></loading-component>
              <p class="capitalize text-slate-500 text-lg mt-4">getting data...</p>
            </div>`
    : ''}
    <div id="movie-container" class="w-full px-3 lg:px-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4"></div>
       </div>
    `;

    (() => {
      const container = this.querySelector('#container');
      const movieContainer = this.querySelector('#movie-container');

      if (this.data?.results?.length !== 0) {
        this.data?.results.forEach((el) => {
          const movie = document.createElement('movie-item');
          movie.setMovie(el);
          movieContainer.appendChild(movie);
        });
      } else {
        const empty = document.createElement('movie-empty');
        empty.setMessage(Utils.getMenu() === SEARCH ? `sorry, no movies for '${Utils.getSubMenu()}'` : 'movie empty');
        container.appendChild(empty);
      }
    })();
  }
}

customElements.define('movie-list', MovieList);
export default MovieList;
