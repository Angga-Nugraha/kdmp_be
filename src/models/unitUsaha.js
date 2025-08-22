import { DataTypes } from "sequelize";
import db from "../config/db.js";

const UnitUsaha = db.define("UnitUsaha", {
  id_unit: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nama_unit: DataTypes.STRING(100),
  jenis: { type: DataTypes.ENUM("toko","pertanian","jasa","lainnya") },
  modal_awal: DataTypes.DECIMAL(15,2),
  status: { type: DataTypes.ENUM("aktif","nonaktif"), defaultValue: "aktif" }
}, { tableName: "unit_usaha", timestamps: false });

export default UnitUsaha;
