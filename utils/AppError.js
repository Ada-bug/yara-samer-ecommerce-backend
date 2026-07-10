// function successResponse(res, data, message='success'){
//     res.json({status:"success", message,data})
// }

// function errorResponse(re, error, message="error"){
//     res.status(500).json({status:'error',message, error:error? error.message : null});
// }

class AppError extends Error{
    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode;
        this.status = String(statusCode).startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}


module.exports = AppError;
