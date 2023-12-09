//middleware function to catch all for any routes that does not exist 
//middleware function to catch all for any errors that occurs in our routes 

export const notFound = (req, res, next) => {
    const error = new Error ( `not found - ${req.originalUrl}`); 
    res.status(404);
    next(error);
}

export const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode; 
    let message = err.message;
// cast error it is type of error used in mongoose; it gives kind of a weird message if you just leav it as default
   if(err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 404;
    message = 'Resource not found'; 
   }
res.status(statusCode).json ({
    message, 
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
});
}

