class PageIndex extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <main class="w-full h-full flex">
          <sidenav-fixed></sidenav-fixed>
          <sidenav-drawer></sidenav-drawer>
          <div id="main-container" class="w-screen lg:w-full h-full lg:ml-[250px] flex-col">
            <header-component></header-component>
            <movie-list></movie-list>
            <p class="text-primary text-center my-10">made with ❤️ by fiqriardiansyah</p>
          </div>
      </main>
    `;
  }
}

customElements.define('page-index', PageIndex);
