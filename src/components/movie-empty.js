class MovieEmpty extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  setMessage(text) {
    this.message = text;
    this.render();
  }

  render() {
    this.innerHTML = `
        <div class="w-full flex flex-col items-center">
        <lottie-player src="https://assets7.lottiefiles.com/datafiles/vhvOcuUkH41HdrL/data.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop  autoplay></lottie-player>
        <p class="capitalize text-2xl text-center font-medium text-gray-400">${this.message || ''}</p>
        </div>
    `;
  }
}

customElements.define('movie-empty', MovieEmpty);
