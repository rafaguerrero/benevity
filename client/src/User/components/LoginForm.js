import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { loginRequest } from '../UserActions';

function LoginForm({ className }) {
    const dispatch = useDispatch();
    const [state, setState] = useState({});

    const handleLogin = () => dispatch(loginRequest(state));

    const handleChange = (evt) => {
        const value = evt.target.value;
        setState({
            ...state,
            [evt.target.name]: value
        });
    };

    const canSubmit = () => !state.name || !state.password;

    return (
        <div className={`${className} d-flex flex-column w-100`}>
            <h3 className="mt-4">Login</h3>
            <TextField variant="filled" label="User" name="name" onChange={handleChange} />
            <TextField type='password' variant="filled" label="Password" name="password" onChange={handleChange} />
            <Button className="mt-4" variant="contained" color="primary" onClick={() => handleLogin()} disabled={canSubmit()}>
                Login
            </Button>
        </div>
    );
};

LoginForm.propTypes = {
    className: PropTypes.string
};

export default LoginForm;
