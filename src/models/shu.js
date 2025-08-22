import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Shu = db.define("Shu", {
  id_shu: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  tahun: DataTypes.STRING(4),
  total_shu: { type: DataTypes.DECIMAL(15,2), allowNull: false },
  tgl_bagi: { type: DataTypes.DATEONLY, allowNull: false }
}, { tableName: "shu", timestamps: false });

export default Shu;
