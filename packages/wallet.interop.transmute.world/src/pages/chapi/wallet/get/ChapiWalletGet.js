import React from "react";
import PropTypes from "prop-types";

import Typography from "@material-ui/core/Typography";
import Theme from '../../../../components/Theme/Theme'

import WalletContentsTable from '../../../../components/WalletContentsTable'

const { WebCredentialHandler, credentialHandlerPolyfill } = window;

const getHolderAndVerificationMethod = () => {
  let holder = localStorage.getItem('holder');
  if (!holder) {
    holder = 'did:key:z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd';
    localStorage.setItem('holder', holder);
  }
  let verificationMethod;
  switch (holder) {
    case 'did:web:vc.transmute.world': {
      verificationMethod = "did:web:vc.transmute.world#z6MksHh7qHWvybLg5QTPPdG2DgEjjduBDArV9EF9mRiRzMBN";
      break;
    }
    case 'did:key:z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd': {
      verificationMethod = "did:key:z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd#z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd";
      break;
    }
    case 'did:elem:ropsten:EiBJJPdo-ONF0jxqt8mZYEj9Z7FbdC87m2xvN0_HAbcoEg': {
      verificationMethod = "did:elem:ropsten:EiBJJPdo-ONF0jxqt8mZYEj9Z7FbdC87m2xvN0_HAbcoEg#xqc3gS1gz1vch7R3RvNebWMjLvBOY-n_14feCYRPsUo";
      break;
    }
    default:
      throw new Error('unsupported demo holder.')
  }
  return { holder, verificationMethod };
}

const getDomainAndChallenge = (event) => {
  let { challenge, domain, query } = event.credentialRequestOptions.web.VerifiablePresentation;

  if (query.challenge) {
    challenge = query.challenge;
  }

  if (query.domain) {
    domain = query.domain;
  }

  if (!domain) {
    domain = event.credentialRequestOrigin.split('//').pop()
  }
  return { domain, challenge };
}

const ChapiWalletGet = (props) => {
  const [state, setState] = React.useState({
    event: {},
    query: {}
  })
  React.useEffect(() => {
    credentialHandlerPolyfill
      .loadOnce()
      .then(() => {
        if (!props.chapi.wallet.isLoaded) {
          props.loadWalletContents();
        }
      })
  }, [])

  React.useEffect(() => {
    async function handleGetEvent() {
      const event = await WebCredentialHandler.receiveCredentialEvent();
      console.log('Wallet processing get() event:', event);
      const vp = event.credentialRequestOptions.web.VerifiablePresentation;
      const query = Array.isArray(vp.query) ? vp.query[0] : vp.query;



      if (query.type === 'DIDAuth') {
        // TODO: Sign Presentation...
        const endpoint = 'https://vc.transmute.world​/v0.1.0/prove/presentations'
        const { holder, verificationMethod } = getHolderAndVerificationMethod();
        const { domain, challenge } = getDomainAndChallenge(event);

        const response = await fetch(endpoint, {
          method: 'POST',
          mode: 'cors',
          cache: 'no-cache',
          headers: {
            'Content-Type': 'application/json'
          },
          redirect: 'follow',
          referrerPolicy: 'no-referrer',
          body: JSON.stringify({
            presentation: {
              "@context": "https://www.w3.org/2018/credentials/v1",
              "type": "VerifiablePresentation",
              holder,
            }, options: {
              proofPurpose: "authentication",
              domain,
              challenge,
              verificationMethod
            }
          })
        });

        let signedDIDAuthResponse = await response.json();
        props.storeInWallet(signedDIDAuthResponse);

      }

      setState({
        ...state,
        event,
        query
      })
    }
    credentialHandlerPolyfill
      .loadOnce()
      .then(handleGetEvent);
  }, [])

  return (
    <Theme>
      <div style={{ height: '100%', padding: '8px' }}>
        <Typography style={{ marginBottom: '8px', marginTop: '4px' }}>
          {state.event.credentialRequestOrigin} has requested a {state.query.type}.
          </Typography>

        <WalletContentsTable credentialRequestOptions={state.event.credentialRequestOptions} walletRows={props.walletObjectToArray(props.chapi.wallet.object)} onShare={async (thing) => {
          let vp = thing;
          const { holder, verificationMethod } = getHolderAndVerificationMethod();
          if (thing.type !== 'VerifiablePresentation') {
            vp = {
              "@context": [
                "https://www.w3.org/2018/credentials/v1",
                "https://www.w3.org/2018/credentials/examples/v1"
              ],
              holder,
              "type": "VerifiablePresentation",
              "verifiableCredential": [thing]
            }
          }

          if (!vp.proof) {
            // /v0.1.0​/prove​/presentations
            const endpoint = 'https://vc.transmute.world​/v0.1.0/prove/presentations'
            const { domain, challenge } = getDomainAndChallenge(state.event);
            const response = await fetch(endpoint, {
              method: 'POST',
              mode: 'cors',
              cache: 'no-cache',
              headers: {
                'Content-Type': 'application/json'
              },
              redirect: 'follow',
              referrerPolicy: 'no-referrer',
              body: JSON.stringify({
                presentation: vp, options: {
                  proofPurpose: "authentication",
                  domain,
                  challenge,
                  verificationMethod
                }
              })
            });
            vp = await response.json();
          }


          state.event
            .respondWith(Promise.resolve({
              dataType: 'VerifiablePresentation', data: vp
            }));
        }} />

      </div>
    </Theme>
  )
};

ChapiWalletGet.propTypes = {
  tmui: PropTypes.object,
  setTmuiProp: PropTypes.func
};

export default ChapiWalletGet;
