import React, { Component }  from 'react';
import { Autocomplete } from '@coredev/cnn-react-material/build/autocomplete';
import { Button } from '@coredev/cnn-react-material/build/button';
// import classnames from 'classnames';
import FetchData from '../../modules/fetch-data';

import styles from './styles.css';



class Demo extends Component {

    static propTypes = {};
    static defaultProps = {};

    state = {
        searchTerm: ''
    };

    constructor(props) {

        super(props);

        this.updateSearchTerm = this.updateSearchTerm.bind(this);
        this.clear = this.clear.bind(this);
        this.updateState = this.updateState.bind(this);
    }

    componentWillUnmount() {

        this.updateState = () => {};
    }

    updateState(newState) {

        this.setState(newState);
    }

    updatedTerm(term) {

        return function nextState() {

            return {
                searchTerm: term
            };
        };
    }

    updateSearchTerm(term) {

        this.updateState(this.updatedTerm(term));
    }

    clear() {

        this.updateState(this.updatedTerm(''));
    }

    render() {

        const {
            searchTerm
        } = this.state;

        return (
            <div className={styles.demo}>
                <p>
                    A demo for search type ahead!
                </p>
                <div className={styles['search-bar']}>
                    <FetchData
                        basePath="https://yaonkfgej1.execute-api.us-east-1.amazonaws.com"
                        uri={`/development/suggest?q=${searchTerm}`}
                    >
                        {(error, data) => (
                            <Autocomplete
                                className={styles.bar}
                                allowCreate
                                showSuggestionsWhenValueIsSet
                                suggestionMatch="disabled"
                                hint="Search"
                                multiple={false}
                                value={searchTerm}
                                onQueryChange={this.updateSearchTerm}
                                source={(error && false) || (data && data.suggestions) || false}
                            />
                        )}
                    </FetchData>
                    <Button onClick={this.clear} raised>Clear</Button>
                    <Button primary raised>Search</Button>
                </div>
            </div>
        );
    }
}

export default Demo;
