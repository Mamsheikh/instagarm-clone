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
// export const getUser = queryField('getUser', {
//   type: 'User',
//   args: {
//     id: nonNull(stringArg()),
//   },
//   resolve: async (_, args, ctx) => {
//     try {
//       const user = await ctx.prisma.user.findUnique({
//         where: { id: args.id },
//         rejectOnNotFound: true,
//         include: { posts: true },
//       });
//       return user;
//     } catch (error) {
//       throw new Error(`No user found: ${error}`);
//     }
//   },
// });
