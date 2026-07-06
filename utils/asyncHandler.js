const asyncHandler = (func) => {
        return (req, res, next) => {
            func(req, res, next).catch(err => next(err));
        }
    }

// Source - https://stackoverflow.com/a/79720335
// Posted by Moaad
// Retrieved 2026-07-06, License - CC BY-SA 4.0

// const asyncHandler = fn => (req, res, next) =>
//   Promise.resolve(fn(req, res, next)).catch(next);

module.exports = asyncHandler;