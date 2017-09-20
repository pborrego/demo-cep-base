import React, { Component }  from 'react';
import { Autocomplete } from '@coredev/cnn-react-material/build/autocomplete';
import { Button } from '@coredev/cnn-react-material/build/button';
import axios from 'axios';
import debounce from 'lodash.debounce';
// import classnames from 'classnames';

import styles from './styles.css';



class Demo extends Component {

    static propTypes = {};
    static defaultProps = {};

    state = {
        searchTerm: '',
        suggestions: []
    };

    constructor(props) {

        super(props);

        this.updateSearchTerm = this.updateSearchTerm.bind(this);
        this.clear = this.clear.bind(this);
        this.updateState = this.updateState.bind(this);
        this.doFetchSuggestions = debounce(this.doFetchSuggestions, 500, {leading: true, trailing: true});
    }

    componentWillUnmount() {

        this.updateState = () => {};
        this.doFetchSuggestions.cancel();
    }

    updateState(newState) {

        this.setState(newState);
    }

    updatedTerm(searchTerm) {

        return function nextState() {

            return {
                searchTerm
            };
        };
    }

    updatedSuggestions(suggestions) {

        return function nextState() {

            return {
                suggestions
            };
        };
    }

    clearAll() {

        return function nextState() {

            return {
                searchTerm: '',
                suggestions: []
            };
        };
    }

    doFetchSuggestions(term) {

        return this.fetchSuggestions(term)
                   .then(this.updateSuggestions)
                   .then(this.updateState);
    }

    updateSearchTerm(term) {

        this.updateState(this.updatedTerm(term));
        this.doFetchSuggestions(term);
    }

    clear() {

        this.updateState(this.clearAll());
    }

    fetchSuggestions(searchTerm) {

        return searchTerm === '' ? Promise.resolve([]) : axios(`https://yaonkfgej1.execute-api.us-east-1.amazonaws.com/development/suggest?q=${searchTerm}`).then(({ data }) => data);
    }

    render() {

        const {
            searchTerm,
            suggestions
        } = this.state;

        return (
            <div className={styles.demo}>
                <p>
                    A demo for search type ahead!
                </p>
                <div className={styles['search-bar']}>
                    <Autocomplete
                        className={styles.bar}
                        allowCreate
                        showSuggestionsWhenValueIsSet
                        suggestionMatch="disabled"
                        hint="Search"
                        multiple={false}
                        value={searchTerm}
                        onQueryChange={this.updateSearchTerm}
                        source={suggestions}
                    />
                    <Button onClick={this.clear} raised>Clear</Button>
                    <Button primary raised>Search</Button>
                </div>
            </div>
        );
    }
}

export default Demo;
