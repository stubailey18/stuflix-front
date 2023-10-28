// this is a dumb component; it doesn't know about the source of the data

import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppStateContext } from "../App";

// it simply renders the data it is given; it is like a pure function
export default function ProgramTable(props) {

    const {state} = useContext(AppStateContext);
    const {programs} = props;

    return (
        <>
            <p className="text-center">{state.user ? state.user.email : 'Guest user'}</p>
            <div className="d-flex flex-wrap justify-content-center">
                {programs.map(({Title, imdbID, Poster}) => (
                    <Link key={imdbID} to={`/programs/${imdbID}`}>
                        <img 
                            src={Poster} 
                            alt={Title} 
                            className="p-4"
                            style={{cursor: 'pointer'}} />
                    </Link>
                ))}
            </div>
        </>
    );
}