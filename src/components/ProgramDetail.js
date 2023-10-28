import { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router";
import { fetchProgramDetail } from "../services/ProgramService";

// ProgramDetail is now smart (it knows how to obtain the data)
// This is so that the user can bookmark a given program and the component is not reliant on its parent
export const ProgramDetail = () => {

    const [program, setProgram] = useState(null);
    const {params} = useRouteMatch();
    
    // whenever the URL params change we want to fetch again the program detail from the API
    useEffect(() => {
        fetchProgramDetail(params.imdbID)
            .then(program => setProgram(program))
            .catch(error => console.log(error));
    }, [params]);

    if (program) {
        const {Actors, Plot, Poster, Rated, Runtime, Title, Year, imdbRating} = program;
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
                    <p className="mt-4">Starring {Actors}</p>
                </div>
            </div>
        );
    } else {
        return <p>Loading...</p>;
    }
}