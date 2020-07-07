

import vendors from './vendors'
import verificationMethods from './vendors/verificationMethods'

const overrideBindingModel = (formBindingModel) => {
  const issuer_endpoint = localStorage.getItem('issuer_endpoint') || vendors[0].value;
  const options = verificationMethods[issuer_endpoint];
  const assertionMethod = localStorage.getItem('issuer_assertionMethod') || options[0].value
  const issuer = assertionMethod.split('#')[0]
  return {
    ...formBindingModel,
    issuer,
  }
}

export const getVpForAddToWalletType = async (formBindingModel) => {
  const bindingModel = overrideBindingModel(formBindingModel)
  const issuer_endpoint = localStorage.getItem('issuer_endpoint') || vendors[0].value;
  const options = verificationMethods[issuer_endpoint];
  const assertionMethod = localStorage.getItem('issuer_assertionMethod') || options[0].value
  const response = await fetch(issuer_endpoint, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({
      credential: bindingModel, options: {
        // proofPurpose: 'assertionMethod',
        issuanceDate: bindingModel.issuanceDate,
        issuer: assertionMethod.split('#')[0],
        assertionMethod: assertionMethod
      }
    })
  });
  let vc = await response.json();
  if (response.status >= 400) {
    console.error(vc);
    throw new Error('Something went wrong.')
  }
  return {
    "@context": [
      "https://www.w3.org/2018/credentials/v1",
      "https://www.w3.org/2018/credentials/examples/v1"
    ],
    "type": "VerifiablePresentation",
    "verifiableCredential": [vc]
  }

}