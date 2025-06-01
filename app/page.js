'use client';
import Pages from '../Pages/Index'
import { ApolloProvider } from '@apollo/client';
import client  from '../lib/client'


export default function Home() {
  return (
    <ApolloProvider client={client}>
        <Pages/>
    </ApolloProvider>

  
  );
}
