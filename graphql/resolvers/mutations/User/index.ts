import { mutationField, nonNull, stringArg, extendType, nullable } from 'nexus';
import { hash, compare } from 'bcrypt';
import { serialize } from 'cookie';
import {
  CreateUserInput,
  LoginUserInput,
  UpdateProfileInput,
} from '../../inputs';
import { nanoid } from 'nanoid';
import { Context } from '../../../context';
import {
  registrationValidation,
  loginValidation,
} from '../../../../utils/registrationValidation';
import { PrismaClient } from '@prisma/client';
import { createToken } from '../../../../utils/jwt';
import { isAuth } from '../../../../utils/auth';

export const userSignUpMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('signup', {
      type: 'User',
      args: { input: nonNull(CreateUserInput) },
      async resolve(_parent, { input }, ctx: Context) {
        const id = nanoid(10);
        await registrationValidation.validate(input);
        const userName = await ctx.prisma.user.findUnique({
          where: { username: input.username },
        });

        const userEmail = await ctx.prisma.user.findUnique({
          where: { email: input.email },
        });

        if (userName) {
          throw new Error('Username already taken');
        }
        if (userEmail) {
          throw new Error('Email already taken. Try another:(');
        }
        const passHash = await hash(input.password, 7);
        return await ctx.prisma.user.create({
          data: {
            id,
            email: input.email,
            username: input.username,
            password: passHash,
          },
        });
      },
    });
  },
});

export const userLoginMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('login', {
      type: 'User',
      args: { input: nonNull(LoginUserInput) },
      resolve: async (_parent, { input }, { prisma, res }: Context) => {
        await loginValidation.validate(input);

        const existingUser = await getExistingUser(input, prisma);

        const encodedToken = await createToken(
          { userId: existingUser.id },
          {
            expiresIn: '7d',
          }
        );
        console.log(encodedToken);
        // nookies.set({ res }, 'sid', encodedToken, {
        //   httpOnly: true,
        //   domain: 'http://localhost:3000',
        //   maxAge: 60 * 60 * 24 * 7, // 7d
        //   sameSite: true,
        //   path: '/',
        // } as CookieSerializeOptions);
        res.setHeader(
          'Set-Cookie',
          serialize('sid', encodedToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            maxAge: 60 * 60 * 24 * 1000,
            sameSite: 'strict',
            path: '/',
          })
        );

        return existingUser;
      },
    });
  },
});

export const updateProfile = mutationField('updateProfile', {
  type: 'User',
  args: { input: nullable(UpdateProfileInput) },
  resolve: async (parent, args, ctx) => {
    let req = ctx.req;
    const decodedJwt = await isAuth(req);

    const user = await ctx.prisma.user.findUnique({
      where: { id: decodedJwt.userId },
    });

    if (!user) throw new Error('User not found');
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
  },
});

export const logoutMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('logout', {
      type: 'Boolean',
      async resolve(_parent, _args, { res }) {
        res.setHeader(
          'Set-Cookie',
          serialize('sid', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            expires: new Date(0),
            sameSite: 'strict',
            path: '/',
          })
        );
        return true;
      },
    });
  },
});

export const follow = mutationField('follow', {
  type: 'User',
  args: {
    id: nonNull(stringArg()),
  },
  resolve: async (_, args, ctx) => {
    const req = ctx.req;
    const decodedJwt = await isAuth(req);
    const user = await ctx.prisma.user.findUnique({
      where: { email: decodedJwt.userId },
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
    const decodedJwt = await isAuth(req);
    const user = await ctx.prisma.user.findUnique({
      where: { id: decodedJwt.userId },
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

const getExistingUser = async (
  credentials: { email_or_username: string; password: string },
  prisma: PrismaClient
) => {
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [
        { email: credentials.email_or_username },
        { username: credentials.email_or_username },
      ],
    },
    // select: { email: true, password: true, id: true, fullName: true },
  });

  const passwordMatch = await compare(
    credentials.password,
    (existingUser?.password as string) || ''
  );

  if (!existingUser || !passwordMatch) {
    throw new Error('Incorrect username or password!');
  }

  return existingUser;
};
