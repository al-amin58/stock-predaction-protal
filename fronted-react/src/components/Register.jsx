import React, {use, useState} from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({});
    const [success, setSeccess] = useState(false);
    const [ loading, setLoading] = useState(false);

    const handleRegister = async (e) =>{
        e.preventDefault();
        setLoading(true);
        
        const userData = {
            username,
            email,
            password
        }

        try{
            const response = await axios.post('http://127.0.0.1:8000/api/v1/register/', userData);
            console.log(response.data);
            console.log('User registered successfully!');
            setError({});
            setSeccess(true);
        }catch(error){
            setError(error.response.data);
            console.error('There was an error!', error.response.data);
        }finally{
            setLoading(false);
        }


    }
  return (
    <>
        <div className='container'>
            <div className='row justify-content-center'>
                <div className='col-md-6 bg-light-dark p-5 rounded'>
                    <h3 className='text-light text-center mb-4'>Create an Account</h3>
                    <form onSubmit={handleRegister}>
                        {success && <div className='alert alert-success'>Registration Successfuly !</div>}
                        <div className='mb-3'>
                            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className='form-control mb-3' placeholder='Enter username ' />
                            <small>{error.username && <div className='text-danger'>{error.username}</div>}</small>
                        </div>
                        <div className='mb-3'>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className='form-control mb-3' placeholder='Enter email ' />
                            <small>{error.email && <div className='text-danger'>{error.email}</div>}</small>
                        </div>
                        <div className='mb-3'>
                            <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} className='form-control mb-3' placeholder='Enter password ' />
                            <small>{error.password && <div className='text-danger'>{error.password}</div>}</small>
                        </div>
                        {loading ? (<button className='btn btn-info d-block mx-auto' disabled><FontAwesomeIcon icon={faSpinner} spin/>Loading...</button>) :(
                            <button type='submit' className='btn btn-info d-block mx-auto'>Register</button>
                        )}
                        
                    </form>
                </div>
            </div>
        </div>
    </>
  )
}

export default Register