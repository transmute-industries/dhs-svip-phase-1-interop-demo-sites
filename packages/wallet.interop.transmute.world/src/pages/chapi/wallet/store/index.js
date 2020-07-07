import React from "react";
import ChapiWalletStore from "./ChapiWalletStore";

import { compose } from "redux";

import chapi from "../../../../store/chapi";
import tmui from "../../../../store/tmui";
const container = compose(chapi.container, tmui.container);


export default container(props => {
  return <ChapiWalletStore {...props} />;
});
