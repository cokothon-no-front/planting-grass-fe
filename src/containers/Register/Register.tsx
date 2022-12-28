import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { Form, Input, Button, Radio } from 'antd';
import DefaultLayout from '@/components/DefaultLayout';
import accountMeta, { RoleType, Account } from '@/meta/accountMeta';
import { account } from '@/api'
import {
  useNavigate
} from "react-router-dom";

interface IRegisterProps {
}

const { ROLE_TYPE } = accountMeta 

const INITIAL_ROLE_TYPE = RoleType.ROLE_USER

const { register } = account

const Register: FunctionComponent<IRegisterProps> = (props) => {
  const [form] = Form.useForm();
  const [selectRoleType, setSelectRoleType] = useState<RoleType>(INITIAL_ROLE_TYPE);
  const navigate = useNavigate();

  const onRoleTypeChange = ({ role_type }: { role_type: RoleType }) => {
    setSelectRoleType(role_type);
  };

  useEffect(() => {
    console.log('accountMeta', accountMeta)
    console.log('form', form)
  }, [])

  const onFinish = useCallback((values: any) => {
    console.log('Success:', values);
    const { email, name, password, role_type } = values
    const account: Account = {
      id: email,
      name,
      password,
      roleType: role_type
    }
    register(account)
      .then((data: any) => {
        navigate("/");
      })
    
  }, [navigate]);

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <DefaultLayout>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        form={form}
        onFinish={onFinish}
        id={'form'}
        onFinishFailed={onFinishFailed}
        initialValues={{ role_type: INITIAL_ROLE_TYPE, phone_check: false }}
        onValuesChange={onRoleTypeChange}
      >
        <Form.Item label="RoleType" name="role_type">
          <Radio.Group value={selectRoleType}>
            {Object.keys(ROLE_TYPE).map((role, key) => <Radio.Button key={key} value={ROLE_TYPE[role]}>{role}</Radio.Button>)}
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="E-mail"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input />
        </Form.Item>
      </Form>
      <Form.Item wrapperCol={{ span: 14, offset: 4 }}>
        <Button type="primary" onClick={() => form.submit()}>Register</Button>
      </Form.Item>
    </DefaultLayout>
  );
};

export default Register;
