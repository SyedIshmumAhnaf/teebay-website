import React from 'react';
import App from './App';
import {createRoot} from 'react-dom/client';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';


const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql', // Replace with your backend URL
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token'); // Adjust token storage as per your setup
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});
// Initialize Apollo Client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
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