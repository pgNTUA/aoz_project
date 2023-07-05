const db = require('../helpers/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Op = require('sequelize').Op;
module.exports = {
    register,
    login
};


async function register(req, res) {
    try {


        const { username, email, password } = req.body;

        // Validate user input
        if (!(email && password && username)) {
            return res.status(400).send("All input is required");
        }

        if (await db.User.findOne({
            where: {
                [Op.or]: [
                    {username: username}, 
                    {email: email}
                ]
            }
        })) {
            return res.status(409).send("User Already Exists. Please Login");
        }

        // hash password
        encryptedPassword = await bcrypt.hash(password, 10);

        const user = await db.User.create({
            username,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
        });

        
        const token = jwt.sign(
            { user_id: user.id, username },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );

        user.token = token;

        return res.status(201).json(user);
    }
    catch (err) {
        console.log(err);
    }
}

async function login(req, res) {


    try {



        const { username, password } = req.body;

        // Validate user input
        if (!(password && username)) {
            return res.status(400).send("All input is required");
        }
        const user = await db.User.findOne({ where: { username } })

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                { user_id: user.id, username },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );

            user.token = token;
            await user.save();

            return res.status(200).json(user);
        }
        else {
            return res.status(400).send("Invalid Credentials");
        }


    }
    catch (err) {
        console.log(err);
    }
}
