import './public/style.css';
import './utils/constant';
import './config';
import './pages/index';
import './pages/detail';
import './components';
import './layout';

import Utils from './utils/utils';

Utils.initial();

document.addEventListener('DOMContentLoaded', () => {
  const layoutContainer = document.createElement('layout-container');
  document.body.appendChild(layoutContainer);
});
