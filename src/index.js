import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

import { StateProvider } from './store';

import App from './App';

import * as serviceWorker from './serviceWorker';

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql'
});

ReactDOM.render(
    <StateProvider>
        <ApolloProvider client={client}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ApolloProvider>
    </StateProvider>
, document.getElementById('root'));

serviceWorker.unregister();
