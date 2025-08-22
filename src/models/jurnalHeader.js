import { DataTypes } from "sequelize";
import db from "../config/db.js";


const JurnalHeader = db.define("JurnalHeader", {
  id_jurnal_header: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  tgl: { type: DataTypes.DATEONLY, allowNull: false },
  deskripsi: DataTypes.TEXT,
  sumber_referensi: DataTypes.STRING(50),
  ref_id: DataTypes.INTEGER
}, { tableName: "jurnal_header", timestamps: false });

export default JurnalHeader;
