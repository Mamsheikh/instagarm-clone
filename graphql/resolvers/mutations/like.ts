import { mutationField, nonNull, stringArg } from 'nexus';
import { isAuth } from '../../../utils/auth';

export const toggleLike = mutationField('toggleLike', {
  type: 'Like',
  args: {
    postId: nonNull(stringArg()),
  },
  resolve: async (_, args, ctx) => {
    const req = ctx.req;
    const decodedJwt = await isAuth(req);
    const user = await ctx.prisma.user.findUnique({
      where: { id: decodedJwt.userId },
    });
    try {
      const isExist = await ctx.prisma.like.findFirst({
        where: { AND: [{ userId: user.id }, { postId: args.postId }] },
      });
      if (isExist) {
        await ctx.prisma.like.deleteMany({
          where: { AND: [{ userId: user.id }, { postId: args.postId }] },
        });
      } else {
        const like = await ctx.prisma.like.create({
          data: {
            user: { connect: { id: user.id } },
            post: { connect: { id: args.postId } },
          },
        });
        return like;
      }
    } catch (error) {
      console.log(error);
    }
  },
});
