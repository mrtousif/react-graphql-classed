// catch async errors
const catchAsync = (func) => {
    return (_, args, ctx, info) => {
        func(_, args, ctx, info).catch(_); // err => next(err)
        // if there is error. err object is sent straight to the global errorController
    };
};

module.exports = catchAsync;
