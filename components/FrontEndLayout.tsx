import * as React from 'react';
import Layout from './Layout/Layout';

const FrontEndLayout = ({ children, title }) => {
    React.useEffect(() => {
        if (document && document.getElementById('__next')) {
            document.getElementById('__next')
                .setAttribute("style", "width:100%");
        }
    }, []);

    return (
      
        <Layout title={title} displayTitle={title} headerLinks={
            [
                {
                    href: '/posts',
                    label: 'Posts',
                    hoverText: 'View Posts'
                },
                {
                    href: '/cms/files',
                    label: 'Edit Posts',
                    hoverText: 'List of posts to edit'
                },
                {
                    href:
                        '/cms/new',
                    label: 'New Post', hoverText: 'Create New Post'
                }
                
            ]
        }>
            { children }
        </Layout>
  )
}

export default FrontEndLayout;
