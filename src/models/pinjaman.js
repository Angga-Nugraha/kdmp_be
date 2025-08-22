import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Pinjaman = db.define("Pinjaman", {
  id_pinjaman: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  id_anggota: { type: DataTypes.INTEGER, allowNull: false },
  jumlah: { type: DataTypes.DECIMAL(15,2), allowNull: false },
  bunga: { type: DataTypes.DECIMAL(5,2), allowNull: false },
  tenor: { type: DataTypes.INTEGER, allowNull: false },
  jenis: { type: DataTypes.ENUM("produktif","konsumtif","darurat") },
  tgl_pinjam: { type: DataTypes.DATEONLY, allowNull: false },
  status: { type: DataTypes.ENUM("berjalan","lunas","gagal"), defaultValue: "berjalan" }
}, { tableName: "pinjaman", timestamps: false });

export default Pinjaman;
