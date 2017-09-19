import { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

/**
 * A component used for fetching data.
 *
 * Provided a callback function, as children, allows the composer to determine
 * how to present the returned data visually.
 *
 * @example
 * ```
 * <FetchData
 *      basePath="http://foo.com"
 *      uri="/v1/thing"
 *      interval={1000 * 30}
 *      transform={data => {data.results = data.results.slice(-2); return data;}}
 * >
 *      {(error, data) => (data && (
 *          <pre>{JSON.stringify(data, null, 2)}</pre>
 *      )) || null}
 * </FetchData>
 * ```
 *
 * @param {String} uri
 *  A URI endpoint to fetch.
 *
 * @param {Function} children
 *  Callback function that determines how to render the data.
 *
 * @param {Number} [interval]
 *  Defines an interval in which data should be fetched.
 *
 * @param {Function} [transform]
 *  Transforms data before being returned.
 */
class FetchData extends Component {

    static propTypes = {
        children: PropTypes.func.isRequired,
        basePath: PropTypes.string,
        uri: PropTypes.string.isRequired,
        interval: PropTypes.number,
        transform: PropTypes.func,
        onDataRendered: PropTypes.func,
        useIfModifiedSince: PropTypes.bool
    };
    static defaultProps = {
        useIfModifiedSince: false
    };

    constructor(props) {

        super(props);
        this.state = {
            data: null,
            error: null,
            lastModified: null
        };
        this.fetch = this.fetch.bind(this);
        this.doImperativeWork = this.doImperativeWork.bind(this);
    }

    componentWillMount() {

        const {
            basePath,
            uri,
            interval
        } = this.props;

        this.doImperativeWork(basePath, uri, interval);
    }

    componentWillReceiveProps({ basePath, uri, interval }) {

        const {
            basePath: currentBasePath,
            uri: currentURI,
            interval: currentInterval
        } = this.props;
        const newBasePath = basePath !== currentBasePath;
        const newURI = uri !== currentURI;
        const newInterval = interval !== currentInterval;

        if (newBasePath || newURI || newInterval) {

            this.doImperativeWork(basePath, uri, interval);
        }
    }

    componentDidUpdate() {

        if (this.props.onDataRendered && this.state.data !== null && this.state.error === null) {

            this.props.onDataRendered();
        }
    }

    componentWillUnmount() {

        clearInterval(this.interval);
    }

    doImperativeWork(basePath, uri, interval) {

        // check to make sure we have the required data to fetch.
        if (!basePath || !uri) {

            return;
        }

        this.setState({ data: null, error: null, lastModified: null }, () => {

            if (interval) {
                clearInterval(this.interval);
                this.interval = setInterval(this.fetch, interval, basePath, uri);
            }

            this.fetch(basePath, uri);
        });
    }

    fetch(basePath, uri) {

        // Conditionally add if-modified-since header
        const ifModifiedSince = this.props.useIfModifiedSince && this.state.lastModified && {
            headers: {
                'If-Modified-Since': this.state.lastModified
            }
        };

        // Conditionally transform response
        const transform = this.props.transform && {
            transformResponse: axios.defaults.transformResponse.concat(
                (data) => (data && this.props.transform(data))
            )
        };

        const options = Object.assign({
            headers: {
                Accept: 'application/json'
            }
        }, transform, ifModifiedSince);

        // Fetch data
        axios.get(`${basePath}${uri}`, options)
             .then((response) => {

                 this.setState({
                     data: response.data,
                     lastModified: response.headers['last-modified']
                 });
             })
             .catch((error) => {

                 if (error.constructor === Error) {

                     throw error;
                 }

                 if (error.response) {

                     // The request was made, but the server responded with a status code
                     // that falls out of the range of 2xx
                     console.log(error.response.data);
                     console.log(error.response.status);
                     console.log(error.response.headers);
                 }

                 if (error.status >= 400) {

                     this.setState({ error: error.status });
                 }
             });
    }

    render() {

        const { children } = this.props;
        const {
            error,
            data
        } = this.state;

        return children(error, data);
    }
}


export default FetchData;
