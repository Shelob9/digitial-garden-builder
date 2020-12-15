import { userJwtData } from './../../../types/user';

import { decodeJwtToken } from './jwt';
import { NextApiRequest } from 'next';
import Cookies from 'universal-cookie';

const getSession = (req: NextApiRequest): userJwtData | false => {
  let token = '';
  if (req.headers.authorization) {
    token = req.headers.authorization;
  } else {
    const cookies = new Cookies(req ? req.headers.cookie : null);
    token = cookies.get('_garden_token');
  }
  if (!token) {
    return false;
  }

  let session = decodeJwtToken(token);

  return session ?? false;
};

export default getSession;
