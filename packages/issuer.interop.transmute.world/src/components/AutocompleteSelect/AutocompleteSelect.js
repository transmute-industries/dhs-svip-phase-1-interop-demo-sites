/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    option: {
        fontSize: 15,
        '& > span': {
            marginRight: 10,
            fontSize: 18,
        },
    },
});


export default function AutocompleteSelect({ label, options, value, onChange }) {
    const classes = useStyles();

    return (
        <Autocomplete
            id="country-select-demo"
            options={options}
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
            onChange={(event, option) => {
                // console.log(vendor)
                if (option) {
                    onChange(option)
                }

            }}
            value={value}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
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
