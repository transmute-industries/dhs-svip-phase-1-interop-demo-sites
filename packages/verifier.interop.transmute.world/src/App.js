import React from 'react';
import * as chapi from 'credential-handler-polyfill';
import GithubCorner from 'react-github-corner';

import Theme from './components/Theme'
import './App.css';

import VerifyFromWallet from './components/VerifyFromWallet'

import logo from './logo.svg';

function App() {

  React.useEffect(() => {
    (async () => {
      try {
        await chapi.loadOnce();
      } catch (e) {
        console.error('Error in loadOnce:', e);
      }
    })();
  })
  return (
    <Theme>
      <div className="App">
        <GithubCorner bannerColor={'#594aa8'} href="https://github.com/transmute-industries/verifier.interop.transmute.world" />
        <div style={{ maxWidth: '512px', margin: 'auto', paddingTop: '5%', }}>
          <img src={logo} alt="transmute logo" style={{ width: '50%', margin: 'auto', display: 'block', padding: '32px 0px' }} />
          <VerifyFromWallet />
        </div>
      </div>
    </Theme>
  );
}

export default App;
