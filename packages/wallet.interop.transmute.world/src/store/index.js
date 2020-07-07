import { connectRouter } from "connected-react-router";

import history from "./history";

import keystore from "./keystore";
import chapi from "./chapi";

import tmui from "./tmui";


export default {
  router: connectRouter(history),
  keystore: keystore.reducer,
  chapi: chapi.reducer,
  tmui: tmui.reducer
};
