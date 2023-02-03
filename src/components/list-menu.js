import { Apis } from '../config';
import { menu as MenuListDefault } from '../utils/constant';
import Utils from '../utils/utils';

class ListMenu extends HTMLElement {
  connectedCallback() {
    this.setMenu([...MenuListDefault.filter((el) => el?.id !== 3)]);
    this.initialMenu();
    this.initialSubMenu();
  }

  initialMenu() {
    const menuUrl = Utils.getMenu();
    const defaultMenuUrl = this.menu.find((el) => el.name === menuUrl);
    this.setCurrentActiveMenu(defaultMenuUrl);
  }

  initialSubMenu() {
    const subMenuIdUrl = Utils.getSubMenu();
    if (subMenuIdUrl) {
      this.setCurrentActiveSubMenuId(parseInt(subMenuIdUrl, 10));
    }
  }

  setCurrentActiveMenu(mn) {
    this.activeMenu = mn;
    this.getChild(mn);
    this.render();
  }

  setCurrentActiveSubMenuId(id) {
    this.activeSubMenuId = id;
    this.render();
  }

  setMenu(mn) {
    this.menu = mn;
    this.render();
  }

  onClick(id) {
    const mn = this.menu.find((el) => el.id === parseInt(id, 10));
    this.setCurrentActiveMenu(mn);
    Utils.setMenu(mn.name);
    this.menu.forEach((el) => {
      if (el.child !== null && el.id === parseInt(id, 10)) {
        this.getChild(el);
        return;
      }
      this.activeSubMenuId = null;
    });
  }

  onClickChild(id) {
    const mn = this.menu.find((el) => el.id === this.activeMenu.id);
    const child = mn.child.find((el) => el.id === parseInt(id, 10));
    Utils.setSubMenu(id);
    this.setCurrentActiveSubMenuId(child.id);
  }

  getChild(mn) {
    if (mn.id === 2) { // genre
      const genreMenu = this.menu.find((el) => el.id === mn.id);

      if (genreMenu.child?.length !== 0) {
        this.setCurrentActiveSubMenuId(genreMenu.child[0].id);
        Utils.setSubMenu(genreMenu.child[0].id);
        return '';
      }

      this.loadingId = mn.id;

      Apis.getAllGenre().then((res) => {
        this.loadingId = null;

        const { genres } = res.data;
        const transformMenu = [...this.menu.map((el) => (el.id === mn.id ? { ...el, child: [...genres] } : el))];
        this.setMenu(transformMenu);
        this.setCurrentActiveSubMenuId(this.activeSubMenuId || genres[0].id);
        Utils.setSubMenu(this.activeSubMenuId || genres[0].id);
      }).catch((err) => {
        alert(err.message || 'Ooops something went wrong!!!');
      });
    }
    return '';
  }

  render() {
    this.innerHTML = `
      <ul class="w-full h-full">
        ${this.menu.map((el) => `<li class="w-full menu" id="${el.id}">
          <div class="flex items-center w-full justify-between">
            <button id="${el.id}" class="button-menu capitalize w-full p-2 pl-10 text-left ${el.name === this.activeMenu?.name ? 'font-medium border-l-8 border-primary' : 'text-gray-500'}">
              ${el.name}
            </button>
            <div class="w-10 h-10 loading-container">
              ${this.loadingId === el.id ? '<loading-component></loading-component>' : ''}
            </div>
          </div>
          ${el?.child !== null && el.name === this.activeMenu?.name ? `<div class="w-full bg-slate-100">
            <ul class="w-full">
              ${el.child?.map((c) => `<li class="pl-16 ${c.id === this.activeSubMenuId ? 'border-l-2 border-primary' : ''}">
                <button id="${c.id}" class="button-menu-child text-gray-400 py-1 ${c.id === this.activeSubMenuId ? 'font-medium !text-black' : ''}">
                  ${c.name}
                </button>
              </li>`).join('')}
            </ul>
          </div>` : ''}
        </li>`).join('')}
      </ul>
    `;

    this.querySelectorAll('.button-menu').forEach((button) => {
      button.addEventListener('click', () => {
        this.onClick(button.id);
      });
    });

    this.querySelectorAll('.button-menu-child').forEach((button) => {
      button.addEventListener('click', () => {
        this.onClickChild(button.id);
      });
    });
  }
}

customElements.define('list-menu', ListMenu);

export default ListMenu;
