import jwt from 'jsonwebtoken'


export const generateToken = ({ payload = {}, signature = process.env.TOKEN_SIGNATURE, expiresIn = '1hour' } = {}) => {
    const token = jwt.sign(payload, signature, { expiresIn });
    if (!token) {
      return  res.json({message:'token expiresIn'});
    }
    return token
}

export const tokenDecode = ({
    payload = "",
    signature = process.env.TOKEN_SIGNATURE,
  }) => {
    if (!payload) {
      return false;
    }
    const decode = jwt.verify(payload, signature);
    if (!decode) {
      return  res.json({message:'token expiresIn'});
    }
    return decode;
  };
  