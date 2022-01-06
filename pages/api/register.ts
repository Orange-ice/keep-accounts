import type {NextApiRequest, NextApiResponse} from 'next';
import {PrismaClient} from '@prisma/client';
import sha256 from 'crypto-js/sha256';

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
  const user = await prisma.user.findUnique({where: {username: username}});
  if (user) return res.status(422).json({message: `${username} already exists`});

  const result = await prisma.user.create({
    data: {username, password: sha256(password).toString()},
    select: {password: false, id: true, username: true, createdAt: true, avatar: true}
  });
  await prisma.$disconnect();
  res.json(result);
}
