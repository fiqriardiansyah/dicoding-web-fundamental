class SidenavDrawer extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  closeDrawer() {
    const backdrop = this.querySelector('#backdrop');
    const drawer = this.querySelector('#drawer');

    backdrop.classList.add('hidden');
    drawer.classList.remove('show-drawer');
  }

  render() {
    this.innerHTML = `
        <div id="backdrop" class="w-screen h-screen fixed top-0 left-0 z-300 bg-black opacity-70 hidden"></div>
        <aside id="drawer" class="-translate-x-full h-screen w-80vw fixed top-0 left-0 z-400  max-w-xs transform transition-transform duration-300 pb-20">
          <div class="flex items-center w-full justify-between p-4 bg-primary">
            <p class="text-white text-xl">Devflix Indonesia</p>
            <button id="close" class="w-10 h-10 bg-gray-100 hover:bg-gray-300 p-3 transition duration-150 rounded-full">
              <img src="/assets/arrow-left.png" alt="back" class="w-full h-full object-contain" />
            </button>
          </div>
          <sidenav-component></sidenav-component>
        </aside>
        `;
    this.querySelector('#backdrop').addEventListener('click', () => {
      this.closeDrawer();
    });
    this.querySelector('#close').addEventListener('click', () => {
      this.closeDrawer();
    });
  }
}

customElements.define('sidenav-drawer', SidenavDrawer);
