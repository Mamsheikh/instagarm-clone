import { getSession } from 'next-auth/react';
import { extendType, intArg, list, queryField, stringArg } from 'nexus';
import { Post } from '../../models';

export const getPosts = queryField('getPosts', {
  type: list(Post),
  resolve: async (_, __, ctx) => {
    const req = ctx.req;
    // const session = await getSession({ req });
    const following = await ctx.prisma.user
      .findFirst({
        where: { id: 'e10660ba-382b-4660-915a-ad71febe6c01' },
      })
      .following();
    const user = await ctx.prisma.user.findFirst({
      where: { id: 'e10660ba-382b-4660-915a-ad71febe6c01' },
    });
    return ctx.prisma.post.findMany({
      where: {
        user: {
          id: { in: [...following.map((user) => user.id), user.id] },
        },
      },
      orderBy: { createdAt: 'asc' },
    });
  },
});

export const getPaginatedPosts = extendType({
  type: 'Query',
  definition(t) {
    t.field('posts', {
      type: 'Response',
      args: {
        first: intArg(),
        after: stringArg(),
      },
      async resolve(_, args, ctx) {
        let queryResults = null;

        if (args.after) {
          // check if there is a cursor as the argument
          queryResults = await ctx.prisma.post.findMany({
            take: args.first, // the number of items to return from the database
            skip: 1, // skip the cursor
            cursor: {
              id: args.after, // the cursor
            },
          });
        } else {
          // if no cursor, this means that this is the first request
          //  and we will return the first items in the database
          queryResults = await ctx.prisma.post.findMany({
            take: args.first,
          });
        }
        // if the initial request returns links
        if (queryResults.length > 0) {
          // get last element in previous result set
          const lastPostInResults = queryResults[queryResults.length - 1];
          // cursor we'll return in subsequent requests
          const myCursor = lastPostInResults.id;

          // query after the cursor to check if we have nextPage
          const secondQueryResults = await ctx.prisma.post.findMany({
            take: args.first,
            cursor: {
              id: myCursor,
            },
            orderBy: {
              createdAt: 'asc',
            },
          });
          // return response
          const result = {
            pageInfo: {
              endCursor: myCursor,
              hasNextPage: secondQueryResults.length >= args.first, //if the number of items requested is greater than the response of the second query, we have another page
            },
            edges: queryResults.map((post) => ({
              cursor: post.id,
              node: post,
            })),
          };

          return result;
        }
        //
        return {
          pageInfo: {
            endCursor: null,
            hasNextPage: false,
          },
          edges: [],
        };
      },
    });
  },
});
