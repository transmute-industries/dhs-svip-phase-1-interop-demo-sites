import React from "react";
import PropTypes from "prop-types";

import BasePage from "../BasePage/BasePage";

import WebKeystore from "../../components/WebKeystore/WebKeystore";

// import history from "../../store/history";

const KeystorePage = props => (
  <BasePage {...props}>
    <WebKeystore {...props} />
  </BasePage>
);

KeystorePage.propTypes = {
  tmui: PropTypes.any,
  setTmuiProp: PropTypes.any,
  keystore: PropTypes.any,
  doImportKeystore: PropTypes.any,
  onWalletDelete: PropTypes.any,
  doToggleKeystore: PropTypes.any,
  doCreateWalletKeystore: PropTypes.any
};

export default KeystorePage;
