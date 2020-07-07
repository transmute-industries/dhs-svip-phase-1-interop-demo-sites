import React from "react";
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button'

function HolderDID() {

    let holder = localStorage.getItem('holder');

    if (!holder) {
        holder = 'did:key:z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd';
        localStorage.setItem('holder', holder);
    }

    const [state, setState] = React.useState({
        holder,
    })
    return (
        <div style={{ marginBottom: '16px' }}>
            <InputLabel id={'holder-label'}>Holder</InputLabel>
            <Select
                labelId="holder-label"
                value={state.holder}
                onChange={(event) => {
                    setState({
                        holder: event.target.value
                    })
                    localStorage.setItem('holder', event.target.value);
                }}
            >
                <MenuItem value={'did:web:vc.transmute.world'}>did:web:vc.transmute.world</MenuItem>
                <MenuItem value={'did:key:z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd'}>did:key:z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd</MenuItem>
                <MenuItem value={'did:elem:ropsten:EiBJJPdo-ONF0jxqt8mZYEj9Z7FbdC87m2xvN0_HAbcoEg'}>did:elem:ropsten:EiBJJPdo-ONF0jxqt8mZYEj9Z7FbdC87m2xvN0_HAbcoEg</MenuItem>
                <MenuItem value={'did:v1:test:nym:z6MkhdmzFu659ZJ4XKj31vtEDmjvsi5yDZG5L7Caz63oP39k'}>did:v1:test:nym:z6MkhdmzFu659ZJ4XKj31vtEDmjvsi5yDZG5L7Caz63oP39k</MenuItem>
            </Select>

            <Button variant={'contained'} color={'secondary'} style={{ float: 'right' }} onClick={() => {
                localStorage.removeItem('walletContents');
                window.location.reload();
            }}>Delete Wallet Contents</Button>
        </div>
    );
}
export { HolderDID };
export default HolderDID;
