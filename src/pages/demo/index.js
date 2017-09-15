import React, { Component }  from 'react';
import { Autocomplete } from '@coredev/cnn-react-material/build/autocomplete';
import { Button } from '@coredev/cnn-react-material/build/button';

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
                <Autocomplete hint="Search" multiple={false} value={this.state.searchTerm} onQueryChange={this.updateSearchTerm} />
                <Button onClick={this.clear}>Clear</Button>
                <Button>Search</Button>
            </div>
        );
    }
}

export default Demo;
