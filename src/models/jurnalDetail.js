import { DataTypes } from "sequelize";
import db from "../config/db.js";

const JurnalDetail = db.define("JurnalDetail", {
  id_jurnal_detail: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  id_jurnal_header: { type: DataTypes.INTEGER, allowNull: false },
  id_akun: { type: DataTypes.INTEGER, allowNull: false },
  debit: { type: DataTypes.DECIMAL(15,2), defaultValue: 0 },
  kredit: { type: DataTypes.DECIMAL(15,2), defaultValue: 0 }
}, { tableName: "jurnal_detail", timestamps: false });

export default JurnalDetail;
