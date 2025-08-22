import { crud } from './baseController.js';
import { Pinjaman, Anggota, Angsuran } from '../models/index.js';

export default crud(Pinjaman, [
    { model: Anggota, as: "anggota" },
    { model: Angsuran, as: "angsuran" }
])