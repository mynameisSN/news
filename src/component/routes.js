import News from './news/News';
import List from './list/List';
import Anchor from './anchor/Anchor';
import Pagination from './pagination/Pagination';

const routes = [
  {
    path: '/',
    component: News,
    exact: true,
  },
  {
    path: '/list',
    component: List,
    params: 'list',
  },
  {
    path: '/latest',
    component: Anchor,
    params: 'latest',
  },
  {
    path: '/page',
    component: Pagination,
  },
];

export default routes;
