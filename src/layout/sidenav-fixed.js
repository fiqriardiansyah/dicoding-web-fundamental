class SidenavFixed extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
        <div class="w-[250px] h-full fixed top-0 left-0 hidden lg:block">
            <sidenav-component></sidenav-component>
        </div>
        `;
  }
}

customElements.define('sidenav-fixed', SidenavFixed);
