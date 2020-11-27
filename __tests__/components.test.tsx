import * as React from 'react';
import Main from '../components/Main';
import { render } from '@testing-library/react';
test('Main renders', () => {
    const { container, getByText } = render(<Main><span>Hi Roy</span></Main>);
    expect(getByText('Hi Roy')).toBeTruthy();
    expect(container).toMatchSnapshot();
})
