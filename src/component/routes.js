import News from './news/News';
import List from './news/News';

const routes = [
  {
    path: '/',
    component: News,
    exact: true,
  },
  {
    path: '/list',
    component: List,
  },
];

export default routes;
