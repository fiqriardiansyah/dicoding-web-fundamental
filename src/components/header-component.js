import { SEARCH } from '../utils/constant';
import Utils from '../utils/utils';

class HeaderComponent extends HTMLElement {
  connectedCallback() {
    this.render();
    this.defaultValue();
  }

  defaultValue() {
    const input = this.querySelector('input');
    const defaultVal = Utils.getSubMenu();
    const menu = Utils.getMenu();
    if (menu === SEARCH && defaultVal) {
      input.defaultValue = defaultVal;
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const { value } = e.target[0];
    if (value.trim()) {
      Utils.setMenu('search');
      Utils.setSubMenu(value.trim());
    }
  }

  onClick() {
    const backdrop = document.querySelector('#backdrop');
    const drawer = document.querySelector('#drawer');

    backdrop.classList.toggle('hidden');
    drawer.classList.toggle('show-drawer');
  }

  render() {
    this.innerHTML = `
        <div class="w-full p-3 items-center flex sticky top-0 left-0 bg-white z-100">
            <button class="lg:hidden text-white p-3 w-14 h-14 active:bg-slate-200 rounded-md">
              <img src="/assets/menu.svg" alt="menu" class="" />
            </button>
            <form class="relative w-full lg:ml-10 ml-4">
                <img src="/assets/search.svg" alt="" class="absolute z-10 w-8 top-1/2 transform -translate-y-1/2 left-2" />
                <input type="text" class="focus:outline-primary w-full lg:w-[400px] border border-secondary py-2 px-4 pl-12 font-light font-poppins rounded-full" placeholder="Search..." />
            </form>
        </div>
    `;
    this.querySelector('form').addEventListener('submit', (e) => this.onSubmit(e));
    this.querySelector('button').addEventListener('click', () => {
      this.onClick();
    });
  }
}

customElements.define('header-component', HeaderComponent);
export default HeaderComponent;
