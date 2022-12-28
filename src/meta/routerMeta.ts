import { RouteProps } from "react-router-dom"

interface CustomRouteProps {
  title: string,
  hide: boolean,
  account: boolean // 값 존재 안하면 로그인 공용, true 존재하면 로그인 필수, false이면 로그인 안된 상태에서만 접근 가능
}

export type RouteMetaProps = Omit<RouteProps, 'component'> & Partial<CustomRouteProps>

export type RouteMetaType = string | RouteMetaProps

export type RouterMetaTypes = { [key: string] : RouteMetaType | RouteMetaType[] } 

const routerMeta: RouterMetaTypes = {
  Home: { path: '/' },
  About: ['/about', '/test'],
  Board: {
    title: '게시판',
    path: '/board'
  },
  BoardCreate: {
    path: '/board/create',
    hide: true
  },
  BoardDetail: {
    path: '/board/:id',
    hide: true
  },
  Register: {
    path: '/register',
    account: false,
    hide: true
  },
}

export default routerMeta