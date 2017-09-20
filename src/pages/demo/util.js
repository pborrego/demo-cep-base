import axios from 'axios';



function fetchApi(uri) {

    return axios.get(uri).then(({ data }) => (data));
}

export function updateTerm(searchTerm = '') {

    return {
        searchTerm
    };
}

export function updateSuggestions(suggestions = []) {

    return {
        suggestions
    };
}

export function clearAll() {

    return {
        ...(updateTerm()),
        ...(updateSuggestions())
    };
}

export function fetchSuggestions(searchTerm, uri) {

    return searchTerm === '' ? Promise.resolve([]) : fetchApi(uri).then(({ suggestions }) => (suggestions));
}
