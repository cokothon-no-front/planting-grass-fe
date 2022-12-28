import React, { FunctionComponent, CSSProperties, useMemo, useEffect } from "react";
import DefaultLayout from "@/components/DefaultLayout";
import { Button } from "antd";
import FlexCenter from "@/components/FlexCenter";
import { useNavigate } from "react-router";
import { useRecoilValue } from "recoil";
import accountState from "@/state/account";
import { isEmpty } from "@/utils";

interface ICardViewProps {}

interface Props {
  style?: CSSProperties
}

const Home: FunctionComponent<ICardViewProps> = (props) => {
  const navigate = useNavigate();
  const account = useRecoilValue(accountState)

  const savedAccount: any = useMemo(() => {
    if (isEmpty(account)) {
      return undefined
    }
    return account
  }, [account])

  useEffect(() => {
    console.log('savedAccount', savedAccount)
    if (savedAccount !== undefined) {
      navigate('/task')
    }
  }, [navigate, savedAccount])
  

  return (
    <DefaultLayout style={{ padding: "0px !important" }}>
      <FlexCenter style={{ height: '100%' }}>
        <Button type="primary" size="large" style={{ width: 400, height: 200, fontSize: 70 }} onClick={() => {
          navigate("/login");
        }}>
          계획 세우기
        </Button>
      </FlexCenter>
    </DefaultLayout>
  );
};


export default Home;
