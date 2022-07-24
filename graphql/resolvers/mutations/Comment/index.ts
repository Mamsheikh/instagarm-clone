import { mutationField, nonNull, stringArg } from 'nexus';

export const createComment = mutationField('createComment', {
  type: 'Comment',
  args: {
    postId: nonNull(stringArg()),
    content: nonNull(stringArg()),
  },
  async resolve(_, args, ctx) {
    const req = ctx.req;
    // const session = await getSession({ req });
    const user = await ctx.prisma.user.findUnique({
      where: { email: '' },
    });
    try {
      const post = await ctx.prisma.post.findUnique({
        where: { id: args.postId },
        rejectOnNotFound: true,
      });

      if (!post) throw new Error('No post found');

      const comment = await ctx.prisma.comment.create({
        data: {
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

const updateComment = mutationField('updateComment', {
  type: 'Comment',
  args: {
    commentId: nonNull(stringArg()),
    caption: nonNull(stringArg()),
  },
  async resolve(_, args, ctx) {
    try {
      const comment = await ctx.prisma.comment.findUnique({
        where: { id: args.commentId },
        rejectOnNotFound: true,
      });
      if (!comment) {
        throw new Error(`no comment found`);
      }

      return ctx.prisma.comment.update({
        where: { id: args.commentId },
        data: {
          content: args.contentId,
        },
      });
    } catch (error) {
      throw new Error(`failed to update comment: ${error}`);
    }
  },
});

const deleteComment = mutationField('deleteComment', {
  type: 'Comment',
  args: {
    commentId: nonNull(stringArg()),
  },
  async resolve(_, args, ctx) {
    try {
      const req = ctx.req;
      // const session = await getSession({ req });
      const user = await ctx.prisma.user.findUnique({
        where: { email: '' },
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
