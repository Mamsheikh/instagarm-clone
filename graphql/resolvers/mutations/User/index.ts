import { mutationField, nonNull, stringArg } from 'nexus';
import { UpdateProfileInput } from '../../inputs';
import { getSession } from 'next-auth/react';

export const updateProfile = mutationField('updateProfile', {
  type: 'User',
  args: { input: UpdateProfileInput },
  resolve: async (parent, args, ctx) => {
    let req = ctx.req;
    const session = await getSession({ req });
    // console.log({ session });
    try {
      const user = await ctx.prisma.user.findUnique({
        where: { email: session.user.email },
      });
      if (user) {
        return ctx.prisma.user.update({
          where: { email: user.email },
          data: {
            address: args.input.address,
            bio: args.input.bio,
            username: args.input.username,
            website: args.input.website,
            image: args.input.image,
            name: args.input.name,
            phone: args.input.phone,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
});

export const follow = mutationField('follow', {
  type: 'User',
  args: {
    id: nonNull(stringArg()),
  },
  resolve: async (_, args, ctx) => {
    const req = ctx.req;
    const session = await getSession({ req });
    const user = await ctx.prisma.user.findUnique({
      where: { email: session.user.email },
    });
    try {
      const toFollowUser = await ctx.prisma.user.findUnique({
        where: { id: args.id },
      });

      if (!toFollowUser) {
        throw new Error('no user found');
      }
      return await ctx.prisma.user.update({
        where: { email: user.email },
        data: {
          following: {
            connect: { id: args.id },
          },
        },
      });
    } catch (error) {}
  },
});

export const unfollow = mutationField('unfollow', {
  type: 'User',
  args: {
    id: nonNull(stringArg()),
  },
  resolve: async (_, args, ctx) => {
    const req = ctx.req;
    const session = await getSession({ req });
    const user = await ctx.prisma.user.findUnique({
      where: { email: session.user.email },
    });
    try {
      const toUnFollowUser = await ctx.prisma.user.findUnique({
        where: { id: args.id },
      });

      if (!toUnFollowUser) {
        throw new Error('no user found');
      }
      return await ctx.prisma.user.update({
        where: { email: user.email },
        data: {
          following: {
            disconnect: { id: args.id },
          },
        },
      });
    } catch (error) {}
  },
});
