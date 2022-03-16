import { objectType } from 'nexus';

export const Comment = objectType({
  name: 'Comment',
  definition(t) {
    t.nonNull.string('id'),
      t.nonNull.string('content'),
      t.nonNull.field('post', {
        type: 'Post',
        resolve: (parent, _, ctx) => {
          return ctx.prisma.comment
            .findUnique({
              where: { id: parent.id },
            })
            .post();
        },
      }),
      t.nonNull.string('postId'),
      t.nonNull.field('user', {
        type: 'User',
        resolve(parent, _, ctx) {
          return ctx.prisma.comment
            .findUnique({
              where: { id: parent.id },
            })
            .user();
        },
      }),
      t.nonNull.string('userId');
  },
});
