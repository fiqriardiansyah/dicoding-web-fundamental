class SidenavComponent extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
        <aside class="w-full h-full flex flex-col bg-slate-50 py-5 overflow-y-auto">
            <img src="assets/logo.svg" alt="" class="w-full px-10" />
            <p class="text-gray-400 capitalize mt-10 mb-2 font-poppins font-light px-10">menu</p>
            <list-menu></list-menu>
        </aside>
        `;
  }
}

customElements.define('sidenav-component', SidenavComponent);
