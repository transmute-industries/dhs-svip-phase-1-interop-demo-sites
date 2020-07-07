import React from 'react';

import Typography from '@material-ui/core/Typography/Typography'
import Button from '@material-ui/core/Button/Button'
import _ from 'lodash';
import Paper from '@material-ui/core/Paper';

import Snackbar from './Snackbar';

import SelectVendorByImage from './SelectVendorByImage/SelectVendorByImage'
import AutocompleteSelect from './AutocompleteSelect/AutocompleteSelect'
import { getVerificationFromVerifierApi, getCHAPIQuery } from '../help';

const options = [
  {
    value: 'CertifiedMillTestReport',
    label: 'Certified Mill Test Report',
    logo: require('../images/dhs.png')
  },
  {
    value: 'BillOfLadingCredential',
    label: 'Bill Of Lading Credential',
    logo: require('../images/dhs.png')
  },
  {
    value: 'PermanentResidentCard',
    label: 'Permanent Resident Card',
    logo: require('../images/dhs.png')
  },
  {
    value: 'UniversityDegreeCredential',
    label: 'University Degree Credential',
    logo: require('../images/transmute.png')
  },
  {
    value: 'ImmunoglobulinDetectionTestCard',
    label: 'Immunoglobulin Detection Test Card',
    logo: require('../images/transmute.png')
  },
  {
    value: 'AtlanticLumberBoardCredential',
    label: 'Atlantic Lumber Board Credential',
    logo: require('../images/customs_direct.png')
  }
];

function VerifyFromWallet() {

  const [state, setState] = React.useState({
    verifyFromWalletType: options[0],
    tmui: {}
  });


  const handleChange = option => {
    setState({ ...state, verifyFromWalletType: option });
  };

  return (
    <Paper style={{ padding: '32px' }}>
      <Snackbar tmui={state.tmui} doSetTmuiProp={(prop) => {
        setState({
          ...state,
          tmui: {
            ...state.tmui,
            ...prop
          }
        })
      }} />
      <Typography variant="h6" style={{ marginBottom: '32px' }}>Verify from Wallet</Typography>
      <SelectVendorByImage />
      <br />
      <AutocompleteSelect options={options} value={state.verifyFromWalletType} label={'Credential Type'} onChange={handleChange} />
      <div style={{ marginTop: '16px', marginBottom: '16px' }}>
        <Button variant={'contained'} onClick={async () => {
          try {
            const query = getCHAPIQuery(state.verifyFromWalletType.value)
            const result = await navigator.credentials.get(query);
            console.log('query: ', query)
            console.log('result: ', result)
            const options = { ...query.web.VerifiablePresentation };
            const verifiablePresentation = { ...result.data };
            const verification = await getVerificationFromVerifierApi(verifiablePresentation, {
              checks: ['proof'],
              domain: options.domain,
              challenge: options.challenge
            });
            if (!verification.checks) {
              setState({
                ...state,
                tmui: {
                  ...state.tmui,
                  snackBarMessage: {
                    open: true,
                    variant: 'error',
                    message: `${_.startCase(result.data.type)} verification failed. `,
                    vertical: 'top',
                    horizontal: 'right',
                    autoHideDuration: 1 * 1000,
                  },
                }
              });
            } else {
              setState({
                ...state,
                tmui: {
                  ...state.tmui,
                  snackBarMessage: {
                    open: true,
                    variant: 'success',
                    message: `${_.startCase(result.data.type)} verification succeeded. `,
                    vertical: 'top',
                    horizontal: 'right',
                    autoHideDuration: 1 * 1000,
                  },
                }
              });
            }
          } catch (e) {
            console.error(e);
            setState({
              ...state,
              tmui: {
                ...state.tmui,
                snackBarMessage: {
                  open: true,
                  variant: 'error',
                  message: `Something went wrong. See Developer Console.`,
                  vertical: 'top',
                  horizontal: 'right',
                  autoHideDuration: 20 * 1000,
                },
              }
            });
          }



        }}>Verify</Button>
      </div>
    </Paper >
  );
}

export default VerifyFromWallet;
