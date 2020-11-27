import * as React from 'react';
import PostList from '../components/Layout/PostList';
import {ItemSingle} from '../components/Layout/ItemList';

import { render } from '@testing-library/react';
describe('PostList', () => {

    test('matches snapshot', () => {
        const { container } = render(<PostList
            title={'The Title'}
            posts={[
                {
                    id: 1,
                    content: 'One',
                    title: 'One Time',
                    to: '/one'
                },
                {
                    id: 2,
                    content: 'Two',
                    title: 'One Two Time',
                    to: '/two'
                },
            ]}
        />);
        expect(
            container
        ).toMatchSnapshot();
   })

})
describe('ItemSingle', () => {
    test('matches snapshot', () => {
        const { container } = render(
            <ItemSingle
                hLevel={2}
                item={{
                    id: 2,
                    content: 'Two',
                    title: 'One Two Time',
                    to: '/two'
                }}
            />
        );
        expect(container).toMatchSnapshot();
    });
})