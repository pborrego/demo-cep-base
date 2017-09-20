import sinon from 'sinon';
import axios from 'axios';

import {
    updateTerm,
    updateSuggestions,
    clearAll,
    fetchSuggestions
} from './util';



describe('Search Bar Utils', function testUtils() {

    let sandbox;

    beforeEach(function beforeEachTest() {

        sandbox = sinon.sandbox.create();
    });

    afterEach(function afterEachTest() {

        sandbox.restore();
    });

    it('should be able to create a search term state', function testSearchTermState() {

        let expected = {searchTerm: ''};
        let actual = updateTerm();

        expect(actual).toEqual(expected);

        let searchTerm = 'hello'
        expected = {searchTerm};
        actual = updateTerm(searchTerm);

        expect(actual).toEqual(expected);
    });

    it('should be able to create a suggestions state', function testSuggestionsState() {

        let expected = {suggestions: []};
        let actual = updateSuggestions();

        expect(actual).toEqual(expected);

        let suggestions = ['test', '1', '2', '3'];
        expected = {suggestions};
        actual = updateSuggestions(suggestions);

        expect(actual).toEqual(expected);
    });

    it('should be able to create a clear state', function testClearState() {

        let expected = {searchTerm: '', suggestions: []};
        let actual = clearAll();

        expect(actual).toEqual(expected);
    });

    it('should be able to fetch suggestions from api', function testFetchSuggestions(done) {

        let expected = ['a', 'b', 'c'];

        sandbox.stub(axios, 'get').returns(Promise.resolve({data: {suggestions: expected}}));
        fetchSuggestions('test', 'http://test.com').then(function recievedFromApi(actual) {

            try {

                expect(actual).toEqual(expected);
                done();
            } catch (error) {

                done.fail(error);
            }
        }).catch(function failed(error) {

            done.fail(error.stack);
        });
    });
});
