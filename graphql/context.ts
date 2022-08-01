import { NextApiResponse, NextApiRequest } from 'next';
import { PrismaClient, User } from '@prisma/client';
import prisma from '../lib/prisma';

export type Context = {
  prisma: PrismaClient;
  req: NextApiRequest;
  res: NextApiResponse;
  // email: string;
  // user: User;
};
// const user = await prisma.user.findUnique({
//   where:{email:session.user.email}
// })
export async function createContext({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}): Promise<Context> {
  return {
    prisma,
    req,
    res,
    // email: session.user.email,
    // user,
  };
}
