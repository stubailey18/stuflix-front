export const login = credentials => {
    console.log(credentials);
    return fetch('http://localhost:4000/login', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
    .then(response => response.json());
}