import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { removeCookieData } from '../../util/cookies';
import { useSelector } from 'react-redux';

function Navbar() {
    const authToken = useSelector(state => state.users.token);

    return (
        <AppBar position="fixed">
            <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6" >
                    <Link href="/" className="text-white">Home</Link>
                </Typography>
                {
                    authToken &&
                    <Typography variant="h6" onClick={() => removeCookieData('token')} >
                        <Link href="/" className="text-white">Logout</Link>
                    </Typography>
                }
            </Toolbar>
        </AppBar>
    );

};

export default Navbar;
