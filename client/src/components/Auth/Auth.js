import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {GoogleLogin} from 'react-google-login';

import {signin, signup} from '../../actions/auth';

const initialState = {
    username: '',
    email: '',
    password: '',
};

const Auth = () => {
    const [form, setForm] = useState(initialState);
    const [isSignup, setIsSignup] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    const switchMode = () => {
        setForm(initialState);
        setIsSignup((prevIsSignup) => !prevIsSignup);
    }
    
    const handleSubmit = (e) =>  {
        e.preventDefault();
        console.log("in handleSubmit");
        console.log(form);
        if(isSignup) {
            dispatch(signup(form, history));
        } else {
            dispatch(signin(form, history));
        }
    };

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;
        // Search the database over here and see if it already has a user associated with this email
        // if not then try to create it could just make this a utils function. 
        try {
            dispatch({type: 'AUTH', data: {result, token}});
            history.push('/');
        } catch(error) {
            console.log(error);
        }
    };

    const googleError = () => alert('Google Sign In was unsuccessful. Please try again later');

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    }

    return(
        <div className="container">
            <div className="justify-content-center">
                <form onSubmit={handleSubmit}>
                    {isSignup && (
                        <>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input name="email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={handleChange}/>
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        </>
                    )}

                    <div className="form-group">
                        <label htmlFor="username-field">Username</label>
                        <input name="username" type="text" className="form-control" id="username-field" placeholder="username" onChange={handleChange}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input name="password" type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={handleChange}/>
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>

                    <hr />
                    <GoogleLogin
                        clientId="404118205709-q44b6v04oeb1k3keteeoj6ft4jn3ijsa.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <button className="btn btn-primary" color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} variant="contained">
                                Google Sign In
                            </button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleError}
                        cookiePolicy="single_host_origin"
                    />
                </form>
            </div>
        </div>
    );
};

export default Auth;