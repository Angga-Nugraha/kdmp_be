import { wrapAsync } from "../utils/wrapAsync.js";
import LogAktivitas from "../models/logAktivitas.js";
import { buildQueryOptions, formatPagination } from "../utils/queryOptions.js";

export const crud = (Model, include = [], pkName = Model.primaryKeyAttribute) => ({
    create: wrapAsync(async (req, res) => {
        const data = await Model.create(req.body);

        await LogAktivitas.create({
            id_user: req.session.user?.id_user,  // ambil dari session
            aksi: `Create ${Model.name} baru dengan ${pkName} ${data[pkName]}`,
            waktu: new Date()
        });

        res.status(201).json({
            status: true,
            message: "Data created successfully",
            data
        });
    }),
    findAll: wrapAsync(async (_req, res) => {
        const options = buildQueryOptions(_req, Model);

        const result = await Model.findAndCountAll({
            ...options,
            include
        });
        res.json({
            status: true,
            message: "Data retrieved successfully",
            data: result.rows,
            pagination: formatPagination(result.count, parseInt(_req.query.page) || 1, parseInt(_req.query.limit) || 10)
        });
    }),
    findOne: wrapAsync(async (req, res) => {
        const row = await Model.findByPk(req.params.id, { include });
        if (!row) throw { status: 404, message: "Not found" };
        res.json({
            status: true,
            message: "Data retrieved successfully",
            data: row
        });
    }),
    update: wrapAsync(async (req, res) => {
        const row = await Model.findByPk(req.params.id);
        if (!row) throw { status: 404, message: "Not found" };
        await row.update(req.body);

        await LogAktivitas.create({
            id_user: req.session.user?.id_user,
            aksi: `Update ${Model.name} dengan ${pkName} ${row[pkName]}`,
            waktu: new Date()
        });

        res.json({
            status: true,
            message: "Data updated successfully",
            data: row
        });
    }),
    destroy: wrapAsync(async (req, res) => {
        const row = await Model.findByPk(req.params.id);
        if (!row) throw { status: 404, message: "Not found" };
        await row.destroy();

        await LogAktivitas.create({
            id_user: req.session.user?.id_user,
            aksi: `Delete ${Model.name} dengan  ${pkName} ${row[pkName]}`,
            waktu: new Date()
        });

        res.json({
            status: true,
            message: "Data deleted successfully"
        });

    })
});
