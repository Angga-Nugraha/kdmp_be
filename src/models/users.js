import { DataTypes, Op } from "sequelize";
import db from "../config/db.js";
import { compPassword, hashPassword } from "../utils/encrypt.js";

const User = db.define("User",
    {
        id_user: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        username: { 
            type: DataTypes.STRING(50), 
            allowNull: false,
            validate: {
                len: {
                    args: [3, 10], // minimal 3 karakter, maksimal 10
                    msg: "Username minimal 3 karakter dan kurang dari 10 karakter",
                },
            },
         },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                len: {
                    args: [6, 100], // minimal 6 karakter, maksimal 100
                    msg: "Password harus lebih dari 6 karakter",
                },
            },
        },
        role: { type: DataTypes.ENUM("admin", "pengurus", "bendahara", "anggota", "auditor"), allowNull: false },
        id_anggota: { type: DataTypes.INTEGER, allowNull: true }
    }, {
    indexes: [{ unique: true, fields: ['username'] }],
    tableName: "users",
    timestamps: false
});

User.addHook("beforeCreate", async (user) => {
    const existingUser = await User.findOne({
        where: { username: user.username }
    });
    if (existingUser) {
        throw { status: 409, message: "Username sudah terdaftar" };
    }
    user.password = await hashPassword(user.password, 10);


});
User.addHook("beforeUpdate", async (user) => {
    if (user.changed("password")) {
        user.password = await hashPassword(user.password);
    }
});
User.prototype.comparePassword = function (plain) {
    return compPassword(plain, this.password);
};

export default User;
