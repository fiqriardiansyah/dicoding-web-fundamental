import { PAGE_DETAIL } from '../utils/constant';
import Utils from '../utils/utils';

class LayoutContainer extends HTMLElement {
  connectedCallback() {
    this.setPage();
    window.addEventListener('hashchange', () => {
      if (this.page === Utils.getPage().name) return;
      this.setPage();
    });
  }

  setPage() {
    this.page = Utils.getPage().name;
    this.render();
  }

  render() {
    this.innerHTML = this.page === PAGE_DETAIL ? '<page-detail></page-detail>' : '<page-index></page-index>';
  }
}

customElements.define('layout-container', LayoutContainer);
export default LayoutContainer;
