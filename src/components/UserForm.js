import React, { useState } from 'react'
import { useMutation } from 'react-query';
import { createUser } from '../api/userApi';

export default function UserForm() {

    const [response, setResponse] = useState({})

    const { mutate, isLoading } = useMutation(createUser, {
        onSuccess: (data) => {
            setResponse(data)
        }
    })
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        gender: '',
        status: ''
    })

    const handleFormChange = (e) => {
        setUserData(
            {
                ...userData,
                [e.target.name]: e.target.value
            }
        );
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(userData)
        mutate(userData)

    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className='field-container'>
                    <label htmlFor='name'>Name : </label>
                    <input type="text" name='name' onChange={handleFormChange} value={userData.name} />
                </div>

                <div className='field-container'>
                    <label htmlFor='name'>Email : </label>
                    <input type="email" name='email' onChange={handleFormChange} value={userData.email} />
                </div>



                <div className='fieldContainer'>
                    <label htmlFor='gender'>Gender : </label>
                    <input type="radio" name='gender' onChange={handleFormChange} value='female' /> Female

                    <input type="radio" name='gender' onChange={handleFormChange} value='male' /> Male

                </div>

                <div className='field-container'>
                    <label htmlFor='gender'>Status : </label>
                    <input type="radio" name='status' onChange={handleFormChange} value='active' /> Active

                    <input type="radio" name='status' onChange={handleFormChange} value='inactive' /> Inactive

                </div>
                <input type='submit' value={'Submit'} />

            </form>
            {isLoading && <div>Posting the data...</div>}
            {Object.keys(response).length > 0 && (<div>
                <h4>Response</h4>
                <p>{response.name}</p>
                <p>{response.email}</p>
            </div>)}
        </div>
    )
}