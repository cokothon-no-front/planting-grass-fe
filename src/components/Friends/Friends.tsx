import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Avatar, Button, Popover, Input } from 'antd';
import { userSave, account } from '@/api';
import { useRecoilState, useRecoilValue } from 'recoil';
import accountState from '@/state/account';
import { isEmpty } from '@/utils';
import BoardContext from '@/contexts/BoardContext';
import { ActionState } from '@/components/BoardPage/reducer';
import { LogoutOutlined, PlusOutlined, UserOutlined, DeleteOutlined } from '@ant-design/icons';
import FlexCenter from '@/components/FlexCenter';
import tokenState from '@/state/token';
import { useNavigate } from 'react-router';
const { Search } = Input;
const { getUserList } = account

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
  const { friends = [] }: { friends: any[] } = state

  const savedAccount: any = useMemo(() => {
    if (isEmpty(account)) {
      return undefined
    }
    return account
  }, [account])
  // console.log('savedAccount', savedAccount)
  const friendsKey = `${savedAccount.email}_friends`
  
  const getFriends = useCallback(() => {
    if (savedAccount) {
      userSave.getSavePageableQuery(friendsKey, {
        size: 100,
        page: 0,
        sort: "createdDate,desc",
      }).then(({ data }: any) => {
        console.log('getFriends data', data)
        dispatch({
          type: ActionState.SET,
          value: {
            key: 'friends',
            data: data.map(v => ({ ...JSON.parse(v.data), id: v.id })),
          }
        });
      })
    }
  }, [dispatch, friendsKey, savedAccount])

  useEffect(() => {
    getFriends()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const logout = useCallback(() => {
    localStorage.removeItem('jwt')
    setToken('')
    navigate("/");
  }, [navigate, setToken])

  const onAddFriends = useCallback((value: string) => {
    console.log("onAddFriends", value)
    getUserList(value).then((data: any[]) => {
      const user = data?.[0]
      if (!isEmpty(user) && friends.find(v => v.email === user.id) === undefined && user.id !== savedAccount.email) {
        const userData = {
          email: user.id,
          name: user.name
        }
        userSave.addUserSave({
          dataKey: friendsKey,
          data: JSON.stringify(userData),
          private: true
        }).then((data: any) => {
          console.log('raddUserSave res.data', data, userData)
          const appendFrineds = [...friends, { ...userData, id: data.id }]
          console.log('appendFrineds', appendFrineds)
          dispatch({
            type: ActionState.SET,
            value: {
              key: 'friends',
              data: appendFrineds,
            }
          })
        })
      }
    })
  }, [dispatch, friends, friendsKey, savedAccount.email])

  const deleteFriends = useCallback((id: number) => {
    console.log("deleteFriends", id)
    userSave.deleteUserSave(id).then((data: any[]) => {
      console.log('data', data)
      dispatch({
        type: ActionState.SET,
        value: {
          key: 'friends',
          data: friends.filter(v => v.id !== id),
        }
      })
    })
  }, [dispatch, friends])


  return <FlexCenter style={{ flexDirection: 'column', justifyContent: 'flex-start', ...style }}>
    <Popover placement="right" title={savedAccount.email} content={
      <FlexCenter>
        이름: {savedAccount.name}
        <Button icon={<LogoutOutlined />} style={{ marginLeft: 'auto' }} onClick={logout} danger />
      </FlexCenter>
    }>
      <Avatar icon={<UserOutlined />} size={'large'} />
    </Popover>
    <FlexCenter style={{ paddingBottom: 10, flexDirection: 'column', justifyContent: 'flex-start' }}>
      {
        friends.map((friend) => {
          const { email, name, id } = friend
          return <Popover placement="right" title={email} key={id} content={
            <FlexCenter>
              이름: {name}
              <Button icon={<DeleteOutlined />} style={{ marginLeft: 'auto' }} onClick={() => deleteFriends(id)} danger >친구</Button>
            </FlexCenter>
          }>
            <Avatar size={'large'} style={{ marginTop: 10, backgroundColor: '#1890ff' }}>
              {email.substr(0, 5)}
            </Avatar>
          </Popover>
        })
      }
    </FlexCenter>
    <Popover placement="right" title={<div>
      <Search
        placeholder="친구 이메일 검색"
        allowClear
        enterButton="추가"
        size="large"
        onSearch={onAddFriends}
      />
    </div>}>
      <Avatar icon={<PlusOutlined />} size={'large'} />
    </Popover>
  </FlexCenter>;
};

export default Friends;
