import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const defaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
};
// const defaultOptions = {};
const cache = new InMemoryCache({
  resultCaching: false,
});
// const cache = new InMemoryCache();

/**
 * The credentials: 'include' allows cookies to be automatically sent
 * along with the request 'include' because backend is on another domain.
 *
 * @see https://www.apollographql.com/docs/react/networking/authentication/#cookie
 */
const link = createHttpLink({
  uri: `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/graphql`,
});

const client = new ApolloClient({
  connectToDevTools: true,
  link,
  cache,
  defaultOptions,
});
// const client = new ApolloClient({
//   uri: `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/graphql`,
//   cache: new InMemoryCache(),
// });

export default client;

// const client = new ApolloClient({
//   ssrMode: true, // Enable SSR mode
//   link: createHttpLink({
//     uri: `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/graphql`,
//   }),
//   cache: new InMemoryCache(),
// });
// export default client;