import { DataTypes } from "sequelize";
import db from "../config/db.js";

const JenisSimpanan = db.define("JenisSimpanan", {
  id_jenis: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nama: { type: DataTypes.STRING(50), allowNull: false },
  minimal: { type: DataTypes.DECIMAL(15,2), defaultValue: 0 },
  bunga: { type: DataTypes.DECIMAL(5,2), defaultValue: 0 },
  sifat: { type: DataTypes.ENUM("pokok","wajib","sukarela","deposito") }
}, { tableName: "jenis_simpanan", timestamps: false });

export default JenisSimpanan;
