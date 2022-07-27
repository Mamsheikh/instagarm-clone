import { isAuth } from './../../../../utils/auth';
import { CreatePostInput, UpdatePostInput } from './../../inputs';
import { mutationField, nonNull, extendType, stringArg } from 'nexus';
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
    try {
      const req = ctx.req;
      const decodedJwt = await isAuth(req);
      const user = await ctx.prisma.user.findUnique({
        where: { id: decodedJwt.userId },
      });
      const post = await ctx.prisma.post.findFirst({
        where: {
          id: args.input.id,
        },
      });

      if (post.userId !== user.id) {
        throw new Error('not authorized');
      }

      // if (args.input.images.length === 0) throw new Error('Enter a pic');
      return await ctx.prisma.post.update({
        where: { id: args.input.id },
        data: {
          images: args.input.images,
          caption: args.input.caption,
        },
      });
    } catch (error) {
      console.log(error);
    }
  },
});

export const deletePost = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('deletePost', {
      type: 'Post',
      args: {
        postId: nonNull(stringArg()),
      },
      resolve: async (_, { postId }, ctx) => {
        try {
          const req = ctx.req;
          const decodedJwt = await isAuth(req);
          const user = await ctx.prisma.user.findUnique({
            where: { id: decodedJwt.userId },
          });
          const post = await ctx.prisma.post.findFirst({
            where: {
              id: postId,
            },
          });

          if (post.userId !== user.id) {
            throw new Error('not authorized');
          }

          return await ctx.prisma.post.delete({
            where: { id: postId },
          });
        } catch (error) {
          console.log(`failed to delete post ${error}`);
        }
      },
    });
  },
});
