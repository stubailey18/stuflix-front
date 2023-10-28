// this module contains functions for communicating with the API
// in this case we're communicating directly with OMDB API but in prod. we'd probably talk to our own API
// generally components should NOT fetch data themselves; rather they should delegate to a service

const apiUrl = 'https://www.omdbapi.com/?apikey=fa9f0d49&';

// an async function will wrap the return value in a Promise
// it will do that regardless of whether the function is actually asynchronous
export const fetchPrograms = async searchTerm => {

    // fetch returns a Promise which wraps a response object
    // each Promise has a then method which is passed a callback
    // the callback is invoked once the Promise is resolved/when the response comes back
    // response.json() parses the response body (a string) into a JS object
    // response.json() also returns a Promise

    // await can only be used inside an async function
    // it is syntactic sugar that frees you from having to deal with the Promise directly
    const response = await fetch(`${apiUrl}s=${searchTerm}`);
    const parsedResponseBody = await response.json();
    const programs = parsedResponseBody.Search;
    return programs;
}

export const fetchProgramDetail = async imdbID => {
    const response = await fetch(`${apiUrl}i=${imdbID}`);
    const parsedResponseBody = await response.json();
    const programDetail = parsedResponseBody;
    return programDetail;
}