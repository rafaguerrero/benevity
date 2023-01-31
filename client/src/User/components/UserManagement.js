import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CreateUserForm from './CreateUserForm';
import LoginForm from './LoginForm';

function UserManagement({ className }) {
    const [isCreate, setIsCreate] = useState(false);

    return (
        <div className="d-flex flex-column w-100">
            { isCreate ? <CreateUserForm className={className} /> : <LoginForm className={className} /> }

            <Button className="m-2" variant="contained" color="primary" onClick={() => setIsCreate(!isCreate)}>
                {!isCreate ? "Create User" : "Cancel"}
            </Button>
        </div>
    );
};

UserManagement.propTypes = {
    className: PropTypes.string
};

export default UserManagement;
