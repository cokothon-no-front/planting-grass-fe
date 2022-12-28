import React, { FunctionComponent, useCallback, useState } from 'react';
import { Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { userSave } from "@/api";
import { useNavigate } from 'react-router';

interface ITodoCheckProps {
  id: number,
  dataKey: string,
  data: string,
  userId: string
}

const TodoCheck: FunctionComponent<ITodoCheckProps> = (props) => {
  const { id, data, userId, ...rest } = props
  const { title, check }: { title: string, check: boolean } = JSON.parse(data) as any
  const [checked, setCheckComplete] = useState<boolean>(check)
  const navigate = useNavigate();
  
  const onChange = useCallback((e: CheckboxChangeEvent) => {
    const { checked } = e.target
    console.log(`checked = ${checked}`)
    setCheckComplete(checked)
    userSave.editUserSave(id, {
      id,
      userId,
      data: JSON.stringify({ title, check: checked }),
      private: true,
      ...rest
    })
      .then((res) => {
        console.log('complete', res.data)
        return userSave.addUserSave({
          dataKey: "log_task",
          data: `${userId}님이 ${title} 을(를) 완료했습니다!`,
          private: false,
        })
      })
      .then(() => {
        navigate('/task')
      })
  }, [id, navigate, rest, title, userId]);

  return <Checkbox onChange={onChange} onClick={(e) => {
    e.preventDefault()
    e.stopPropagation()
  }} defaultChecked={check}><span style={checked ? { textDecoration: 'line-through', color: '#cccccc', fontSize: 20 } : { fontSize: 20 }}>{title}</span></Checkbox>;
};

export default TodoCheck;
