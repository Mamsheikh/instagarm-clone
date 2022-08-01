import { objectType } from 'nexus';

export const Post = objectType({
  name: 'Post',
  definition(t) {
    t.nonNull.string('id'),
      t.nullable.string('caption'),
      t.list.string('images'),
      t.list.field('publicId', {
        type: 'String',
        resolve(parent, _args, _ctx) {
          return parent.images.map((image) =>
            image.split('/').pop().split('.').slice(0, -1).join('.')
          );
        },
      });
   
    t.nonNull.dateTime('createdAt');
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
      }),
      t.nonNull.list.field('likes', {
        type: 'Like',
        resolve: (parent, __, ctx) => {
          return ctx.prisma.post
            .findUnique({
              where: { id: parent.id },
            })
            .likes();
        },
      }),
      t.nonNull.list.field('comments', {
        type: 'Comment',
        resolve(parent, _, ctx) {
          return ctx.prisma.post
            .findUnique({
              where: { id: parent.id },
            })
            .comments();
        },
      });
  },
});
