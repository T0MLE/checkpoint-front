import {
    ApolloClient,
    InMemoryCache,
    NormalizedCacheObject,
  } from "@apollo/client";
  
  let apolloClient: ApolloClient<NormalizedCacheObject>;
  
  const createApolloClient = () => {
    if (!apolloClient) {
      apolloClient = new ApolloClient({
        uri: "/graphql",
        cache: new InMemoryCache(),
      });
    }
    return apolloClient;
  };
  
  export default createApolloClient;