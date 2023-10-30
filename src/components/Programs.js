import { useContext, useState } from 'react';
import { Route, Switch } from 'react-router';
import { fetchPrograms } from '../services/ProgramService';
import { ProgramDetail } from './ProgramDetail';
import ProgramSearch from './ProgramSearch';
import ProgramTable from './ProgramTable';
import { AppStateContext } from '../App';

export default function Programs() {

    const [programs, setPrograms] = useState([]);
    const {state} = useContext(AppStateContext);
    const [error, setError] = useState('');

    const handleSearch = searchTerm => {
        fetchPrograms(state.accessToken, searchTerm)
            .then(programs => setPrograms(programs))
            .catch(setError);
    }

    return (
        <>
            <Switch>
                <Route path="/programs" exact>
                    <>
                        <ProgramSearch onSearch={handleSearch} />
                        <ProgramTable programs={programs} />
                    </>
                </Route>
                <Route path="/programs/:imdbID">
                    <ProgramDetail />
                </Route>
            </Switch>
            {error && 
                <p className="text-center text-danger">
                    {error}&nbsp;
                    <span onClick={() => setError('')} style={{cursor: 'pointer'}}>[X]</span>
                </p>
            }
        </>
    );
}