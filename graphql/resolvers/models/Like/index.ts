import { objectType } from 'nexus';

export const Like = objectType({
  name: 'Like',
  definition(t) {
    t.nonNull.string('id'),
      t.nonNull.field('user', {
        type: 'User',
        resolve: (parent, __, ctx) => {
          return ctx.prisma.like
            .findUnique({
              where: { id: parent.id },
            })
            .user();
        },
      }),
      t.nonNull.field('post', {
        type: 'Post',
        resolve: (parent, __, ctx) => {
          return ctx.prisma.like
            .findUnique({
              where: { id: parent.id },
            })
            .post();
        },
      }),
      t.nonNull.string('userId'),
      t.nonNull.string('postId');
  },
});
