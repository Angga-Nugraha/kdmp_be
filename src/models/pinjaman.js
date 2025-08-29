import { DataTypes } from "sequelize";
import db from "../config/db.js";
import dayjs from "dayjs";

const Pinjaman = db.define("Pinjaman", {
  id_pinjaman: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  id_anggota: { type: DataTypes.INTEGER, allowNull: false },
  jumlah: { type: DataTypes.DECIMAL(15,2), allowNull: false },
  bunga: { type: DataTypes.DECIMAL(5,2), allowNull: false },
  tenor: { type: DataTypes.INTEGER, allowNull: false }, // tenor dalam bulan
  jenis: { type: DataTypes.ENUM("produktif","konsumtif","darurat") },
  tgl_pinjam: { type: DataTypes.DATEONLY, allowNull: false },
  tgl_jatuh_tempo: { type: DataTypes.DATEONLY }, // kolom baru
  status: { type: DataTypes.ENUM("berjalan","lunas","gagal"), defaultValue: "berjalan" }
}, { tableName: "pinjaman", timestamps: false });

// === Hook untuk set tgl_jatuh_tempo otomatis ===
Pinjaman.beforeCreate((pinjaman) => {
  if (pinjaman.tgl_pinjam && pinjaman.tenor) {
    pinjaman.tgl_jatuh_tempo = dayjs(pinjaman.tgl_pinjam)
      .add(pinjaman.tenor, "month")
      .format("YYYY-MM-DD");
  }
});

export default Pinjaman;
