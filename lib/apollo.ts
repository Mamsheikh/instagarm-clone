import { ApolloClient, InMemoryCache } from '@apollo/client';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        posts: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        // projects: {
        //   merge(existing, incoming) {
        //     return incoming;
        //   },
        // },
      },
    },
  },
});

const apolloClient = new ApolloClient({
  uri: `${process.env.URL}/graphql/api`,
  cache: cache,
});

export default apolloClient;
