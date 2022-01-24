import {IronSessionData} from 'iron-session';

// 解决res.session.user时，报错，user不存在于IronSessionData
declare module 'iron-session' {
  export interface IronSessionData {
    user?: {
      username: string;
      id: number
    };
  }
}
