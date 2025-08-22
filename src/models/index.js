import sequelize from "../config/db.js";

// Import models
import Anggota from "./anggota.js";
import Keluarga from "./keluarga.js";
import User from "./users.js";
import LogAktivitas from "./logAktivitas.js";
import JenisSimpanan from "./jenisSimpanan.js";
import Simpanan from "./simpanan.js";
import Pinjaman from "./pinjaman.js";
import Angsuran from "./angsuran.js";
import Kas from "./kas.js";
import Akun from "./akun.js";
import JurnalHeader from "./jurnalHeader.js";
import JurnalDetail from "./jurnalDetail.js";
import UnitUsaha from "./unitUsaha.js";
import TransaksiUnit from "./transaksiUnit.js";
import Inventaris from "./inventaris.js";
import Shu from "./shu.js";
import ShuAnggota from "./shuAnggota.js";
import Rapat from "./rapat.js";
import Keputusan from "./keputusan.js";

// =======================
// 🔗 RELASI ANTAR MODEL
// =======================

// Keanggotaan
Anggota.hasMany(Keluarga, { foreignKey: "id_anggota", as: "keluarga" });
Keluarga.belongsTo(Anggota, { foreignKey: "id_anggota", as: "anggota" });

Anggota.hasMany(Simpanan, { foreignKey: "id_anggota", as: "simpanan" });
Simpanan.belongsTo(Anggota, { foreignKey: "id_anggota", as: "anggota"  });

JenisSimpanan.hasMany(Simpanan, { foreignKey: "id_jenis", as: "simpanan" });
Simpanan.belongsTo(JenisSimpanan, { foreignKey: "id_jenis", as: "jenis_simpanan"  });

Anggota.hasMany(Pinjaman, { foreignKey: "id_anggota", as: "pinjaman" });
Pinjaman.belongsTo(Anggota, { foreignKey: "id_anggota", as: "anggota"  });

Pinjaman.hasMany(Angsuran, { foreignKey: "id_pinjaman", as: "angsuran" });
Angsuran.belongsTo(Pinjaman, { foreignKey: "id_pinjaman", as: "pinjaman"  });

Anggota.hasOne(User, { foreignKey: "id_anggota", as: "user" });
User.belongsTo(Anggota, { foreignKey: "id_anggota", as: "anggota"  });

User.hasMany(LogAktivitas, { foreignKey: "id_user", as: "log_aktivitas" });
LogAktivitas.belongsTo(User, { foreignKey: "id_user", as: "user"  });

// Akuntansi (double-entry)
JurnalHeader.hasMany(JurnalDetail, { foreignKey: "id_jurnal_header", as: "detail" });
JurnalDetail.belongsTo(JurnalHeader, { foreignKey: "id_jurnal_header", as: "header"  });

Akun.hasMany(JurnalDetail, { foreignKey: "id_akun", as: "detail" });
JurnalDetail.belongsTo(Akun, { foreignKey: "id_akun", as: "akun"  });

// Unit Usaha
UnitUsaha.hasMany(TransaksiUnit, { foreignKey: "id_unit", as: "transaksi_unit" });
TransaksiUnit.belongsTo(UnitUsaha, { foreignKey: "id_unit", as: "unit_usaha"  });

UnitUsaha.hasMany(Inventaris, { foreignKey: "id_unit", as: "inventaris" });
Inventaris.belongsTo(UnitUsaha, { foreignKey: "id_unit", as: "unit_usaha"  });

// SHU
Shu.hasMany(ShuAnggota, { foreignKey: "id_shu", as: "shu_anggota" });
ShuAnggota.belongsTo(Shu, { foreignKey: "id_shu", as: "shu"  });

Anggota.hasMany(ShuAnggota, { foreignKey: "id_anggota", as: "shu_anggota" });
ShuAnggota.belongsTo(Anggota, { foreignKey: "id_anggota", as: "anggota"  });

// Rapat
Rapat.hasMany(Keputusan, { foreignKey: "id_rapat", as: "keputusan" });
Keputusan.belongsTo(Rapat, { foreignKey: "id_rapat", as: "rapat"  });


// =======================
// EXPORT SEMUA MODEL
// =======================
export {
  sequelize,
  Anggota, Keluarga, User, LogAktivitas,
  JenisSimpanan, Simpanan,
  Pinjaman, Angsuran,
  Kas, Akun,
  JurnalHeader, JurnalDetail,
  UnitUsaha, TransaksiUnit, Inventaris,
  Shu, ShuAnggota,
  Rapat, Keputusan
};
