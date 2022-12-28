import React, { FunctionComponent } from "react";
import { IntlProvider } from "react-intl";
import CommonRouter from "./CommonRouter";
import { BrowserRouter as Router } from "react-router-dom";

import {
  useRecoilValue,
} from "recoil";
import langState, { messages } from "@/state/lang";
import BoardContextWrapper from "@/components/BoardPage/BoardContextWrapper";

const App: FunctionComponent<any> = () => {
  const lang = useRecoilValue(langState);

  return (
    <IntlProvider locale={lang} messages={messages[lang]}>
      <BoardContextWrapper>
        <Router>
          <CommonRouter />
        </Router>
      </BoardContextWrapper>
    </IntlProvider>
  );
};

export default App;
