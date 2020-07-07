import React from "react";
import PropTypes from "prop-types";

import BasePage from "../BasePage/BasePage";

import WalletContentsTable from '../../components/WalletContentsTable'
import HolderDID from '../../components/HolderDID'

const { credentialHandlerPolyfill } = window;


const HomePage = (props) => {
  const { tmui, setTmuiProp } = props;
  React.useEffect(() => {
    credentialHandlerPolyfill
      .loadOnce()
      .then(() => {
        if (!props.chapi.wallet.isLoaded) {
          props.loadWalletContents();
        }
      })
  }, [])

  return (
    <BasePage tmui={tmui} setTmuiProp={setTmuiProp}>
      <HolderDID />
      <WalletContentsTable title={'Wallet'} walletRows={props.walletObjectToArray(props.chapi.wallet.object)} />
    </BasePage>
  )
};

HomePage.propTypes = {
  tmui: PropTypes.object,
  setTmuiProp: PropTypes.func
};

export default HomePage;
