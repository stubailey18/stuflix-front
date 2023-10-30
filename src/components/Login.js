import { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { AppStateContext } from '../App';
import { login } from '../services/UserService';

export default function Login() {

    const {dispatch} = useContext(AppStateContext);
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = event => {
        event.preventDefault();
        if (!email || !password) {
            setError('Your email and password are required');
            return;
        }
        login({email, password}).then(token => {
            const action = {
                type: 'USER_LOGGED_IN',
                payload: {user: email, accessToken: token}
            }
            dispatch(action);
            history.replace('/programs');
        }).catch(setError);
    }

    return (
        <>
            <div className="row justify-content-center">
                <form onSubmit={handleLogin} className="col-sm-8 col-md-6 col-lg-4">
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={email}
                            onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input 
                            type="password" 
                            className="form-control"
                            value={password}
                            onChange={e => setPassword(e.target.value)} />
                    </div>
                    <button className="mb-3 btn btn-danger">Login</button>
                </form>
                {error && 
                    <p className="text-center text-danger">
                        {error}&nbsp;
                        <span onClick={() => setError('')} style={{cursor: 'pointer'}}>[X]</span>
                    </p>
                }
            </div>
            <div className="row justify-content-center m-4">
                <div className="alert alert-warning col-sm-8 col-md-6 col-lg-4">
                    <p><strong>Warning!</strong></p>
                    <p>This app is for demonstration purposes only. Use the following credentials to login: user@mail.com & pa$$w0rd.</p>
                </div>
            </div>
        </>
    );
}