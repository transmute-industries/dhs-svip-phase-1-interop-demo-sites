import React from 'react';

import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

export default function SelectIssuerKey({ issuerEndpoint, verificationMethods }) {
    // console.log(issuer_endpoint, verificationMethods)
    const options = verificationMethods[issuerEndpoint];

    const [verificationMethod, setVerificationMethod] = React.useState(
        options[0].value
    );

    const handleChange = (event) => {
        localStorage.setItem('issuer_assertionMethod', event.target.value)
        setVerificationMethod(event.target.value);
    };

    return (

        <TextField
            id="outlined-select-verificationMethod"
            select
            label="Issuer DID"
            value={verificationMethod}
            onChange={handleChange}
            fullWidth
            variant="outlined"
        >
            {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
            ))}
        </TextField>


    );
}
