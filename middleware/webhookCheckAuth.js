const jwt = require('jsonwebtoken');
const tokenSecret = process.env.JWT_SECRET;

exports.webhookCheckAuth = async (req, res, next) => {
  const header = req.get('Authorization');
  if (!header || !header.startsWith('Bearer')) {
    return res.status(403).json({
      success: false,
      message: 'No token found, Authorization denied',
    });
  }

  try {
    // Decrypting token
    const token = header.split(' ')[1];
    const { name, type } = jwt.verify(token, tokenSecret);
    if (!name === 'Postexo' || !type === 'Webhook') {
      return res.status(400).json({ message: 'You are not authorized to access this resource' });
    }

    res.set(
      'cache-control',
      'no-cache, no-store, private, must-revalidate, post-check=0, pre-check=0',
    );
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
