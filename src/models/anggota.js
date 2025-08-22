import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Anggota = db.define('Anggota',
    {
        id_anggota: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        no_anggota: { type: DataTypes.STRING(20), allowNull: false },
        nama: { type: DataTypes.STRING(100), allowNull: false },
        tempat_lahir: { type: DataTypes.STRING(50), allowNull: false },
        tgl_lahir: { type: DataTypes.DATEONLY, allowNull: false },
        alamat: { type: DataTypes.STRING(100), allowNull: false },
        no_hp: { type: DataTypes.STRING(15) },
        email: { type: DataTypes.STRING(100) },
        pekerjaan: { type: DataTypes.STRING(100) },
        tgl_daftar: { type: DataTypes.DATEONLY, allowNull: false, defaultValue: DataTypes.NOW },
        tgl_keluar: { type: DataTypes.DATEONLY },
        status: { type: DataTypes.ENUM('aktif', 'non-aktif', "meninggal", "keluar"), defaultValue: 'aktif' },
    }, {
    indexes: [
        { unique: true, fields: ['no_anggota'] },
        { unique: true, fields: ['email'] }
    ],
    tableName: 'anggota',
    timestamps: false,

});

export default Anggota;