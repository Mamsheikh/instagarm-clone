import { isAuth } from './../../../../utils/auth';
import {
  extendType,
  list,
  nonNull,
  nullable,
  queryField,
  stringArg,
} from 'nexus';

import { User } from '../../models';

export const searchUser = queryField('searchUser', {
  type: nonNull(list(User)),
  args: { input: stringArg() },
  resolve: async (_, args, ctx) => {
    const result = await ctx.prisma.user.findMany({
      where: {
        OR: [
          { name: { contains: args.input, mode: 'insensitive' } },
          { email: { contains: args.input, mode: 'insensitive' } },
          { username: { contains: args.input, mode: 'insensitive' } },
          //   { name: { startsWith: args.input, mode: 'insensitive' } },
        ],
      },
    });
    return result;
  },
});

export const getUser = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.field('getUser', {
      type: 'User',
      args: { id: nonNull(stringArg()) },
      resolve(_parent, args, ctx) {
        return ctx.prisma.user.findUnique({
          where: { id: args.id },
          include: { posts: true },
        });
      },
    });
  },
});
export const Me = queryField('me', {
  type: 'User',
  // args: {
  //   email: nonNull(stringArg()),
  // },
  resolve: async (_, args, ctx) => {
    const req = ctx.req;
    const decodedJWT = await isAuth(req);
    console.log(decodedJWT);

    return await ctx.prisma.user.findUnique({
      where: { id: decodedJWT.userId },
    });
  },
});

export const getFollowSuggestions = extendType({
  type: 'Query',
  definition(t) {
    t.field('getFollowSuggestions', {
      type: list(User),
      async resolve(_parent, _args, ctx) {
        const decodedJWT = await isAuth(ctx.req);
        const user = await ctx.prisma.user.findFirst({
          where: { id: decodedJWT.useId },
          include: { followers: true, following: true },
        });
        const following = user.following;
        return await ctx.prisma.user.findMany({
          where: {
            AND: [
              {
                id: {
                  notIn: following.map((f) => f.id),
                },
              },
              { id: { notIn: user.followers.map((f) => f.id) } },
              { id: { notIn: [user.id] } },
            ],
          },
          take: 10,
        });
      },
    });
  },
});
