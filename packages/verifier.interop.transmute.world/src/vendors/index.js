
import transmute from '../images/transmute.png'
import mavennet from '../images/mavennet.png'
import factom from '../images/factom.png'
import digital_bazaar from '../images/digital_bazaar.png'
import secure_key from '../images/secure_key.png'
import danube_tech from '../images/danube_tech.png'
import sicpa from '../images/sicpa.png'

const vendors = [
    {
        value: 'https://vc.transmute.world/v0.1.0/verify/presentations',
        logo: transmute,
        label: 'Transmute',
    },
    {
        value: 'https://api.neo-flow.com/verifier/presentations',
        label: 'Mavennet',
        logo: mavennet,
    },
    {
        value: 'https://vc.api.factom.sphereon.com/services/verify/presentations',
        label: 'Factom',
        logo: factom
    },
    {
        value: 'https://verifier.interop.digitalbazaar.com/verifier/presentations',
        label: 'Digital Bazaar',
        logo: digital_bazaar
    },
    {
        value: 'https://verifier.sandbox.trustbloc.dev/verifier/presentations',
        label: 'Secure Key',
        logo: secure_key
    },
    {
        value: 'https://univerifier.io/api/verifier/presentations',
        label: 'Danube Tech',
        logo: danube_tech
    },
    {
        value: 'https://svip-interop.ocs-support.com/api/verifier/presentations',
        label: 'SICPA',
        logo: sicpa
    },
];

export default vendors;