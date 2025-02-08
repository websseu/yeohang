import { Data } from './types';

const data: Data = {
  headerMenus: [
    { name: '국내.여행', href: '/domestic' },
    { name: '해외.여행', href: '/international' },
    { name: '축제.전시', href: '/events' },
    { name: '숙소.맛집', href: '/stays-eats' },
    { name: '여행.꿀팁', href: '/tips' },
  ],
  adminMenus: [
    { name: 'Overview', href: '/admin/overview' },
    { name: 'Posts', href: '/admin/posts' },
    { name: 'Users', href: '/admin/users' },
    { name: 'Reviews', href: '/admin/reviews' },
    { name: 'Settings', href: '/admin/settings' },
  ],
};

export default data;
