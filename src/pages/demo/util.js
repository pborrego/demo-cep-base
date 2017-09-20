import axios from 'axios';



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

export function doFetchSuggestions(term) {

    return this.fetchSuggestions(term)
               .then(({ suggestions }) => suggestions)
               .then(this.updatedSuggestions)
               .then(this.updateState);
}

export function fetchSuggestions(searchTerm, uri) {

    return searchTerm === '' ? Promise.resolve([]) : axios(uri).then(({ data }) => data);
}
