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
  const { id, data, ...rest } = props
  const { title, check }: { title: string, check: boolean } = JSON.parse(data) as any
  const [checked, setCheckComplete] = useState<boolean>(check)
  const navigate = useNavigate();
  
  const onChange = useCallback((e: CheckboxChangeEvent) => {
    const { checked } = e.target
    console.log(`checked = ${checked}`)
    setCheckComplete(checked)
    userSave.editUserSave(id, {
      id,
      data: JSON.stringify({ title, check: checked }),
      private: true,
      ...rest
    })
      .then((res) => {
        console.log('complete', res.data)
        navigate('/task')
      })
  }, [id, navigate, rest, title]);

  return <Checkbox onChange={onChange} onClick={(e) => {
    e.preventDefault()
    e.stopPropagation()
  }} defaultChecked={check}><span style={checked ? { textDecoration: 'line-through', color: '#eeeeee', fontSize: 20 } : { fontSize: 20 }}>{title}</span></Checkbox>;
};

export default TodoCheck;
