import bcrypt from 'bcrypt';
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    const { username, email, password } = req.body

    try {
        if (!username || !email || !password) {
            res.status(401).json({
                error: "Please fill all the details"
            })
        }

        const newUser = await User.create({
            username,
            email,
            password
        })

        console.log(newUser);

        res.status(201).json({
            message: "User created successfully!",
        })
    } catch (error) {
        res.status(500).json({
            error: "Failed to create user"
        })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body

    try {
        // user find
        const user = await User.findOne({
            $or: [{ email }]
        })

        if (!user) {
            return res.status(401).json({
                error: "Invalid Credentials! User not found."
            });
        }

        // if exist 
        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return res.status(401).json({
                error: "Invalid Credentials"
            })
        }

        // generate cookie token
        const age = 1000 * 60 * 60 * 24 * 7

        const token = jwt.sign(
            {
                id: user._id,
                isAdmin: false
            },
            process.env.SECRET_KEY,
            { expiresIn: age }
        );

        const { password: userPassword, ...userInfo } = user.toObject(); // Convert to plain object

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: age
        }).status(200)
            .json(userInfo)

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Failed to login!",
        });
    }
}

export const logout = (req, res) => {
    res.clearCookie("token").status(200).json({
        message: "Logout successfull"
    })

}