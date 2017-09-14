import React, { Component, Children, cloneElement }  from 'react';
import PropTypes from 'prop-types';
import { Button } from '@coredev/cnn-react-material/build/button';
import classnames from 'classnames';

import styles from './styles.css';

class CardList extends Component {

    static propTypes = {
        strategy: PropTypes.oneOf(['normal', 'reorder', 'duplicate', 'truncated']),
        featuredCardIndex: PropTypes.number,
        className: PropTypes.string,
        callToAction: PropTypes.string
    };
    static defaultProps = {
        strategy: 'normal',
        featuredCardIndex: 0,
        callToAction: 'See All'
    };

    constructor(props) {

        super(props);

        this.state = {};
        this.untruncate = this.untruncate.bind(this);
    }

    untruncate() {

        this.setState({
            isAllShown: true
        });
    }

    reorder(children, index) {

        const childrenArray = Children.toArray(children);

        return [
            childrenArray[index],
            ...(childrenArray.filter((item, i) => {
                return i !== index;
            }))
        ];
    }

    duplicate(children, index) {

        const childrenArray = Children.toArray(children);

        return [
            cloneElement(childrenArray[index]),
            ...childrenArray
        ];
    }

    truncated(children, index) {

        const childrenArray = Children.toArray(children);

        return childrenArray.splice(index);
    }

    get isTruncated() {

        return this.state.isAllShown !== true &&
               this.props.strategy === 'truncated' &&
               this.props.featuredCardIndex > 0;
    }

    get children() {

        const {
            strategy,
            children,
            featuredCardIndex
        } = this.props;

        return (strategy === 'reorder' && this.reorder(children, featuredCardIndex)) ||
               (strategy === 'duplicate' && this.duplicate(children, featuredCardIndex)) ||
               (this.isTruncated && this.truncated(children, featuredCardIndex)) ||
               Children.toArray(children);
    }

    render() {

        const [ featured, ...theList ] = this.children;

        return (
            <div className={classnames(this.props.className, styles['card-list'])}>
                {this.isTruncated ? (
                    <Button onClick={this.untruncate} accent raised>{this.props.callToAction}</Button>
                ) : null}

                {featured}
                {theList}
            </div>
        );
    }
}

export default CardList;
