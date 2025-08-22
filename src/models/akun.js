import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Akun = db.define("Akun",
  {
    id_akun: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    kode_akun: { type: DataTypes.STRING(20) },
    nama_akun: DataTypes.STRING(100),
    kategori: { type: DataTypes.ENUM("aset", "liabilitas", "modal", "pendapatan", "biaya") },
    normal_balance: { type: DataTypes.ENUM("debit", "kredit") }
  },
  {
      indexes: [{ unique: true, fields: ['kode_akun'] }],
      tableName: "akun",
      timestamps: false
  });

export default Akun;
