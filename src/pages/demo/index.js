import React, { Component }  from 'react';
import { Card, CardText, CardTitle } from '@coredev/cnn-react-material/build/card';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import CardList from '../../modules/card-list';
import styles from './styles.css';



class Demo extends Component {

    static propTypes = {
        match: PropTypes.shape({
            params: PropTypes.shape({
                title: PropTypes.string
            })
        })
    };
    static defaultProps = {};

    state = {
        cards: 'ABCDEFGHIJLKMNOPQRSTUVWXYZ'.split('').map((letter) => {

            return {
                title: letter,
                text: `This is card ${letter}.`
            };
        })
    };

    get featuredCard() {

        const index = this.state.cards.findIndex(({ title }) => {

            return this.props.match.params.title === title.toLowerCase()
        });

        return (index > -1) ? index : 0;
    }

    get strategy() {

        const { strategy } = this.props.match.params;
        const possibleStrategies = ['normal', 'reorder', 'duplicate', 'truncated'];

        return possibleStrategies.indexOf(strategy) > -1 ? strategy : 'normal';
    }

    render() {
        return (
            <div className={styles.demo}>
                <p>
                    This is a demo showing react toolbox. In this demo
                    you are able to deep link into four list of cards
                    using the URL. There are three strategies that can
                    be used for each card: <Link to="/demo/p/reorder">reorder</Link>, <Link to="/demo/p/duplicate">duplicate</Link> and <Link to="/demo/p/truncated">truncated</Link>.
                </p>
                <CardList featuredCardIndex={this.featuredCard} strategy={this.strategy}>
                    {this.state.cards.map(({ title, text }, i) => (
                        <Card key={`${title}${text}${i}`}>
                            <CardTitle>{title}</CardTitle>
                            <CardText>{text}</CardText>
                        </Card>
                    ))}
                </CardList>
            </div>
        );
    }
}

export default Demo;
