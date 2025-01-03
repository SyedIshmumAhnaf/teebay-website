import React from 'react';
import App from './App';
import {createRoot} from 'react-dom/client';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // Replace with your backend GraphQL endpoint
  cache: new InMemoryCache(),
});

// Get the root element from index.html
const root = createRoot(document.getElementById('root'));

// Render the React app

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);

//root.render(<h1>Hello, World!</h1>);