import * as React from 'react';
import { render,fireEvent, act } from '@testing-library/react';
import Editor from '../components/Editor';
import { ThemeProvider } from '../ThemeProvider';


let eventFactory = (value: string) => {
    return {
        target: { value }
    };
}
describe('Editor', () => {

    it('renders', () => {
        let onSave = jest.fn();
        const { container } = render(<ThemeProvider>
            <Editor onSave={onSave} />
        </ThemeProvider>);
        expect(container).toMatchSnapshot();
    });
    it('calls onSave', () => {
        let saveData;
        let onSave = (args) => {
            saveData = args;
            return new Promise((resolve) => {
                setTimeout(resolve,100)
            })
        }
        const { getByLabelText, getByTitle,container } = render(<ThemeProvider>
                <Editor onSave={onSave} initialContent={'content'} />
            </ThemeProvider>)
    
        act(() => {
            fireEvent.change(
                getByLabelText('File Name'), eventFactory('hi/roy.md')
            );
        });

        act(() => {
            fireEvent.click(
                getByTitle('Save')
            );
        });
            
        expect(saveData).toMatchObject({content:'content', filePath: 'hi/roy.md'});
            
    });
});