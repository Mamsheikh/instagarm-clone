// /graphql/schema.ts
import { connectionPlugin, makeSchema } from 'nexus';
import { join } from 'path';
import * as types from './resolvers';

export const schema = makeSchema({
  types,
  plugins: [connectionPlugin()],
  contextType: {
    module: join(process.cwd(), './types/Context.ts'),
    export: 'Context',
  },
  outputs: {
    schema: join(process.cwd(), './graphql/generated/schema.graphql'),
    typegen: join(process.cwd(), './graphql/generated/nexus-typegen.d.ts'),
  },
});
