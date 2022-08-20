import { mutationField, nonNull, stringArg } from 'nexus';
import shortId from 'shortid';
import { isAuth } from '../../../utils/auth';

export const createComment = mutationField('createComment', {
  type: 'Comment',
  args: {
    postId: nonNull(stringArg()),
    content: nonNull(stringArg()),
  },
  async resolve(_, args, ctx) {
    const req = ctx.req;
    const decodedJwt = await isAuth(req);
    const id = shortId.generate();
    const user = await ctx.prisma.user.findUnique({
      where: { id: decodedJwt.userId },
    });
    try {
      const post = await ctx.prisma.post.findUnique({
        where: { id: args.postId },
        rejectOnNotFound: true,
      });

      if (!post) throw new Error('No post found');

      const comment = await ctx.prisma.comment.create({
        data: {
          id,
          user: { connect: { id: user.id } },
          post: { connect: { id: args.postId } },
          content: args.content,
        },
      });

      return comment;
    } catch (error) {
      throw new Error(`Failed to create comment ${error}`);
    }
  },
});

export const updateComment = mutationField('updateComment', {
  type: 'Comment',
  args: {
    commentId: nonNull(stringArg()),
    caption: nonNull(stringArg()),
  },
  async resolve(_, args, ctx) {
    try {
      const decodedJwt = await isAuth(ctx.req);
      const user = await ctx.prisma.user.findUnique({
        where: { id: decodedJwt.userId },
      });
      const comment = await ctx.prisma.comment.findUnique({
        where: { id: args.commentId },
        rejectOnNotFound: true,
      });
      if (comment.userId !== user.id) {
        throw new Error(`not authorized`);
      }

      return ctx.prisma.comment.update({
        where: { id: args.commentId },
        data: {
          content: args.caption,
        },
      });
    } catch (error) {
      throw new Error(`failed to update comment: ${error}`);
    }
  },
});

export const deleteComment = mutationField('deleteComment', {
  type: 'Comment',
  args: {
    commentId: nonNull(stringArg()),
  },
  async resolve(_, args, ctx) {
    try {
      const req = ctx.req;
      const decodedJwt = await isAuth(req);
      const user = await ctx.prisma.user.findUnique({
        where: { id: decodedJwt.userId },
      });
      const comment = await ctx.prisma.comment.findUnique({
        where: { id: args.commentId },
        rejectOnNotFound: true,
      });
      if (comment.userId !== user.id) {
        throw new Error(`You can't delete someone's comment.`);
      }
      return await ctx.prisma.comment.delete({
        where: { id: args.commentId },
      });
    } catch (error) {
      throw new Error(`failed to delete comment: ${error}`);
    }
  },
});
