
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({
    // uri: 'http://localhost:5000/graphql',
    uri:'https://taskmanager-backend-pg63.onrender.com/'
  }),
  cache: new InMemoryCache(),
});

export default client;

