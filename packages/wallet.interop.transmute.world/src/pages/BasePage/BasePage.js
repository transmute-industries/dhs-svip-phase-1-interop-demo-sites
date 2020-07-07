import React from "react";
import PropTypes from "prop-types";
import * as chapi from 'credential-handler-polyfill';
import * as WebCredentialHandler from 'web-credential-handler';
import Theme from "../../components/Theme/Theme";
import Snackbar from "../../components/Snackbar/Snackbar";

import AppBarWithDrawer from "../../components/AppBarWithDrawer/AppBarWithDrawer";
import DrawerContent from "../../components/AppBarWithDrawer/DrawerContent";
import rightHandAccountMenu from '../../components/AppBarWithDrawer/rightHandAccountMenu';

import logo from "../../components/Logo/logo.svg";


const BasePage = ({ tmui, setTmuiProp, children }) => {
  React.useEffect(() => {
    if (!window.__chapi__run__once) {
      (async () => {
        try {
          await chapi.loadOnce();
          const WALLET_LOCATION = window.origin;
          const workerUrl = `${WALLET_LOCATION}/worker.html`;
          const registration = await WebCredentialHandler.installHandler({ url: workerUrl });
          await registration.credentialManager.hints.set(
            'test', {
            name: 'TestUser',
            enabledTypes: ['VerifiablePresentation', 'VerifiableCredential', 'UniversityDegreeCredential']
          });
          console.log('Wallet registered.');
        } catch (e) {
          console.error('Error in loadOnce:', e);
        }
      })();
    }
    window.__chapi__run__once = true;
  })
  return (
    <Theme>
      <AppBarWithDrawer
        rightHandAccountMenu={rightHandAccountMenu}
        headerImage={logo}
        drawer={<DrawerContent tmui={tmui} setTmuiProp={setTmuiProp} />}
        content={children}
      />
      <Snackbar tmui={tmui} setTmuiProp={setTmuiProp} />
    </Theme>
  )
};

BasePage.propTypes = {
  children: PropTypes.any.isRequired,
  tmui: PropTypes.any,
  setTmuiProp: PropTypes.any
};

export default BasePage;
