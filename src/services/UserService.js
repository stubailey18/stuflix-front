import { Buffer } from 'buffer';

export const login = ({email, password}) => {
    var base64EncodedCredentials = Buffer.from(`${email}:${password}`).toString('base64');
    return fetch(`${process.env.REACT_APP_API_URL}/token`, {
        headers: {
            Authorization: `Basic ${base64EncodedCredentials}`
        }
    })
    .then(response => {
        if (response.status === 200) {
            return response.text();
        } else {
            throw 'Bad email and/or password';
        }
    });
}