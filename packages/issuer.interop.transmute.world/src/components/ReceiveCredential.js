import React from 'react';

import Typography from '@material-ui/core/Typography'

import Paper from '@material-ui/core/Paper';

import Snackbar from './Snackbar';

import VCSchemaForm from './VCSchemaForm'
import SelectIssuerByImage from './SelectIssuerByImage/SelectIssuerByImage'
import SelectIssuerKey from './SelectIssuerKey/SelectIssuerKey'

import vcSchemaForms from '../vc-schema-forms'
import { getVpForAddToWalletType } from '../help';

import AutocompleteSelect from './AutocompleteSelect/AutocompleteSelect'
import vendors from '../vendors'
import verificationMethods from '../vendors/verificationMethods'

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
  // {
  //   value: 'ImmunoglobulinDetectionTestCard',
  //   label: 'Immunoglobulin Detection Test Card',
  //   logo: require('../images/transmute.png')
  // },
  // {
  //   value: 'AtlanticLumberBoardCredential',
  //   label: 'Atlantic Lumber Board Credential',
  //   logo: require('../images/customs_direct.png')
  // }
];


function ReceiveCredential(props) {

  const [state, setState] = React.useState({
    addToWalletType: options[0],
    issuerEndpoint: localStorage.getItem('issuer_endpoint') || vendors[0].value,
    tmui: {}
  });

  const handleChange = option => {
    setState({ ...state, addToWalletType: option });
  };

  const { schema, form, bindingModel } = vcSchemaForms[state.addToWalletType.value];
  // console.log({ schema, form, bindingModel })

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
      <Typography variant="h6" style={{ marginBottom: '32px' }}>Add to Wallet</Typography>

      <SelectIssuerByImage onChange={(issuerEndpoint) => {
        setState({
          ...state,
          issuerEndpoint
        })
      }} />

      <SelectIssuerKey issuerEndpoint={state.issuerEndpoint} verificationMethods={verificationMethods} />

      <br />
      <AutocompleteSelect options={options} value={state.addToWalletType} label={'Credential Type'} onChange={handleChange} />


      <VCSchemaForm schema={schema} form={form} bindingModel={{
        ...bindingModel,
        credentialSubject: {
          ...bindingModel.credentialSubject,
          id: props.DIDAuth.holder
        }
      }} onSubmit={async (formBindingModel) => {
        try {
          const vp = await getVpForAddToWalletType(formBindingModel)
          const webCredentialWrapper = new global.WebCredential(vp.type, vp);
          // Use Credential Handler API to store
          const result = await navigator.credentials.store(webCredentialWrapper);
          console.log('Result of receiving via store() request:', result);
          setState({
            ...state,
            tmui: {
              ...state.tmui,
              snackBarMessage: {
                open: true,
                variant: 'success',
                message: 'Credential stored in wallet.',
                vertical: 'top',
                horizontal: 'right',
                autoHideDuration: 2 * 1000,
              },
            }
          });
        } catch (e) {
          console.error(e);
          setState({
            ...state,
            tmui: {
              ...state.tmui,
              snackBarMessage: {
                open: true,
                variant: 'error',
                message: 'Something went wrong. See Developer Console.',
                vertical: 'top',
                horizontal: 'right',
                autoHideDuration: 2 * 1000,
              },
            }
          });
        }

      }} />
    </Paper >
  );
}

export default ReceiveCredential;
