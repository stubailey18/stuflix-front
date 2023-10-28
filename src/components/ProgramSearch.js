import { useState } from 'react';

export default function ProgramSearch(props) {

    const {onSearch} = props;
    const [searchTerm, setSearchTerm] = useState('');

    const handleSubmit = event => {
        event.preventDefault();
        onSearch(searchTerm);
    }

    return (
        <form onSubmit={handleSubmit} className="row justify-content-center mb-4">
            <input 
                type="search"
                value={searchTerm}
                placeholder="Search"
                onChange={e => setSearchTerm(e.target.value)}
                className="col-8 col-sm-6 me-1" 
                style={{outline: 'none'}} />
            <button 
                type="button" 
                onClick={handleSubmit} 
                className="col-3 col-sm-2 btn btn-danger"
                style={{boxShadow: 'none'}}>
                Submit
            </button> 
        </form>
    );
}