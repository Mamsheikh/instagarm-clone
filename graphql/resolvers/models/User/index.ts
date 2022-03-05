import { objectType } from 'nexus';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.string('id'),
      t.nonNull.string('name'),
      t.nonNull.string('email'),
      t.nullable.string('username'),
      t.nullable.string('phone'),
      t.nullable.string('image'),
      t.nullable.string('address'),
      t.nullable.string('website'),
      t.nullable.string('bio'),
      t.nonNull.boolean('isAdmin'),
      t.nullable.list.field('followedBy', {
        type: 'Follows',
        resolve(parent, __, ctx) {
          return ctx.prisma.user
            .findUnique({
              where: { id: parent.id },
            })
            .followedBy();
        },
      }),
      t.nullable.list.field('following', {
        type: 'Follows',
        async resolve(parent, __, ctx) {
          return ctx.prisma.user
            .findUnique({
              where: { id: parent.id },
            })
            .following();
        },
      });
    t.nonNull.list.field('posts', {
      type: 'Post',
      async resolve(parent, __, ctx) {
        return ctx.prisma.user
          .findUnique({
            where: { id: parent.id },
          })
          .posts();
      },
    });
  },
});
