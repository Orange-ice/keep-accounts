import withSessionApi from '../../../../lib/withSessionApi';
import type {NextApiRequest, NextApiResponse} from 'next';

async function logout(req: NextApiRequest, res: NextApiResponse) {
    req.session.destroy();
    res.json({message: '注销成功'});
}


export default withSessionApi(logout);
