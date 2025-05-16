import {ApolloProvider} from "@apollo/client";

import client from '@/shared/api/apollo-client';

export default function App() {
  return (
      <ApolloProvider client={client}>
        <div>hello</div>
      </ApolloProvider>
  );
}