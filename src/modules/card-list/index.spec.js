import React from 'react';
import { shallow } from 'enzyme';
import { Button } from '@coredev/cnn-react-material/build/button';

import CardList from './index';


describe('<CardList />', function () {

    it('should display a list using the normal strategy', function () {

        const wrapper = shallow(
            <CardList strategy="normal">
                <div>A</div>
                <div>B</div>
                <div>C</div>
            </CardList>
        );

        expect(wrapper.text()).toEqual('ABC');
    });

    it('should display a list using the reorder strategy', function () {

        const wrapper = shallow(
            <CardList strategy="reorder" featuredCardIndex={1}>
                <div>A</div>
                <div>B</div>
                <div>C</div>
            </CardList>
        );

        expect(wrapper.text()).toEqual('BAC');
    });

    it('should display a list using the duplicate strategy', function () {

        const wrapper = shallow(
            <CardList strategy="duplicate" featuredCardIndex={1}>
                <div>A</div>
                <div>B</div>
                <div>C</div>
            </CardList>
        );

        expect(wrapper.text()).toEqual('BABC');
    });

    it('should display a list using the truncated strategy', function () {

        const wrapper = shallow(
            <CardList strategy="truncated" featuredCardIndex={1}>
                <div className="item">A</div>
                <div className="item">B</div>
                <div className="item">C</div>
            </CardList>
        );

        expect(wrapper.find('.item').length).toEqual(2);
        expect(wrapper.find(Button).length).toEqual(1);

        wrapper.find(Button).first().simulate('click');
        expect(wrapper.state('isAllShown')).toEqual(true);
        expect(wrapper.find('.item').length).toEqual(3);
        expect(wrapper.text()).toEqual('ABC');
    });

    it('should reset state when strategy or featuredCardIndex changes', function () {

        const wrapper = shallow(
            <CardList strategy="truncated" featuredCardIndex={1}>
                <div className="item">A</div>
                <div className="item">B</div>
                <div className="item">C</div>
            </CardList>
        );

        expect(wrapper.state('isAllShown')).toEqual(false);

        wrapper.find(Button).first().simulate('click');
        expect(wrapper.state('isAllShown')).toEqual(true);

        wrapper.setProps({
            strategy: 'normal'
        });
        expect(wrapper.state('isAllShown')).toEqual(false);
    });
});
