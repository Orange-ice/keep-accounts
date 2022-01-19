import withSessionApi from '../../../lib/withSessionApi';
import {NextApiHandler} from 'next';
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

interface RecordData {
  content: string;
  amount: string;
  tagId: number;
}


const recordHandle: NextApiHandler = async (req, res) => {
  if (!req.session.user) {
    res.status(401).json({message: '未登录'});
    return;
  }
  switch (req.method) {
    // 新增 record
    case 'POST':
      const {content, amount, tagId} = req.body as RecordData;
      const record = await prisma.record.create({
        data: {
          content,
          amount,
          tagId,
          userId: req.session.user.id
        }
      });
      res.json(record);
      break;
    case 'GET':
      // 获取所有record
      const records = await prisma.record.findMany({
        where: {userId: req.session.user.id},
        include: {tag: true}
      });
      res.json(records);
      break;
  }
};

export default withSessionApi(recordHandle);
