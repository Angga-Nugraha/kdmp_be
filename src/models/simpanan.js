import { DataTypes } from "sequelize";
import db from "../config/db.js";
import JenisSimpanan from "./jenisSimpanan.js";

const Simpanan = db.define("Simpanan", {
  id_simpanan: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  id_anggota: { type: DataTypes.INTEGER, allowNull: false },
  id_jenis: { type: DataTypes.INTEGER, allowNull: false },
  jumlah: { type: DataTypes.DECIMAL(15, 2), allowNull: false },
  tgl_simpan: { type: DataTypes.DATEONLY, allowNull: false }
}, {
  tableName: "simpanan",
  timestamps: false,
  indexes: [
    { fields: ["id_anggota"] },
    { fields: ["id_jenis"] }
  ]
});

Simpanan.addHook("beforeCreate", async (simpanan) => {
  const jenisSimpanan = await JenisSimpanan.findByPk(simpanan.id_jenis);
  if (simpanan.jumlah < jenisSimpanan.minimal) {
    throw { message: "Jumlah simpanan tidak memenuhi syarat minimal" };
  }
});

Simpanan.addHook("beforeUpdate", async (simpanan) => {
  const jenisSimpanan = await JenisSimpanan.findByPk(simpanan.id_jenis);
  if (simpanan.jumlah <jenisSimpanan.minimal) {
    throw { message: "Jumlah simpanan tidak memenuhi syarat minimal" };
  }
});

export default Simpanan;
