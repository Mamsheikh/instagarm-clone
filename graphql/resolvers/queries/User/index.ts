import { list, nullable, queryField, stringArg } from 'nexus';
import { User } from '../../models';

export const searchUser = queryField('searchUser', {
  type: nullable(list(User)),
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
