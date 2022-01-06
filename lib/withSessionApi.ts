import {withIronSessionApiRoute} from 'iron-session/next/index';
import {NextApiHandler} from 'next';

export default function withSessionApi(handler: NextApiHandler) {
    return withIronSessionApiRoute(handler, {
        password: '63206340734082582585623743809095',
        cookieName: 'burt_app',
        cookieOptions: {secure: false}
    });
}
