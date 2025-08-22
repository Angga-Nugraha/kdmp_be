import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Angsuran = db.define("Angsuran",
  {
    id_angsuran: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    id_pinjaman: { type: DataTypes.INTEGER, allowNull: false },
    angsuran_ke: { type: DataTypes.INTEGER, allowNull: false },
    jumlah: { type: DataTypes.DECIMAL(15, 2), allowNull: false },
    denda: { type: DataTypes.DECIMAL(15, 2), defaultValue: 0 },
    tgl_jatuh_tempo: DataTypes.DATEONLY,
    tgl_bayar: DataTypes.DATEONLY,
    status: { type: DataTypes.ENUM("lunas", "tertunda", "telat"), defaultValue: "lunas" }
  },
  {
    tableName: "angsuran",
    timestamps: false
  });

export default Angsuran;
