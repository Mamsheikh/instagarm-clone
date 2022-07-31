import {
  extendType,
  intArg,
  list,
  nullable,
  queryField,
  stringArg,
} from 'nexus';
import { Post } from '../../models';
import { connectionFromArraySlice, cursorToOffset } from 'graphql-relay';

// export const getPosts = queryField('getPosts', {
//   type: list(Post),
//   resolve: async (_, __, ctx) => {
//     const req = ctx.req;
//     // const session = await getSession({ req });
//     // const following = await ctx.prisma.user
//     //   .findFirst({
//     //     where: { id: 'e10660ba-382b-4660-915a-ad71febe6c01' },
//     //   })
//     //   .following();
//     // const user = await ctx.prisma.user.findFirst({
//     //   where: { id: 'e10660ba-382b-4660-915a-ad71febe6c01' },
//     // });
//     return ctx.prisma.post.findMany({
//       include: {
//         comments: {
//           take: 2,
//           // take: 2,
//         },
//       },
//     });
//     return ctx.prisma.post.findMany({
//       include: { comments: { where: { selected: true } } },
//     });
//   },
// });

export const getPaginatedPosts = extendType({
  type: 'Query',
  definition(t) {
    t.connectionField('posts', {
      type: Post,
      resolve: async (_, { after, first }, ctx) => {
        const offset = after ? cursorToOffset(after) + 1 : 0;
        if (isNaN(offset)) throw new Error('cursor is invalid');

        const [totalCount, items] = await Promise.all([
          ctx.prisma.post.count(),
          ctx.prisma.post.findMany({
            take: first,
            skip: offset,
          }),
        ]);

        return connectionFromArraySlice(
          items,
          { first, after },
          { sliceStart: offset, arrayLength: totalCount }
        );
      },
    });
  },
});

export const getExplorePosts = extendType({
  type: 'Query',
  definition(t) {
    t.field('explorePosts', {
      type: list(Post),
      async resolve(_, _args, ctx) {
        return ctx.prisma.post.findMany({
          take: 10,
        });
      },
    });
  },
});
