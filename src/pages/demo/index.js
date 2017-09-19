import React, { Component }  from 'react';
import { Autocomplete } from '@coredev/cnn-react-material/build/autocomplete';
import { Button } from '@coredev/cnn-react-material/build/button';
import classnames from 'classnames';
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
    }

    updatedTerm(term) {

        return function nextState() {

            return {
                searchTerm: term
            };
        };
    }

    updateSearchTerm(term) {

        this.setState(this.updatedTerm(term));
    }

    clear() {

        this.setState(this.updatedTerm(''));
    }

    render() {

        return (
            <div className={styles.demo}>
                <p>
                    A demo for search type ahead!
                </p>
                <div className={styles.row}>
                    <FetchData
                        basePath="https://yaonkfgej1.execute-api.us-east-1.amazonaws.com"
                        uri={`/development/suggest?q=${this.state.searchTerm}`}
                        searchTerm={this.state.searchTerm}
                    >
                        {(error, data) => (
                            <Autocomplete
                                keepFocusOnChange
                                showSelectedWhenNotInSource
                                showSuggestionsWhenValueIsSet
                                suggestionMatch="disabled"
                                className={styles.col}
                                hint="Search"
                                multiple={false}
                                value={this.state.searchTerm}
                                onQueryChange={this.updateSearchTerm}
                                source={(error && false) || (data && data.suggestions) || false}
                            />
                        )}
                    </FetchData>
                    <div className={classnames(styles.col, styles['search-buttons'])}>
                        <Button onClick={this.clear}>Clear</Button>
                        <Button icon="search" mini floating primary></Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Demo;
