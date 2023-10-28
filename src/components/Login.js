import { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { AppStateContext } from '../App';
import { login } from '../services/UserService';

export default function Login() {

    const {dispatch} = useContext(AppStateContext);
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        login({email, password}).then(data => {
            console.log(data);
            // the obj ref'd by data has both user and accessToken props
            const action = {
                type: 'USER_LOGGED_IN',
                payload: data
            }
            dispatch(action);
            // replace the current path with /programs; redirect to the Programs component
            history.replace('/programs');
        }).catch(console.log);
    }

    return (
        <div className="row justify-content-center">
            <form className="col-sm-8 col-md-6 col-lg-4">
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
                <button 
                    type="button" 
                    className="btn btn-danger"
                    onClick={handleLogin}>
                    Login
                </button>
            </form>
        </div>
    );
}