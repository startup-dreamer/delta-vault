// apollo-client.js
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
    link: new HttpLink({
        uri: 'https://api.goldsky.com/api/public/project_cm3z3gioefix501v6daxi2u5a/subgraphs/delta-vault/1.0.0/gn',
    }),
    cache: new InMemoryCache(),
});

export default client;
