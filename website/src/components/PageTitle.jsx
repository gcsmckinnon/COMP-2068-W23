import React from "react";
import { Helmet, HelmetProvider } from 'react-helmet-async';

/**
 * PageTitle component
 * This component uses `react-helmet-async` to manage changes to the document head,
 * specifically setting the page title dynamically. It wraps the Helmet component
 * with HelmetProvider for async safety, especially useful for apps with concurrent
 * rendering or server-side rendering.
 */
const PageTitle = ({ title }) => {
    return (
        <HelmetProvider>
            <Helmet>
                <title>{ title } | Cards Against Humanity</title>
            </Helmet>
        </HelmetProvider>
    );
};

export default PageTitle;
