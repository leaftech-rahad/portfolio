import { mapSchema, getDirective, MapperKind } from "@graphql-tools/utils";
import { defaultFieldResolver } from "graphql";
import { ensureSignedIn } from "../Auth/Auth.js";

function AuthDirective(directiveName) {
  return {
    authDirectiveTransformer: (schema) =>
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
              ensureSignedIn(context.req);
              return resolve.apply(this, args);
            };
          }
        },
      }),
  };
}

export default AuthDirective;
