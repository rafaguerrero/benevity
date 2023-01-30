import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { addUserRequest } from '../UserActions';

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

function CreateUserForm() {
    const dispatch = useDispatch();
    const [state, setState] = useState({});
    const classes = useStyles();

    const handleSubmit = () => {
        dispatch(addUserRequest({ 
            name: state.name,
            password: state.password
        }))
    }

    const handleChange = (evt) => {
        const value = evt.target.value;
        setState({
            ...state,
            [evt.target.name]: value
        });
    };

    const canSubmit = () => 
        !state.name ||
        !state.password ||
        !state.confirm ||
        state.password !== state.confirm;

    return (
        <div className={`${classes.root} d-flex flex-column w-100`}>
            <h3 className='mt-4'>Create a user</h3>
            <TextField variant="filled" label="User" name="name" onChange={handleChange} />
            <TextField type='password' variant="filled" label="Password" name="password" onChange={handleChange} />
            <TextField error={state.password !== state.confirm} type='password' variant="filled" label="Confirm Password" name="confirm" onChange={handleChange} />
            <Button className="mt-4" variant="contained" color="primary" onClick={() => handleSubmit()} disabled={canSubmit()}>
                Create
            </Button>
        </div>
    );
};

export default CreateUserForm;
