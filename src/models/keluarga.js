import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Keluarga = db.define("Keluarga", {
  id_keluarga: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  id_anggota: { type: DataTypes.INTEGER, allowNull: false },
  nama: DataTypes.STRING(100),
  no_hp: { type: DataTypes.STRING(15) },
  hubungan: { type: DataTypes.ENUM("istri","suami","anak","lainnya") }
}, { tableName: "keluarga", timestamps: false });

export default Keluarga;
