import jwt from "jsonwebtoken";
import { User, Anggota } from "../models/index.js";
import { wrapAsync } from "../utils/wrapAsync.js";

export const register = wrapAsync(async (req, res) => {
    const user = await User.create(req.body);
    res.status(201).json({
        id_user: user.id_user,
        username: user.username,
        role: user.role
    });
});

export const login = wrapAsync(async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({
        where:
            { username }, include: [{ model: Anggota, as: "anggota" }]
    });
    if (!user || !(await user.comparePassword(password))) {
        throw { status: 401, message: "Username atau password salah" };
    }
    const payload = { sub: user.id_user, role: user.role };
    const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "8h" });
    res.cookie("token", token, { httpOnly: true });
    req.session.user = {
        id_user: user.id_user,
        username: user.username,
        role: user.role
    };
    
    res.json({
        status: true,
        message: "Login berhasil",
        token,
        user: {
            id_user: user.id_user,
            username: user.username,
            role: user.role,
            anggota: user.Anggota
        }
    });
});
