/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

import vendors from '../../vendors';

const useStyles = makeStyles({
    option: {
        fontSize: 15,
        '& > span': {
            marginRight: 10,
            fontSize: 18,
        },
    },
});


export default function SelectIssuerByImage({ onChange }) {
    const classes = useStyles();

    let defaultVendor = vendors.find((v) => {
        return v.value === localStorage.getItem('issuer_endpoint')
    }) || vendors[0]

    const [state, setState] = React.useState({
        selectedIssuer: defaultVendor
    })

    return (
        <Autocomplete
            id="country-select-demo"
            options={vendors}
            fullWidth
            classes={{
                option: classes.option,
            }}
            autoHighlight
            getOptionLabel={(option) => option.label}
            renderOption={(option) => (
                <React.Fragment>
                    <img alt={option.label} src={option.logo} style={{ height: '32px', width: '32px', paddingRight: '16px' }} />
                    {option.label}
                </React.Fragment>
            )}
            onChange={(event, vendor) => {
                // console.log(vendor)
                if (vendor) {
                    localStorage.setItem('issuer_endpoint', vendor.value)
                    setState({
                        ...state,
                        selectedIssuer: vendor
                    })
                    onChange(vendor.value)
                }

            }}
            value={state.selectedIssuer}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Choose an Issuer"
                    variant="outlined"
                    inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password', // disable autocomplete and autofill
                    }}
                />
            )}
        />
    );
}
