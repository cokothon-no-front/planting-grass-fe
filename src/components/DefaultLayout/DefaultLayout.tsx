import React, { FunctionComponent, useEffect, useMemo } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import PopOver from "@/components/PopOver";
import Account from "@/components/Account";
import { useIntl } from "react-intl";
import { routerMeta } from '@/meta';
import accountState from "@/state/account";
import { useRecoilValue } from "recoil";

import { Link, useLocation } from "react-router-dom";
import { assignRouteArrayProps, isEmpty } from "@/utils";
import { UserOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;

interface IDefaultLayoutProps {}

const defaultStyle = {
  height: "100%",
};

const menuStyle = {
  width: '100%',
  display: 'flex'
}

const nextRouter = (prev: any[], next: any, componentKey: string) => {
  const { length, ...rest } = next
  if (length === 1) {
    return [...prev, { componentKey, ...rest }]
  } else {
    return prev
  }
}

const defaultMenus: any[] = Object.keys(routerMeta).reduce((prev: any[], componentKey: string) => {
  const propsArr: any = assignRouteArrayProps(routerMeta[componentKey])
  const { hide, path, ...rest } = propsArr

  const getPath = (path: string) => (path.match(/\//gi) || []).length

  const pathWIthSlashLengthArr: any | any[] = Array.isArray(propsArr) ? propsArr.map(({ path }) => ({ path, ...rest, length: getPath(path) })) : ({ path, ...rest, length: getPath(path) })

  if (hide) {
    return prev
  } else if (Array.isArray(pathWIthSlashLengthArr)) {
    const assignPathData = pathWIthSlashLengthArr.reduce((prevArr, next) => nextRouter(prevArr, next, componentKey), [])
    return [...prev, ...assignPathData]
  } else {
    return nextRouter(prev, pathWIthSlashLengthArr, componentKey)
  }
}, [])

const DefaultLayout: FunctionComponent<IDefaultLayoutProps> = (props) => {
  const { children } = props;
  const { formatMessage: fm } = useIntl();
  const location = useLocation();
  const account = useRecoilValue(accountState)

  const savedAccount: any = useMemo(() => {
    if (isEmpty(account)) {
      return undefined
    }
    return account
  }, [account])

  const assignMenus = useMemo(() => defaultMenus.filter(({ account, path }) => {
    if (account) {
      return !!savedAccount
    } else if (account === undefined) {
      return true
    } else {
      return !savedAccount
    }
  }), [savedAccount])

  useEffect(() => {
    console.log('pathname', location.pathname)
  }, [location])

  const pathDom = useMemo(() => {
    const { pathname } = location
    const pathArray = pathname.split('/')
    const emptyToSpace = (text: string) => text === '' ? ' ' : text
    return pathArray.map(path => <Breadcrumb.Item key={path}>{emptyToSpace(path)}</Breadcrumb.Item>)
  }, [location])

  return (
    <Layout style={defaultStyle}>
      <Header className="header" style={{ display: "flex" }}>
        <div className="logo" style={{
          color: "white", width: 100, cursor: 'pointer'
        }}>
          {fm({ id: "title" })}
        </div>
        <Menu theme="dark" mode="horizontal" style={menuStyle} activeKey={location.pathname} selectable={false}>
          {assignMenus.map(({ componentKey, path }) => <Menu.Item key={path}>
            <Link to={path}>{componentKey} ({path})</Link>
          </Menu.Item>)}
          <div style={{ opacity: 1, marginLeft: "auto", order: assignMenus.length + 1 }}>
            <PopOver
              buttonProps={
                {
                  placement: "bottomLeft",
                  title: "Account",
                  content: <Account />,
                } as any
              }
            >
              <UserOutlined />
            </PopOver>
          </div>
        </Menu>
      </Header>
      <Layout>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            {pathDom}
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;
