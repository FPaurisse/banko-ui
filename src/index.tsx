import * as React   from 'react';
import { render }   from 'react-dom';
import { ReactKeycloakProvider } from '@react-keycloak/web'


import { Provider, dedupExchange, fetchExchange, cacheExchange, createClient } from 'urql';

import App from './App';

import keycloak from './keycloak';

import 'normalize.css';
import './index.css';
import Loading from '@library/Loading/Loading';

const client = createClient({
    url: process.env.API_URL,
    fetchOptions: () => {
        return {
            headers: { authorization: `Bearer ${keycloak.token}` },
        };
    },
    exchanges: [dedupExchange, cacheExchange, fetchExchange],
});

render(
    <ReactKeycloakProvider LoadingComponent={ <Loading/> } authClient={ keycloak } initOptions={ { onLoad: 'login-required' } }>
        <Provider value={ client }>
            <App />
        </Provider>
    </ReactKeycloakProvider>,
    document.getElementById('root')
);
