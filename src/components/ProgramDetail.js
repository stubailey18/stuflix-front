import { useContext, useEffect, useState } from "react";
import { useRouteMatch } from "react-router";
import { fetchProgramDetail } from "../services/ProgramService";
import { AppStateContext } from "../App";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

export const ProgramDetail = () => {

    const [program, setProgram] = useState(null);
    const [error, setError] = useState('');
    const {state} = useContext(AppStateContext);
    const {params} = useRouteMatch();
    const history = useHistory();
    
    useEffect(() => {
        fetchProgramDetail(state.accessToken, params.imdbID)
            .then(program => setProgram(program))
            .catch(setError);
    }, [params]);

    if (program) {
        const {imdbRating, Actors, Plot, Poster, Rated, Ratings, Runtime, Title, Year} = program;
        return (
            <div className="row">
                <div className="col-sm-4">
                    <img src={Poster} style={{width: '100%'}} className="mb-4" />
                </div>
                <div className="col-sm-8">
                    <h3>{Title}</h3>
                    <small>
                        <span style={{color: 'lightgreen'}} className="me-3">{imdbRating} on IMDB</span>
                        <span className="me-3">{Year}</span>
                        <span style={{color: 'red'}} className="me-3">{Rated}</span>
                        <span className="me-3">{Runtime}</span>
                    </small>
                    <p className="mt-4">{Plot}</p>
                    <p className="mt-4">Starring {Actors.join(", ")}</p>
                    {Ratings.map(({Source, Value}) => <p key={Source} className="mt-4">{Value} on {Source}</p>)}
                    <button onClick={() => history.goBack()} className="btn btn-danger">Back to search results</button>
                </div>
            </div>
        );
    } else if (error) {
        return ( 
            <p className="text-center text-danger">
                {error}&nbsp;
                <span onClick={() => {
                    setError('');
                    history.goBack();
                }} style={{cursor: 'pointer'}}>[X]</span>
            </p>
        );
    } else {
        return null;
    }
}