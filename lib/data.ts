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
    { name: '관리자', href: '/admin/overview' },
    { name: '글', href: '/admin/posts' },
    { name: '회원', href: '/admin/users' },
    { name: '댓글', href: '/admin/reviews' },
    { name: '설정', href: '/admin/settings' },
  ],
};

export default data;
