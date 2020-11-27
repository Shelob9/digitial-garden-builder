import * as React from 'react';
import ContentSection from '../components/Layout/ContentSection';
import { render } from '@testing-library/react';
import { debug } from 'console';
describe('ContentSection', () => {

    test('ContentSection uses h level 1', () => {
        const { container,getByText} = render(<ContentSection
            title={'The Title'}
            hLevel={1}
        ><span>Hi Roy</span></ContentSection>);
        expect( container.getElementsByTagName('h1').length ).toBe(1)
    });
    test('ContentSection defaults to h3', () => {
        const { container } = render(<ContentSection
            title={'The Title'}
        ><span>Hi Roy</span></ContentSection>);
        expect( container.getElementsByTagName('h3').length ).toBe(1)
    });

})
