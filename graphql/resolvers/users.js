const User = require("../../models/User");

module.exports = {
    Mutation: {
        register(_, args, ctx, info) {
            const { name, email, password, confirmPassword } = args.register;
            //TODO validate user data
        },
    },
};
