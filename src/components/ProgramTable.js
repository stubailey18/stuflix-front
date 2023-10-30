import { Link } from "react-router-dom";

export default function ProgramTable(props) {

    const {programs} = props;

    return (
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
    );
}