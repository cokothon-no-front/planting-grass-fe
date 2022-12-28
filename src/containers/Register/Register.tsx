import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { Form, Input, Button, Radio } from 'antd';
import DefaultLayout from '@/components/DefaultLayout';
import accountMeta, { RoleType, Account } from '@/meta/accountMeta';
import { account } from '@/api'
import {
  useNavigate
} from "react-router-dom";
import FlexCenter from '@/components/FlexCenter';

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
      <FlexCenter style={{ }}>
        <FlexCenter style={{ borderRadius: 30, backgroundColor: '#53a151', flexDirection: 'column', padding: 30 }}>
          <div style={{ fontSize: 30, color: 'white', fontWeight: 'bold' }}>
            회원가입
          </div>
          <div style={{ width: 400, marginTop: 20 }}>
            <Form
              // labelCol={{ span: 8 }}
              wrapperCol={{ span: 24 }}
              form={form}
              onFinish={onFinish}
              id={'form'}
              onFinishFailed={onFinishFailed}
              initialValues={{ role_type: INITIAL_ROLE_TYPE, phone_check: false }}
              onValuesChange={onRoleTypeChange}
            >
              <Form.Item name="role_type" style={{ display: 'none' }}>
                <Radio.Group value={selectRoleType}>
                  {Object.keys(ROLE_TYPE).map((role, key) => <Radio.Button key={key} value={ROLE_TYPE[role]}>{role}</Radio.Button>)}
                </Radio.Group>
              </Form.Item>
              <Form.Item
                // label="E-mail"
                name="email"
                rules={[{ required: true, message: "Please input your email!" }]}
              >
                <Input placeholder='email' />
              </Form.Item>
              <Form.Item
                // label="Password"
                name="password"
                rules={[{ required: true, message: "Please input your password!" }]}
              >
                <Input.Password  placeholder='password' />
              </Form.Item>
              <Form.Item
                // label="Name"
                name="name"
                rules={[{ required: true, message: "Please input your name!" }]}
              >
                <Input placeholder='name' />
              </Form.Item>
            </Form>
            <Form.Item wrapperCol={{ span: 24 }}>
              <Button type="primary" style={{ width: '100%' }} onClick={() => form.submit()}>register</Button>
            </Form.Item>
          </div>
        </FlexCenter>
      </FlexCenter>
    </DefaultLayout>
  );
};

export default Register;
