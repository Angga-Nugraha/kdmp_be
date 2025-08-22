import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Rapat = db.define("Rapat", {
  id_rapat: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  judul: DataTypes.STRING(200),
  tgl: DataTypes.DATEONLY,
  jenis: { type: DataTypes.ENUM("RAT","rapat_pengurus","rapat_unit","lainnya") },
  notulensi: DataTypes.TEXT
}, { tableName: "rapat", timestamps: false });

export default Rapat;
