import { useState } from 'react';
import { Route, Switch } from 'react-router';
import { fetchProgramDetail, fetchPrograms } from '../services/ProgramService';
import { ProgramDetail } from './ProgramDetail';
import ProgramSearch from './ProgramSearch';
import ProgramTable from './ProgramTable';

// this is a smart component; it knows about the source of the data
// it doesn't render anything itself but instead delegates the rendering to a dumb component
export default function Programs() {

    const [programs, setPrograms] = useState([]);

    const handleSearch = searchTerm => {
        fetchPrograms(searchTerm)
            .then(programs => setPrograms(programs))
            .catch(error => console.log(error));
    }

    return (
        <Switch>
            {/* if selectedProgram is falsey (null) then render ProgramTable */}
            <Route path="/programs" exact>
                <>
                    <ProgramSearch onSearch={handleSearch} />
                    <ProgramTable programs={programs} />
                </>
            </Route>
            {/* if selectedProgram is truthy (not null) then render ProgramDetail */}
            <Route path="/programs/:imdbID">
                <ProgramDetail />
            </Route>
        </Switch>
    );
}