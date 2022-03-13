import { getSession } from 'next-auth/react';
import { list, queryField } from 'nexus';
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
    });
  },
});
