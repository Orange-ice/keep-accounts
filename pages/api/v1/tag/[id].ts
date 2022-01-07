import {NextApiHandler} from 'next';
import withSessionApi from '../../../../lib/withSessionApi';
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

const tagHandle: NextApiHandler = async (req, res) => {
    const {name, icon, type} = req.body;
    const tag = await prisma.tag.findUnique({where: {id: parseInt(req.query.id as string)}});
    if (!tag) return res.status(422).json({message: `标签不存在`});
    switch (req.method) {
        case 'PATCH':
            if (tag.name === name) res.status(422).json({message: `${name}标签已存在`});

            const newTag = await prisma.tag.update({
                where: {id: parseInt(req.query.id as string)},
                data: {name, icon, type}
            });
            res.status(200).json(newTag);
            break;
        case 'DELETE':
            await prisma.tag.delete({
                where: {id: parseInt(req.query.id as string)},
            });
            res.json({message: '删除成功'});
            break;
    }
};

export default withSessionApi(tagHandle);
