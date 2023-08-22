import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import config from '../config.js';
import Role from '../models/Role.js';


export const signup = async (req, res) => {
    try {
        const { username, email, password, roles } = req.body;

        const encryptedPassword = await User.encryptPassword(password);

        const newUser = new User({
            username,
            email,
            password: encryptedPassword,
        });

        if (roles) {
            const foundRoles = await Role.find({ name: { $in: roles } });
            newUser.roles = foundRoles.map(role => role._id);
        } else {
            const defaultRole = await Role.findOne({ name: "user" });
            newUser.roles = [defaultRole._id];
        }

        const savedUser = await newUser.save();
        console.log(savedUser);

        const token = jwt.sign({ id: savedUser._id }, config.SECRET, { expiresIn: 86400 /* 24hs */ });
        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while signing up" });
    }
};

export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userFound = await User.findOne({ email }).populate("roles");

        if (!userFound) {
            return res.status(404).json({ message: "User not found" });
        }

        const matchPassword = await User.comparePassword(password, userFound.password);

        if (!matchPassword) {
            return res.status(401).json({ token: null, message: "Invalid password" });
        }

        const token = jwt.sign({ id: userFound._id }, config.SECRET, { expiresIn: 86400 });

        console.log(userFound);
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while signing in" });
    }
};

export const verifyToken = async (req, res) => {
    const { token } = req.cookies;

    if (!token) return res.status(401).json({ message: "Unauthorized" });
    jwt.verify(token, config.SECRET, async (err, user) => { 
        if (err) return res.status(401).json({ message: "Unauthorized" });
        const userFound = await User.findById(user.id);
        if (!userFound) return res.status(401).json({ message: "Unauthorized" });

        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email
        });
    });
}