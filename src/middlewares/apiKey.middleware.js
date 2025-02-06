import configuration from "../config/configuration.js";


const isAdminApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  console.log(apiKey, configuration.adminApiKey)
  if (!apiKey || apiKey !== configuration.adminApiKey) {
    return res.status(403).json({ message: 'You are not authorized for this action' });
  }
  next();
};

export default isAdminApiKey;
