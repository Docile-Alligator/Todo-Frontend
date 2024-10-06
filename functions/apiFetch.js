import 'isomorphic-unfetch'
import config from '../config.js';

const { API_URL } = config;

// Function to send requests to our backend API
export default async (path, {body={}, headers={}, method="GET"}={}) => {
    let options = {
        method,
        headers,
        credentials: 'include'
    }

    if (method !== "GET") {
        options = {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            body: JSON.stringify(body)
        }
    }

    const res = await fetch(`${API_URL}${path}`, options);
    if (res.status !== 204) {
        const json = await res.json();

        return {
            status: res.status,
            headers: res.headers,
            body: json
        }
    }
    else {
        return {
            status: res.status,
            headers: res.headers
        }
    }
}