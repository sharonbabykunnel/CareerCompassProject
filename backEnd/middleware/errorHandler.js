const handleError = (res, status, message) =>
  res.status(status).json({ message });
export default handleError;
