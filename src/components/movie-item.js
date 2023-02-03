import Utils from '../utils/utils';

class MovieItem extends HTMLElement {
  setMovie(movie) {
    this.movie = movie;
    this.render();
  }

  onClick() {
    Utils.setMovie(this.movie?.id);
  }

  render() {
    this.innerHTML = `
        <button class="cursor-pointer group relative bg-transparent w-full">
            <div class="w-full h-full transition duration-200 group-hover:bg-black-transparent z-20 absolute top-0 left-0 p-5 rounded-lg flex items-center justify-center">
              <span class="text-white capitalize opacity-0 group-hover:opacity-100">${Utils.cutText(250, this.movie?.overview) || this.movie?.title}</span>
            </div>
            <img src="http://image.tmdb.org/t/p/w300/${this.movie?.poster_path}" alt="" class="h-full w-full min-h-[200px] lg:min-h-[300px] object-contain rounded-lg overflow-hidden bg-slate-200" />
            <div class="w-full mt-3 relative p-2">
                <div class="shadow-xl bg-white absolute top-[-2rem] left-[0.5rem] w-10 h-10 rounded-full border border-primary flex items-center justify-center z-10">
                    <span class="text-primary font-semibold">${this.movie?.vote_average}</span>
                </div>
                <p class="text-gray-700 capitalize font-semibold text-lg m-0">${this.movie?.title}</p>
                <p class="text-gray-400 font-light m-0">${this.movie?.release_date}</p>
            </div>
        </button>
        `;

    this.addEventListener('click', this.onClick);
  }
}

customElements.define('movie-item', MovieItem);
export default MovieItem;
