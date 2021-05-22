import React, {useState, useEffect} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import decode from 'jwt-decode';
import getUsername from '../../utils';

const Navbar = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();

    const logout = () => {
        dispatch({type: 'LOGOUT'});
        history.push('/auth');
        setUser(null);
    };

    useEffect(() => {
        const token = user?.token; 
        if (token) {
          const decodedToken = decode(token);
          if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }
        setUser(JSON.parse(localStorage.getItem('profile')));
      }, [location]);
    
    return (
        <div id="nav">
          <nav className="navbar navbar-expand-lg navbar-nav">
            <a className="navbar-brand ml-5" href="/">Back Home</a>
            <div>
              <ul className="navbar-nav mr-auto">
                <li>link 1 </li>
                <li>link 2 </li>
                <li>link 3 </li>
              </ul>
            </div>
            <div className="justify-content-end ml-auto mr-5">
              <ul className="navbar-nav ml-auth justify-content-end">
                <li>{getUsername(user)}</li>
                <li>{user?.result? <button onClick={logout}>Logout</button>: <a href="/auth">Login</a>}</li>
              </ul>
            </div>
          </nav>
        </div>
    );
};

export default Navbar;