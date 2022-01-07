import type {NextApiRequest, NextApiResponse} from 'next';
import withSessionApi from '../../../lib/withSessionApi';
import {PrismaClient} from '@prisma/client';
import {object} from 'prop-types';

const prisma = new PrismaClient();

interface Tag {
    name: string;
    icon: string;
    type: 1 | 0;
}

interface Params {
    name?: string;
    id?: string;
}

async function createTag(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'POST':
            const {name, icon, type} = req.body as Tag;

            const tag = await prisma.tag.findFirst({where: {name: name}});
            if (tag) return res.status(422).json({message: `${name}标签已存在`});

            const newTag = await prisma.tag.create({
                data: {name, icon, type, userId: req.session.user!.id}
            });
            res.json(newTag);
            break;
        case 'GET':
            console.log(req.query);
            const params: Params = req.query;

            const tags = await prisma.tag.findMany({
                where: params.id ? {
                    name: params.name,
                    id: Number(params.id),
                    userId: req.session.user!.id
                } : {name: params.name, userId: req.session.user!.id}
            });
            res.json(tags);
            break;
        default:
            res.status(404);
    }
}

export default withSessionApi(createTag);
