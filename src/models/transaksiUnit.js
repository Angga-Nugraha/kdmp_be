import { DataTypes } from "sequelize";
import db from "../config/db.js";

const TransaksiUnit = db.define("TransaksiUnit", {
  id_transaksi: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  id_unit: DataTypes.INTEGER,
  tgl: { type: DataTypes.DATEONLY, allowNull: false },
  deskripsi: DataTypes.TEXT,
  pemasukan: { type: DataTypes.DECIMAL(15,2), defaultValue: 0 },
  pengeluaran: { type: DataTypes.DECIMAL(15,2), defaultValue: 0 }
}, { tableName: "transaksi_unit", timestamps: false });

export default TransaksiUnit;
