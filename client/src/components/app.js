import { Router } from 'preact-router';
import { useState } from 'preact/hooks';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { existsCookie, getCookie } from '../utils/cookie';

import Home from 'async!../routes/home';
import Game from 'async!../routes/game';
import Preferences from '../routes/preferences';

import { PlayerQueries } from '../gql/player';

import { ApolloClient } from "apollo-client";
import { HttpLink } from 'apollo-link-http';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { ApolloProvider } from '@apollo/react-hooks';

import { WebSocketLink } from './graphql-ws-link';

const httpLink = new HttpLink({
    uri: `${(location.protocol == 'https:') ? "https" : "http"}://${window.location.host}/graphql`,
});

const wsLink = new WebSocketLink({
    url: `${(location.protocol == 'https:') ? "wss" : "ws"}://${window.location.host}/wsgraphql`,
    keepAlive: 1000
});

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    //httpLink,
    wsLink
);

const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache()
});

function AppRoot() {
    const { loading, error, data } = useQuery(PlayerQueries.getState, {
        variables: { playerId: getCookie("user-id") },
        skip: !existsCookie("user-id")
    });

    if (loading) return 'Loading Player...';
    if (error) {
        console.log(error);
        return "Error!";
    }

    const [userPreferences, setUserPreferences] = useState({
        showPreferences: !existsCookie("user-id") || (data.player == null)
    });

    const player = data ? data.player : null
    if (userPreferences.showPreferences) {
        return (
            <div>
                <Preferences user={player} setUserPreferences={setUserPreferences} />
            </div>
        )
    }

    if (player == null) return 'Loading Player....';

    return (
        <div>
            <a href="#" onClick={e => {
                e.preventDefault();
                setUserPreferences({ showPreferences: true });
            }
            }> Options </a>
            <Router onChange={e => { this.currentUrl = e.url; }}>
                <Home path="/" user={player} />
                <Game path="/game/:id" user={player} />
            </Router>
        </div>
    )
}

function App() {
    return (
        <ApolloProvider client={client} >
            <div id="app" >
                <AppRoot />
            </div>
        </ApolloProvider>
    );
}

export default App;