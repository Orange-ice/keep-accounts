import {NextApiRequest, NextApiResponse} from 'next';
import withSessionApi from '../../../../lib/withSessionApi';
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

const getUser = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.session.user) {
    res.status(401).json({message: '未登录'});
    return;
  }
  if (req.method === 'GET') {
    const user = await prisma.user.findUnique({
      where: {id: req.session.user.id},
      select: {password: false, id: true, username: true, createdAt: true, avatar: true}
    });
    res.json(user);
  }
};

export default withSessionApi(getUser);
