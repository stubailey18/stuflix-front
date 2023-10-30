export const fetchPrograms = async (token, searchTerm) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/programs?title=${searchTerm}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    if (response.status === 200) {
        return await response.json();
    } else {
        throw `Oops! I\'m having trouble fetching ${searchTerm} programs at this time. Please try another search.`;
    }
}

export const fetchProgramDetail = async (token, imdbID) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/programs?imdbId=${imdbID}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    if (response.status === 200) {
        return await response.json();
    } else {
        throw `Oops! I\'m having trouble fetching the detail for program ${imdbID} at this time. Please try another program.`;
    }
}