var jwt = require('jsonwebtoken');

module.exports = {
  createJWT,
  getExpiry,
  verifyJWT,
};

function createJWT(payload) {
  return jwt.sign(
    // data payload
    { payload },
    process.env.SECRET,
    { expiresIn: '1h' }
  );
}

function getExpiry(token) {
  const payloadBase64 = token.split('.')[1];
  const decodedJson = Buffer.from(payloadBase64, 'base64').toString();
  const decoded = JSON.parse(decodedJson);
  const exp = decoded.exp;
  // console.log('Token Expiry:', exp);
  return exp;
}

function verifyJWT(token) {
  const payload = jwt.verify(
    token,
    process.env.SECRET,
    function (err, decoded) {
      if (err) {
        return null;
      }
      return decoded;
    }
  );
  return payload;
}
