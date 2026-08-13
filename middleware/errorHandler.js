function errorHandler(err, req, res, next) {
    const resStatus = res.statusCode && res.statusCode !== 200 ? res.statusCode: undefined;
    let statusCode = err.statusCode || resStatus || 500;
    let message = err.message || 'Server error';

    if(err.name == 'ValidationError'){
        statusCode = 400;
        message = Object.values(err.errors).map((e)=>e.message).join(', ');
    }

    if(err.name == 'CastError'){
        statusCode = 400;
        message = `Invalid ${err.path}: ${err.value}`;
    }

    if(statusCode === 500){
        console.log('Error: ', err);
    }

    res.status(statusCode).json({message});
}

function notFound(req, res){
    res.status(404).json({message: `Route not found: ${req.originalUrl}`});
}

module.exports = {errorHandler, notFound};