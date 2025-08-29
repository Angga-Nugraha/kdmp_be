import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Kas = db.define("Kas", {
  id_kas: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  jenis: { type: DataTypes.ENUM("masuk", "keluar"), allowNull: false },
  keterangan: DataTypes.TEXT,
  jumlah: { type: DataTypes.DECIMAL(15, 2), allowNull: false },
  tgl_transaksi: { type: DataTypes.DATEONLY, allowNull: false },
  ref_id: { type: DataTypes.INTEGER },
  sumber: { type: DataTypes.ENUM("simpanan", "pinjaman", "angsuran", "shu", "unit_usaha", "lainnya") }
}, { tableName: "kas", timestamps: false });

export default Kas;
