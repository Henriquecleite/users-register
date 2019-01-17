import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import RegisterFields from './RegisterFields';

configure({adapter: new Adapter()});

describe('<RegisterFields />', () => {
    it('should render an `.InvalidMessage` when invalid', () => {
        const wrapper = shallow(<RegisterFields 
            name={"First Name"}
            type={"text"}
            value={""}
            validity={false} />);
        expect(wrapper.text().includes("blank")).toEqual(true);
    });

    it('should not render an `.InvalidMessage` when valid', () => {
        const wrapper = shallow(<RegisterFields 
            name={"First Name"}
            type={"text"}
            value={""}
            validity={true} />);
        expect(wrapper.text().includes("blank")).toEqual(false);
    });
})