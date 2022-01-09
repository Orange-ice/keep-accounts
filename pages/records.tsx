/**
 * 记账页
 * */

import {NextPage} from 'next';
import {useRouter} from 'next/router';

const Records: NextPage = () => {
  const router = useRouter();
  return (
    <div>
      记账页
      <button onClick={() => {router.back();}}>back</button>
    </div>
  );
};

export default Records;