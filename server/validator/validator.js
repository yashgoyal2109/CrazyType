const { z } = require("zod");

const userSchema = z.object({
    username: z.string().min(3).max(255),
    email: z.string().min(3).max(255),
    password: z.string().min(3).max(255),
});

const signInSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});


module.exports = userSchema;
module.exports = signInSchema;
