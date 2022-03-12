import { objectType } from 'nexus';

export const Post = objectType({
  name: 'Post',
  definition(t) {
    t.nonNull.string('id'),
      t.nullable.string('caption'),
      t.list.string('images'),
      t.nonNull.string('userId'),
      t.nonNull.field('user', {
        type: 'User',
        async resolve(parent, _, ctx) {
          return ctx.prisma.post
            .findUnique({
              where: {
                id: parent.id,
              },
            })
            .user();
        },
      });
  },
});
