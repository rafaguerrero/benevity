import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CreateUserForm from './CreateUserForm';
import LoginForm from './LoginForm';

function UserManagement({ login }) {
    const [isCreate, setIsCreate] = useState(false);

    return (
        <div className="d-flex flex-column w-100">
            { isCreate ? <CreateUserForm /> : <LoginForm /> }

            <Button className="m-2" variant="contained" color="primary" onClick={() => setIsCreate(!isCreate)}>
                {!isCreate ? "Create User" : "Cancel"}
            </Button>
        </div>
    );
};

export default UserManagement;
