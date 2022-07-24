import { isAuth } from './../../../../utils/auth';
import { CreatePostInput, UpdatePostInput } from './../../inputs';
import { mutationField, nonNull } from 'nexus';
import { nanoid } from 'nanoid';

export const createPost = mutationField('createPost', {
  type: 'Post',
  args: {
    input: nonNull(CreatePostInput),
  },
  resolve: async (_, args, ctx) => {
    const req = ctx.req;
    const decodedJwt = await isAuth(req);
    // console.log({ decodedJwt });
    try {
      const id = nanoid(7);
      const user = await ctx.prisma.user.findUnique({
        where: { id: decodedJwt.userId },
      });
      // console.log({ user });
      if (!user) throw new Error('no user found');
      if (args.input.images.length === 0) throw new Error('Enter a pic');
      return await ctx.prisma.post.create({
        data: {
          id,
          images: args.input.images,
          caption: args.input.caption,
          userId: user.id,
        },
      });
    } catch (error) {
      console.log(`failed to create post ${error}`);
    }
  },
});

export const updatePost = mutationField('updatePost', {
  type: 'Post',
  args: {
    input: nonNull(UpdatePostInput),
  },
  resolve: async (_, args, ctx) => {
    // const req = ctx.req;
    // const session = await getSession({ req });
    // const user = await ctx.prisma.user.findUnique({
    //   where: { email: session.user.email },
    // });

    try {
      // if (args.input.images.length === 0) throw new Error('Enter a pic');
      return await ctx.prisma.post.update({
        where: { id: args.input.id },
        data: {
          // images: args.input.images,
          caption: args.input.caption,
        },
      });
    } catch (error) {
      console.log(error);
    }
  },
});
