import React from "react";
import PropTypes from "prop-types";

import Typography from "@material-ui/core/Typography";

import Button from "@material-ui/core/Button";
import Theme from '../../../../components/Theme/Theme'
import Loading from '../../../../components/Loading/Loading'

import CredentialCard from '../../../../components/CredentialCard/CredentialCard'

const { WebCredentialHandler, credentialHandlerPolyfill } = window;

const ChapiWalletStore = (props) => {

  const [state, setState] = React.useState({})

  React.useEffect(() => {
    const handleStoreEvent = async () => {
      if (!props.chapi.wallet.isLoaded) {
        props.loadWalletContents();
      }

      const event = await WebCredentialHandler.receiveCredentialEvent();
      console.log('Store Credential Event:', JSON.stringify(event, null, 2));
      const credential = event.credential;
      // Display the credential details, for confirmation
      const vp = credential.data;
      let vc;
      if (vp.verifiableCredential) {
        vc = Array.isArray(vp.verifiableCredential)
          ? vp.verifiableCredential[0]
          : vp.verifiableCredential;
      } else {
        vc = vp;
      }

      setState({
        ...state,
        event,
        credential,
        vc
      })
    }

    credentialHandlerPolyfill
      .loadOnce()
      .then(handleStoreEvent);
  }, [])

  if (!state.credential) {
    return <Loading message={'Loading credential...'} />
  }
  return (
    <Theme>
      <div style={{ height: '100%', padding: '8px' }}>
        <Typography style={{ marginBottom: '8px', marginTop: '4px' }}>Are you sure you wish to store this credential?</Typography>

        <CredentialCard verifiableCredential={state.vc} />

        <div style={{ marginTop: '32px' }}>
          <Button onClick={() => {
            state.event.respondWith(new Promise(resolve => {
              return resolve({ dataType: 'Response', data: 'canceled' });
            }))
          }}>Cancel</Button>

          <Button style={{ float: 'right' }} variant={'contained'} color={'primary'} onClick={() => {

            props.storeInWallet(state.credential.data);
            state.event.respondWith(new Promise(resolve => {
              return resolve({ dataType: 'Response', data: 'result' });
            }))
          }}>Confirm</Button>
        </div>

      </div>
    </Theme>
  )
};

ChapiWalletStore.propTypes = {
  tmui: PropTypes.object,
  setTmuiProp: PropTypes.func
};

export default ChapiWalletStore;
