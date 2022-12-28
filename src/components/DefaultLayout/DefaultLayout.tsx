import React, { FunctionComponent, useEffect, useMemo } from "react";
import { Layout, Menu } from "antd";
import PopOver from "@/components/PopOver";
import Account from "@/components/Account";
import { useIntl } from "react-intl";
import { routerMeta } from '@/meta';
import accountState from "@/state/account";
import { useRecoilValue } from "recoil";

import { Link, useLocation } from "react-router-dom";
import { assignRouteArrayProps, isEmpty } from "@/utils";
import { UserOutlined } from '@ant-design/icons';
import background from './imgs/background.png'
import Title from "@/components/Title";

const { Header } = Layout;

interface IDefaultLayoutProps {
  style?: any
}

const defaultStyle = {
  height: "100%",
  background: '#FFF0DA',
  display: 'flex',
  flexDirection: 'column'
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
  const { children, style = {} } = props;
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

  return (
    <Layout style={defaultStyle as any}>
      {/* <Header className="header" style={{ display: "flex" }}>
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
      </Header> */}
      <Layout style={{ backgroundColor: "#FFF0DA", backgroundImage: `url(${background})`, height: '100%', backgroundRepeat: 'no-repeat', backgroundPosition: 'bottom', backgroundSize: 'contain' }}>
        <div style={{ padding: "10px 20px", height: '100%', ...style }}>
          <Title style={{ marginTop: 50, marginBottom: 40 }} />
          {children}
        </div>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;
