import { objectType } from 'nexus';

export const Follows = objectType({
  name: 'Follows',
  definition(t) {
    t.nonNull.field('follower', {
      type: 'User',
      resolve(parent, __, ctx) {
        return ctx.prisma.user.findUnique({
          where: { id: parent.followerId },
        });
      },
    }),
      t.nonNull.string('followerId'),
      t.nonNull.field('following', {
        type: 'User',
        resolve(parent, __, ctx) {
          return ctx.prisma.user.findUnique({
            where: { id: parent.followingId },
          });
        },
      }),
      t.nonNull.string('followingId');
  },
});
