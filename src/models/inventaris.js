import { DataTypes } from "sequelize";
import db from "../config/db.js";


const Inventaris = db.define("Inventaris", {
  id_inventaris: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nama_barang: DataTypes.STRING(100),
  jumlah: DataTypes.INTEGER,
  nilai: DataTypes.DECIMAL(15,2),
  id_unit: DataTypes.INTEGER
}, { tableName: "inventaris", timestamps: false });

export default Inventaris;
