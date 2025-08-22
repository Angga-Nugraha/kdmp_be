import { Op } from "sequelize";

/**
 * Generate query options untuk findAndCountAll
 * Bisa handle:
 * - page, limit, sortBy, sortOrder
 * - filter otomatis berdasarkan query string
 * - filter rentang tanggal (start_date, end_date)
 */
export function buildQueryOptions(req, model, extraWhere = {}) {
    let { page = 1, limit = 10, sortBy, sortOrder, start_date, end_date } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    const offset = (page - 1) * limit;

    const where = { ...extraWhere };

    // 🔹 Ambil semua field yang ada di model
    const modelAttributes = Object.keys(model.rawAttributes);

    // 🔹 Loop semua query string → kalau match dengan field di model → jadikan filter
    for (const [key, value] of Object.entries(req.query)) {
        if (modelAttributes.includes(key)) {
            if (typeof value === "string" && value.includes("%")) {
                // LIKE query untuk pencarian partial
                where[key] = { [Op.like]: value };
            } else {
                where[key] = value;
            }
        }
    }

    // 🔹 Filter tanggal (pakai field tgl_simpan / tgl_daftar kalau ada di model)
    const dateField = modelAttributes.find(f => f.includes("tgl"));
    if (dateField) {
        if (start_date && end_date) {
            where[dateField] = { [Op.between]: [start_date, end_date] };
        } else if (start_date) {
            where[dateField] = { [Op.gte]: start_date };
        } else if (end_date) {
            where[dateField] = { [Op.lte]: end_date };
        }
    }

    return {
        where,
        limit,
        offset,
        order: [[sortBy || model.primaryKeyAttribute, sortOrder?.toUpperCase() || "ASC"]]
    };
}

/**
 * Format response pagination
 */
export function formatPagination(count, page, limit) {
    return {
        total: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        pageSize: limit
    };
}
