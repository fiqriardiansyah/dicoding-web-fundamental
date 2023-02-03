import Utils from '../utils/utils';
import { Apis } from '../config';

class PageDetail extends HTMLElement {
  constructor() {
    super();
    this.movieId = Utils.getMovie();
  }

  connectedCallback() {
    this.setLoading(true);
    this.getDetailMovie();
  }

  setLoading(loading) {
    this.loading = loading;
    this.render();
  }

  setMovie(movie) {
    this.movie = movie;
    this.render();
  }

  getDetailMovie() {
    Apis.getMovie(this.movieId)
      .then((res) => {
        this.setMovie(res.data);
        this.setLoading(false);
      }).catch((err) => {
        this.setLoading(false);
        alert(err?.message || 'Ooops something went wrong');
      });
  }

  back() {
    if (document.referrer === '') {
      window.location.href = '/';
    } else {
      window.history.back();
    }
  }

  render() {
    this.innerHTML = `
        <div class="w-full px-3 md:px-10 py-3">
          <div class="w-full flex items-center">
            <button id="back" class="w-14 h-14 bg-gray-100 hover:bg-gray-300 p-5 transition duration-150 rounded-full">
              <img src="/assets/arrow-left.png" alt="back" class="w-full h-full object-contain" />
            </button>
            ${this.loading
    ? '<loading-component></loading-component>'
    : `<p class="text-black font-medium capitalize text-lg ml-5">${this.movie?.title}</p>`}
          </div>
          ${this.loading
    ? `<div class="w-full h-[400px] flex flex-col items-center justify-center">
      <loading-component size="100"></loading-component>
      <p class="capitalize text-slate-500 text-lg mt-4">getting data...</p>
    </div>`
    : `<div class="w-full relative rounded-lg mt-5 overflow-hidden bg-black-transparent min-h-[300px]">
          <img src="http://image.tmdb.org/t/p/w500/${this.movie?.backdrop_path}" alt="${this.movie?.title}" class="w-full h-full object-cover -z-1 absolute top-0 left-0 bg-gray-500" />
          <div class="w-full flex z-10 px-3 py-10 lg:px-10 flex-col md:flex-row items-start">
            <div class="flex w-full md:w-fit">
              <img src="http://image.tmdb.org/t/p/w300/${this.movie?.poster_path}" alt="${this.movie?.title}" class="w-full md:w-[300px] min-h-[400px] object-contain rounded-lg bg-gray-300" />
            </div>
            <div class="flex-1 ml-4 mt-10 lg:mt-0">
              <div class="flex items-center">
              <div class="shadow-xl bg-white w-20 h-20 rounded-full border border-primary flex items-center justify-center z-10">
                  <span class="text-primary text-4xl font-semibold">${this.movie?.vote_average?.toFixed(1)}</span>
              </div>
              <p class="text-white capitalize ml-3">user score</p>
              </div>
              <h1 class="text-white font-semibold text-3xl capitalize mt-4">${this.movie?.title}</h1>
              <p class="text-white capitalize">${`${this.movie?.release_date}. ${this.movie?.genres?.map((el) => el.name).join(', ')}. ${this.movie?.runtime} minutes`}</p>
              <h2 class="text-white font-semibold text-2xl mt-5">Overview</h2>
              <p class="text-white capitalize">${this.movie?.overview}</p>
            </div>
          </div>
        </div>`}
        <p class="text-primary text-center my-10">made with ❤️ by fiqriardiansyah</p>
        </div>
    `;

    this.querySelector('#back').addEventListener('click', () => {
      this.back();
    });
  }
}

customElements.define('page-detail', PageDetail);
