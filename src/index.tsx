import * as React from 'react';
import { render } from 'react-dom';

import { Provider, dedupExchange, fetchExchange, cacheExchange, createClient } from 'urql';

import App from './App';

import 'normalize.css';
import './index.css';

const client = createClient({
    url: process.env.API_URL,
    fetchOptions: () => {
        const token = process.env.TOKEN;
        return {
            headers: { authorization: token ? `Bearer ${token}` : '' },
        };
    },
    exchanges: [dedupExchange, cacheExchange, fetchExchange],
})

console.log(client)

render(
    <Provider value={ client }>
        <App />
    </Provider>,
    document.getElementById('root')
);
