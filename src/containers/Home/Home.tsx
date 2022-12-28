import React, { FunctionComponent, useMemo, useEffect } from "react";
import DefaultLayout from "@/components/DefaultLayout";
import FlexCenter from "@/components/FlexCenter";
import { useNavigate } from "react-router";
import { useRecoilValue } from "recoil";
import accountState from "@/state/account";
import { isEmpty } from "@/utils";
import SignIn from "@/components/SignIn";

interface IHomeProps {}

const Home: FunctionComponent<IHomeProps> = (props) => {
  const navigate = useNavigate();
  const account = useRecoilValue(accountState)

  const savedAccount: any = useMemo(() => {
    if (isEmpty(account)) {
      return undefined
    }
    return account
  }, [account])

  useEffect(() => {
    if (savedAccount !== undefined) {
      navigate('/task')
    }
  }, [navigate, savedAccount])
  

  return (
    <DefaultLayout style={{ padding: "0px !important" }}>
      <FlexCenter style={{ height: '100%', alignItems: 'flex-start' }}>
        <SignIn />
      </FlexCenter>
    </DefaultLayout>
  );
};


export default Home;
