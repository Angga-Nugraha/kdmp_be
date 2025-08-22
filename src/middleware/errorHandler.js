export const errorMessage = (err, req, res, next) => {
    const { status = 500, message = "Something went wrong..." } = err;
    res.status(status).json({
        status: false,
        message: message
    });
};
