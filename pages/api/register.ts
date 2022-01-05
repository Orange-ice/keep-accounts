import type {NextApiRequest, NextApiResponse} from 'next';
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

interface RequestData {
  username: string;
  password: string;
}

interface ResponseData {}

interface Error {
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData | Error>
) {
  const {body, method} = req;
  if (method !== 'POST') return res.status(404).json({message: 'Not Found'});

  const {username, password} = body as RequestData;

  const result = await prisma.user.create({
    data: {username, password}
  });
  await prisma.$disconnect();
  res.json(result);
}