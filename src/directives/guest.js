import { mapSchema, getDirective, MapperKind } from "@graphql-tools/utils";
import { defaultFieldResolver } from "graphql";

import { ensureSignedOut } from "../Auth/Auth.js";

function GuestDirective(directiveName) {
  return {
    guestDirectiveTransformer: (schema) =>
      mapSchema(schema, {
        [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
          const authDirective = getDirective(
            schema,
            fieldConfig,
            directiveName
          )?.[0];

          if (authDirective) {
            const { resolve = defaultFieldResolver } = fieldConfig;
            fieldConfig.resolve = function (...args) {
              const [, , context] = args;
              ensureSignedOut(context.req);
              return resolve.apply(this, args);
            };
          }
        },
      }),
  };
}

export default GuestDirective;
