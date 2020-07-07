import { withHandlers } from "recompose";
import { compose } from 'recompose';

import { v4 as uuidv4 } from 'uuid';

const walletObjectToArray = (walletContents = {}) => {
  return Object.values(walletContents);
}

export default compose(
  withHandlers({
    walletObjectToArray: () => walletObjectToArray,
    loadWalletContents: ({ setChapiProp }) => () => {
      let walletContents = localStorage.getItem('walletContents');
      if (!walletContents) {
        setChapiProp({
          wallet: {
            isLoaded: true
          }
        });
      } else {
        walletContents = JSON.parse(atob(walletContents));
        setChapiProp({ wallet: { isLoaded: true, object: walletContents } });
      }
    },
  }),
  withHandlers({
    storeInWallet: ({ chapi, loadWalletContents }) => (verifiablePresentation) => {
      let walletContents = chapi.wallet.object || {};
      let vc = verifiablePresentation;
      if (verifiablePresentation.verifiableCredential) {
        vc = Array.isArray(verifiablePresentation.verifiableCredential)
          ? verifiablePresentation.verifiableCredential[0]
          : verifiablePresentation.verifiableCredential;
      }
      const id = vc.id || `urn:uuid:${uuidv4()}`;
      walletContents[id] = vc;
      const serialized = btoa(JSON.stringify(walletContents));
      localStorage.setItem('walletContents', serialized);
      loadWalletContents();
    }
  }))

