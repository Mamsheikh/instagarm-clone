import { mutationField } from 'nexus';
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
