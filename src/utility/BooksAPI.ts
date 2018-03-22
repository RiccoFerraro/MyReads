import debounce from "debounce-promise";

const api = "https://reactnd-books-api.udacity.com";


// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
    token = localStorage.token = Math.random().toString(36).substr(-8);

const headers = {
    'Accept': 'application/json',
    'Authorization': token
};

const debounceTime = 200;

export const get = (bookId) =>
    fetch(`${api}/books/${bookId}`, {headers})
        .then(res => res.json())
        .then(data => data.book)

export const getAll = () => {
    let debouncedPromise = debounce(() => {
            return fetch(`${api}/books`, {headers})
                .then(res => res.json())
                .then(data => data.books)
        }
        , debounceTime);

    return debouncedPromise();
};

export const update = (bookId : string, shelf) => {
    let debouncedPromise = debounce(() => {
            return fetch(`${api}/books/${bookId}`, {
                method: 'PUT',
                headers: {
                    ...headers,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({shelf})
            })
                .then(res => res.json())
        }
        , debounceTime);

    return debouncedPromise();
};

export const search = (query) => {
    let debouncedPromise = debounce(() => {
            return fetch(`${api}/search`, {
                method: 'POST',
                headers: {
                    ...headers,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({query})
            })
                .then(res => res.json())
                .then(data => data.books)
        }
        , debounceTime);

    return debouncedPromise();
};

