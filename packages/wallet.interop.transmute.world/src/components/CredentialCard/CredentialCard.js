import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const excludedCredentialSubjectProperties = ['image', 'type'];
const excludedCredentialProperties = ['credentialSubject', 'type', '@context', 'proof'];
const dateKeys = ['issuanceDate', 'expirationDate'];

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));


export default function BasicCard({ verifiableCredential }) {
    const classes = useStyles();

    const [expanded, setExpanded] = React.useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };


    const renderProp = (prop, key) => {
        let value = prop.toString();
        if (value === 'true') {
            return <span style={{ borderRadius: '4px', padding: '4px', backgroundColor: '#d32f2f', color: '#fff' }}>{'Positive'}</span>
        }
        if (value === 'false') {
            return <span style={{ borderRadius: '4px', padding: '4px', backgroundColor: '#7cb342' }}>{'Negative'}</span>
        }
        if (dateKeys.indexOf(key) !== -1) {
            return moment(value).fromNow()
        }
        if (typeof prop === 'object' && prop.id) {
            value = prop.id;
        }
        return <span style={{ wordBreak: 'break-all', paddingLeft: '16px' }}>{value.slice(0, 64)}</span>;
    }

    const subject = verifiableCredential.credentialSubject.cmtr ? verifiableCredential.credentialSubject.cmtr : verifiableCredential.credentialSubject

    return (
        <Box>
            <ExpansionPanel>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading}>Credential</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Box style={{ padding: '0 16px' }} flexGrow={1}>
                        {
                            Object.keys(verifiableCredential).map((k) => {
                                if (excludedCredentialProperties.indexOf(k) === -1) {
                                    return (<Box display="flex" p={1} key={k} style={{
                                        fontSize: '.8em',
                                        borderBottom: '1px solid #000',
                                        marginBottom: '8px'

                                    }}>
                                        <Box flexGrow={1}>
                                            <span style={{ fontWeight: 700 }}>{k}</span>
                                        </Box>
                                        <Box>
                                            {renderProp(verifiableCredential[k], k)}
                                        </Box>
                                    </Box>)
                                }
                            })
                        }
                    </Box>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography className={classes.heading}>Subject</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Grid container>

                        {
                            verifiableCredential.credentialSubject.image &&
                            <Grid item xs={12} lg={4}>
                                <Box>
                                    <img src={verifiableCredential.credentialSubject.image} />
                                </Box>
                            </Grid>
                        }

                        <Grid item xs={12} lg={verifiableCredential.credentialSubject.image ? 8 : 12}>
                            {
                                Object.keys(subject).map((k) => {
                                    if (excludedCredentialSubjectProperties.indexOf(k) === -1 && typeof subject[k] !== 'object') {
                                        return (<Box display="flex" p={1} key={k} style={{
                                            fontSize: '.8em',
                                            borderBottom: '1px solid #000',
                                            marginBottom: '8px'

                                        }}>
                                            <Box flexGrow={1}>
                                                <span style={{ fontWeight: 700 }}>{k}</span>
                                            </Box>
                                            <Box>
                                                {renderProp(subject[k])}
                                            </Box>
                                        </Box>)
                                    }
                                })
                            }
                        </Grid>
                    </Grid>


                </ExpansionPanelDetails>
            </ExpansionPanel>
        </Box>
    );
}