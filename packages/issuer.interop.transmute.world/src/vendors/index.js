
import transmute from '../images/transmute.png'
import mavennet from '../images/mavennet.png'
import factom from '../images/factom.png'
import digital_bazaar from '../images/digital_bazaar.png'
import secure_key from '../images/secure_key.png'
import danube_tech from '../images/danube_tech.png'
import sicpa from '../images/sicpa.png'


const vendors = [
    {
        value: 'https://vc.transmute.world/v0.0.0/credentials/issueCredential',
        logo: transmute,
        label: 'Transmute',
    },
    {
        value: 'https://api.neo-flow.com/credentials/issueCredential',
        label: 'Mavennet',
        logo: mavennet,
    },
    {
        value: 'https://vc.api.factom.sphereon.com/services/issue/credentials',
        label: 'Factom',
        logo: factom
    },
    {
        value: 'https://issuer.interop.digitalbazaar.com/credentials/did%3Akey%3Az6MkkHSTSr9DSNLoioiVEZq8RKm9Sn1Xs4SjZXgzQASBMdc3/issueCredential',
        label: 'Digital Bazaar',
        logo: digital_bazaar
    },
    {
        value: 'https://issuer.sandbox.trustbloc.dev/vc-issuer-interop/credentials/issueCredential',
        label: 'Secure Key',
        logo: secure_key
    },
    {
        value: 'https://uniissuer.io/api/credentials/issueCredential',
        label: 'Danube Tech',
        logo: danube_tech
    },
    {
        value: 'https://svip-interop.ocs-support.com/api/credentials/issueCredential',
        label: 'SICPA',
        logo: sicpa
    },
];

export default vendors;