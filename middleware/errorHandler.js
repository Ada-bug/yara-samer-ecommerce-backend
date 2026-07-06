// Central errorHandler

const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);
  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  }
  if (err.name === 'CastError') {
    return res.status(400).json({ error: 'Invalid ID format' });
  }
  if (err.code === 11000) {
    return res.status(409).json({ error: 'Duplicate key error', field: Object.keys(err.keyPattern)[0] });
  }
  res.status(500).json({ error: 'Internal Server Error', details: err.message });
};

module.exports = errorHandler;