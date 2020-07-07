import React from "react";
import HomePage from "./HomePage";

import { compose } from "redux";

import tmui from "../../store/tmui";
import chapi from "../../store/chapi";

const container = compose(chapi.container, tmui.container);

export default container(props => {
  return <HomePage {...props} />;
});
