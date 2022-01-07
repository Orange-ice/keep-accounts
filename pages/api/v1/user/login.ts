import withSessionApi from '../../../../lib/withSessionApi';
import type {NextApiRequest, NextApiResponse} from 'next';
import {PrismaClient} from '@prisma/client';
import sha256 from 'crypto-js/sha256';

const prisma = new PrismaClient();

async function login(req: NextApiRequest, res: NextApiResponse) {
    const {username, password} = req.body as { username: string, password: string };
    const user = await prisma.user.findUnique({where: {username: username},});
    if (!user) return res.status(422).json({message: `${username}不存在`});
    if (sha256(password).toString() !== user.password) return res.status(422).json({message: '用户名或密码错误'});

    req.session.user = {username, id: user.id};
    await req.session.save();
    res.json({message: '登录成功'});
}

export default withSessionApi(login);
