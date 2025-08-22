import { DataTypes } from "sequelize";
import db from "../config/db.js";

const ShuAnggota = db.define("ShuAnggota", {
  id_shu_anggota: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  id_shu: { type: DataTypes.INTEGER, allowNull: false },
  id_anggota: { type: DataTypes.INTEGER, allowNull: false },
  jumlah: { type: DataTypes.DECIMAL(15,2), allowNull: false }
}, { tableName: "shu_anggota", timestamps: false });

export default ShuAnggota;
