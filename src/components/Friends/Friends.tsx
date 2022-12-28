import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Avatar, Button, Popover } from 'antd';
import { userSave } from '@/api';
import { useRecoilState, useRecoilValue } from 'recoil';
import accountState from '@/state/account';
import { isEmpty } from '@/utils';
import BoardContext from '@/contexts/BoardContext';
import { ActionState } from '@/components/BoardPage/reducer';
import { LogoutOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import FlexCenter from '@/components/FlexCenter';
import tokenState from '@/state/token';
import { useNavigate } from 'react-router';

interface IFriendsProps {
  style?: any
}

const Friends: React.FunctionComponent<IFriendsProps> = (props) => {
  const { style = {} } = props
  const [_, setToken] = useRecoilState(tokenState)
  const account = useRecoilValue(accountState)
  const navigate = useNavigate();
  // const [friends, setFriends] = useState<any[]>([])

  const { state, dispatch } = useContext(BoardContext);
  const { friends = [] } = state

  const savedAccount: any = useMemo(() => {
    if (isEmpty(account)) {
      return undefined
    }
    return account
  }, [account])
  // console.log('savedAccount', savedAccount)
  
  const getFriends = useCallback(() => {
    if (savedAccount) {
      userSave
        .getSavePageableQuery(`${savedAccount.email}_friends`, {
          size: 100,
          page: 0,
          sort: "createdDate,desc",
        })
        .then(({ data }: any) => {
          console.log('getFriends data', data)
          dispatch({
            type: ActionState.SET,
            value: {
              key: 'friends',
              data,
            }
          });
        })
    }
  }, [dispatch, savedAccount])

  useEffect(() => {
    getFriends()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const logout = useCallback(() => {
    localStorage.removeItem('jwt')
    setToken('')
    navigate("/");
  }, [navigate, setToken])

  return <FlexCenter style={{ flexDirection: 'column', justifyContent: 'flex-start', ...style }}>
    <Popover placement="right" title={savedAccount.email} content={<FlexCenter>
      이름: {savedAccount.name}
      <Button icon={<LogoutOutlined />} style={{ marginLeft: 'auto' }} onClick={logout} danger />
    </FlexCenter>
  }>
      <Avatar icon={<UserOutlined />} size={'large'} />
    </Popover>
    <div style={{ paddingTop: 10 }}>

    </div>
    <Popover placement="right" title={savedAccount.email} content={<FlexCenter>
      이름: {savedAccount.name}
      <Button icon={<LogoutOutlined />} style={{ marginLeft: 'auto' }} onClick={logout} danger />
    </FlexCenter>
  }>
      <Avatar icon={<PlusOutlined />} size={'large'} />
    </Popover>
  </FlexCenter>;
};

export default Friends;
