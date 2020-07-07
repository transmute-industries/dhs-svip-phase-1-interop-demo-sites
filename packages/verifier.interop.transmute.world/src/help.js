
export const getVerificationFromVerifierApi = async (verifiablePresentation, options) => {
  const endpoint = localStorage.getItem('verifier_endpoint') || 'https://vc.transmute.world/v0.0.0/verifier/presentations';
  const response = await fetch(endpoint, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({ verifiablePresentation, options })
  });
  let results = await response.json();
  return results;
}

// nornmally challenge would be generated and stored serverside, and passed to the client
// where it would be forwarded to chapi.
// for demonstration purppses, we are setting them here.
export const getCHAPIQuery = (type) => {
  switch (type) {
    case 'DIDAuth': return {
      web: {
        VerifiablePresentation: {
          query: {
            type: 'DIDAuth'
          },
          // a 128-bit randomly generated value encoded as a string (use a UUID);
          // it will be digitally signed in the authentication proof
          // that will be attached to the VerifiablePresentation response
          challenge: '99612b24-63d9-11ea-b99f-4f66f3e4f81a',
          // the domain that must be digitally signed in the authentication
          // proof that will be attached to the VerifiablePresentation
          // response, identifying the recipient
          domain: window.location.hostname
        }
      }
    }
    default:
      return {
        web: {
          VerifiablePresentation: {
            query: [
              {
                type: 'QueryByExample',
                credentialQuery: {
                  reason: `Please present an ${type} for JaneDoe.`,
                  example: {
                    '@context': [
                      'https://www.w3.org/2018/credentials/v1',
                      'https://www.w3.org/2018/credentials/examples/v1',
                    ],
                    type: [type],
                  },
                },
              },
            ],
            // a 128-bit randomly generated value encoded as a string (use a UUID);
            // it will be digitally signed in the authentication proof
            // that will be attached to the VerifiablePresentation response
            challenge: '99612b24-63d9-11ea-b99f-4f66f3e4f81a',
            // the domain that must be digitally signed in the authentication
            // proof that will be attached to the VerifiablePresentation
            // response, identifying the recipient
            domain: window.location.hostname
          },
        },
      }
  }
}