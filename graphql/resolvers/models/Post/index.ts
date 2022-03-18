import { objectType } from 'nexus';

export const Edge = objectType({
  name: 'Edge',
  definition(t) {
    t.string('cursor');
    t.field('node', {
      type: 'Post',
    });
  },
});

export const PageInfo = objectType({
  name: 'PageInfo',
  definition(t) {
    t.string('endCursor');
    t.boolean('hasNextPage');
  },
});

export const Response = objectType({
  name: 'Response',
  definition(t) {
    t.field('pageInfo', { type: PageInfo });
    t.list.field('edges', {
      type: Edge,
    });
  },
});

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
