import { Kernel } from "@bluelibs/core";
import { XUIBundle, XUIGuardianBundle } from "@bluelibs/x-ui";
import { UIAppBundle } from "../bundles/UIAppBundle/UIAppBundle";

// All UI bundles need to be prefixed with UI
// All X-Framework bundles have the first prefix X
export const kernel = new Kernel({
  bundles: [
    new XUIBundle({
      graphql: {
        // ApolloClient Options
        // https://www.apollographql.com/docs/react/api/core/ApolloClient/#ApolloClientOptions
        uri: process.env.API_URL,
      },
    }),
    new UIAppBundle(),
    new XUIGuardianBundle(),
  ],
});
