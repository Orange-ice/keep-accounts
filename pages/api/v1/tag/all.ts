/**
 * @description 获取所有公共标签
 * */

import {NextApiRequest, NextApiResponse} from 'next';
import withSessionApi from '../../../../lib/withSessionApi';
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

async function getTag(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(404).end();
    return;
  }
  if (!req.session.user) {
    res.status(401).json({message: '未登录'});
    return;
  }
  /**
   * 暂时将 userId = 2 默认为管理员，管理员创建的即为全部标签
   * */
  const tags = await prisma.tag.findMany({
    where: {userId: 2},
    select: {id: true, name: true, icon: true, type: true}
  });
  res.json(tags);
}

export default withSessionApi(getTag);
