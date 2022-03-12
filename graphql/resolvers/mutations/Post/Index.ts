import { CreatePostInput } from './../../inputs';
import { mutationField, nonNull } from 'nexus';
import { getSession } from 'next-auth/react';

export const createPost = mutationField('createPost', {
  type: 'Post',
  args: {
    input: nonNull(CreatePostInput),
  },
  resolve: async (_, args, ctx) => {
    const req = ctx.req;
    const session = await getSession({ req });
    const user = await ctx.prisma.user.findUnique({
      where: { email: session.user.email },
    });

    try {
      if (args.input.images.length === 0) throw new Error('Enter a pic');
      return await ctx.prisma.post.create({
        data: {
          images: args.input.images,
          caption: args.input.caption,
          userId: user.id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  },
});
