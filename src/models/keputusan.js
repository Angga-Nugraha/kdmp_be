import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Keputusan = db.define("Keputusan", {
  id_keputusan: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  id_rapat: { type: DataTypes.INTEGER, allowNull: false },
  isi: DataTypes.TEXT,
  status: { type: DataTypes.ENUM("disetujui","ditolak","pending"), defaultValue: "pending" }
}, { tableName: "keputusan", timestamps: false });

export default Keputusan;
