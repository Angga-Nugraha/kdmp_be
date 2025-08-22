import { DataTypes } from "sequelize";
import db from "../config/db.js";

const LogAktivitas = db.define("LogAktivitas", {
  id_log: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  id_user: DataTypes.INTEGER,
  aksi: DataTypes.TEXT,
  waktu: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, { tableName: "log_aktivitas", timestamps: false });

export default LogAktivitas;
