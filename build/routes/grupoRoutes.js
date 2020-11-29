"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.grupoRoutes = void 0;
const express_1 = require("express");
const Grupo_1 = require("../models/Grupo");
const Miembro_1 = require("../models/Miembro");
const Cancion_1 = require("../models/Cancion");
const database_1 = require("../database/database");
class GrupoRoutes {
    constructor() {
        this.getGrupos = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db.conectarBD()
                .then((mensaje) => __awaiter(this, void 0, void 0, function* () {
                const query = yield Grupo_1.Grupos.find();
                res.json(query);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            yield database_1.db.desconectarBD();
        });
        this.verGrupo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { grupo } = req.params;
            yield database_1.db.conectarBD();
            const g1 = yield Grupo_1.Grupos.findOne({ _nombre: grupo });
            res.json(g1);
            yield database_1.db.desconectarBD();
        });
        this.mostrarGrupos = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db.conectarBD();
            let gru;
            let query;
            let aG = new Array();
            query = yield Grupo_1.Grupos.find({});
            for (gru of query) {
                let miembros = new Array();
                for (let m of gru._miembros) {
                    let am = new Miembro_1.Miembro(m._nombre, m._apodo, m._fechaNacimiento, m._puesto);
                    miembros.push(am);
                }
                let canciones = new Array();
                for (let c of gru._canciones) {
                    let ac = new Cancion_1.Cancion(c._nombre, c._duracion, c._likes, c._fechaSalida, c._genero, c._topVentas);
                    canciones.push(ac);
                }
                let g = new Grupo_1.Grupo(gru._nombre, gru._fechaCreacion, canciones, miembros);
                const ig = {
                    nombre: g.nombre,
                    info: g.verGrupo()
                };
                aG.push(ig);
            }
            res.json(aG);
            yield database_1.db.desconectarBD();
        });
        this.crearGrupo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { nombreG, fechaCreacionG } = req.params;
            const canciones = new Array;
            const miembros = new Array;
            const g1 = new Grupo_1.Grupo(nombreG, new Date(fechaCreacionG), canciones, miembros);
            console.log(g1);
            yield database_1.db.conectarBD();
            const dSchema = {
                _nombre: g1.nombre,
                _fechaCreacion: g1.fechaCreacion,
                _canciones: g1.canciones,
                _miembros: g1.miembros
            };
            const oSchema = new Grupo_1.Grupos(dSchema);
            yield oSchema.save()
                .then((doc) => res.send(doc))
                .catch((err) => res.send("Error: " + err));
            yield database_1.db.desconectarBD();
        });
        this.duraMedia = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db.conectarBD();
            let gru;
            let query;
            let aG = new Array();
            query = yield Grupo_1.Grupos.find({});
            for (gru of query) {
                let miembros = new Array();
                for (let m of gru._miembros) {
                    let am = new Miembro_1.Miembro(m._nombre, m._apodo, m._fechaNacimiento, m._puesto);
                    miembros.push(am);
                }
                let canciones = new Array();
                for (let c of gru._canciones) {
                    let ac = new Cancion_1.Cancion(c._nombre, c._duracion, c._likes, c._fechaSalida, c._genero, c._topVentas);
                    canciones.push(ac);
                }
                let g = new Grupo_1.Grupo(gru._nombre, gru._fechaCreacion, canciones, miembros);
                const ig = {
                    nombre: g.nombre,
                    duracionMedia: g.duraMedia()
                };
                aG.push(ig);
            }
            res.json(aG);
            yield database_1.db.desconectarBD();
        });
        this.edMedia = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db.conectarBD();
            let gru;
            let query;
            let aG = new Array();
            query = yield Grupo_1.Grupos.find({});
            for (gru of query) {
                let miembros = new Array();
                for (let m of gru._miembros) {
                    let am = new Miembro_1.Miembro(m._nombre, m._apodo, m._fechaNacimiento, m._puesto);
                    miembros.push(am);
                }
                let canciones = new Array();
                for (let c of gru._canciones) {
                    let ac = new Cancion_1.Cancion(c._nombre, c._duracion, c._likes, c._fechaSalida, c._genero, c._topVentas);
                    canciones.push(ac);
                }
                let g = new Grupo_1.Grupo(gru._nombre, gru._fechaCreacion, canciones, miembros);
                const ig = {
                    nombre: g.nombre,
                    edadMedia: g.edadMedia()
                };
                aG.push(ig);
            }
            res.json(aG);
            yield database_1.db.desconectarBD();
        });
        this.uneMiembro = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { grupo, nombre, apodo, fechaNacimiento, puesto } = req.params;
            const m = new Miembro_1.Miembro(nombre, apodo, new Date(fechaNacimiento), puesto);
            yield database_1.db.conectarBD();
            const gru = yield Grupo_1.Grupos.findOne({ _nombre: grupo });
            if (gru == null) {
                res.send("No existe el grupo");
            }
            else {
                let miembros = new Array();
                for (let m of gru._miembros) {
                    let am = new Miembro_1.Miembro(m._nombre, m._apodo, m._fechaNacimiento, m._puesto);
                    miembros.push(am);
                }
                let canciones = new Array();
                for (let c of gru._canciones) {
                    let ac = new Cancion_1.Cancion(c._nombre, c._duracion, c._likes, c._fechaSalida, c._genero, c._topVentas);
                    canciones.push(ac);
                }
                miembros.push(m);
                let g = new Grupo_1.Grupo(gru._nombre, gru._fechaCreacion, canciones, miembros);
                yield Grupo_1.Grupos.findOneAndUpdate({ _nombre: g.nombre }, {
                    _nombre: g.nombre,
                    _fechaCreacion: g.fechaCreacion,
                    _canciones: g.canciones,
                    _miembros: g.miembros
                }, {
                    new: true,
                    runValidators: true
                })
                    .then((doc) => res.json(doc))
                    .catch((error) => res.send(error));
                yield database_1.db.desconectarBD();
            }
        });
        this.uneCancion = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { grupo, nombre, duracion, likes, fechaSalida, genero, topVentas } = req.params;
            const c = new Cancion_1.Cancion(nombre, parseInt(duracion), parseInt(likes), new Date(fechaSalida), genero, Boolean(topVentas));
            yield database_1.db.conectarBD();
            const gru = yield Grupo_1.Grupos.findOne({ _nombre: grupo });
            if (gru == null) {
                res.send("No existe el grupo");
            }
            else {
                let miembros = new Array();
                for (let m of gru._miembros) {
                    let am = new Miembro_1.Miembro(m._nombre, m._apodo, m._fechaNacimiento, m._puesto);
                    miembros.push(am);
                }
                let canciones = new Array();
                for (let c of gru._canciones) {
                    let ac = new Cancion_1.Cancion(c._nombre, c._duracion, c._likes, c._fechaSalida, c._genero, c._topVentas);
                    canciones.push(ac);
                }
                canciones.push(c);
                let g = new Grupo_1.Grupo(gru._nombre, gru._fechaCreacion, canciones, miembros);
                yield Grupo_1.Grupos.findOneAndUpdate({ _nombre: g.nombre }, {
                    _nombre: g.nombre,
                    _fechaCreacion: g.fechaCreacion,
                    _canciones: g.canciones,
                    _miembros: g.miembros
                }, {
                    new: true,
                    runValidators: true
                })
                    .then((doc) => res.json(doc))
                    .catch((error) => res.send(error));
                yield database_1.db.desconectarBD();
            }
        });
        this.edadMiembro = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { grupo, nombreM } = req.params;
            console.log(grupo, nombreM);
            yield database_1.db.conectarBD();
            const gru = yield Grupo_1.Grupos.findOne({ _nombre: grupo });
            if (gru == null) {
                res.send("No existe el grupo");
            }
            else {
                let miembros = new Array();
                for (let m of gru._miembros) {
                    let am = new Miembro_1.Miembro(m._nombre, m._apodo, m._fechaNacimiento, m._puesto);
                    miembros.push(am);
                }
                let canciones = new Array();
                for (let c of gru._canciones) {
                    let ac = new Cancion_1.Cancion(c._nombre, c._duracion, c._likes, c._fechaSalida, c._genero, c._topVentas);
                    canciones.push(ac);
                }
                let g = new Grupo_1.Grupo(gru._nombre, gru._fechaCreacion, canciones, miembros);
                if (g.Edad(nombreM) == 0) {
                    res.json("El miembro no existe");
                }
                else {
                    res.json("Nombre: " + nombreM + ", Edad: " + g.Edad(nombreM));
                }
            }
            yield database_1.db.desconectarBD();
        });
        this.verTop = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { grupo } = req.params;
            yield database_1.db.conectarBD();
            const gru = yield Grupo_1.Grupos.findOne({ _nombre: grupo });
            if (gru == null) {
                res.send("No existe el grupo");
            }
            else {
                let miembros = new Array();
                for (let m of gru._miembros) {
                    let am = new Miembro_1.Miembro(m._nombre, m._apodo, m._fechaNacimiento, m._puesto);
                    miembros.push(am);
                }
                let canciones = new Array();
                for (let c of gru._canciones) {
                    let ac = new Cancion_1.Cancion(c._nombre, c._duracion, c._likes, c._fechaSalida, c._genero, c._topVentas);
                    canciones.push(ac);
                }
                let g = new Grupo_1.Grupo(gru._nombre, gru._fechaCreacion, canciones, miembros);
                let can = new Array();
                for (let c1 of g.canciones) {
                    if (!c1.topVentas) {
                        can.push(c1);
                    }
                }
                res.json(can);
            }
            yield database_1.db.desconectarBD();
        });
        this.salidaCancion = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { grupo, cancion } = req.params;
            yield database_1.db.conectarBD();
            const gru = yield Grupo_1.Grupos.findOne({ _nombre: grupo });
            if (gru == null) {
                res.send("No existe el grupo");
            }
            else {
                let miembros = new Array();
                for (let m of gru._miembros) {
                    let am = new Miembro_1.Miembro(m._nombre, m._apodo, m._fechaNacimiento, m._puesto);
                    miembros.push(am);
                }
                let canciones = new Array();
                for (let c of gru._canciones) {
                    let ac = new Cancion_1.Cancion(c._nombre, c._duracion, c._likes, c._fechaSalida, c._genero, c._topVentas);
                    canciones.push(ac);
                }
                let g = new Grupo_1.Grupo(gru._nombre, gru._fechaCreacion, canciones, miembros);
                for (let c of g.canciones) {
                    if (c.nombre == cancion) {
                        let mili = c.salida();
                        let ano = 0;
                        let mes = 0;
                        let dia = 0;
                        while (mili > 0) {
                            if (mili >= 31556900000) {
                                mili = mili - 31556900000;
                                ano++;
                            }
                            if (mili < 3155690000 || mili >= 2629750000) {
                                mili = mili - 2629750000;
                                mes++;
                                if (mes == 12) {
                                    ano++;
                                    mes = 0;
                                }
                            }
                            if (mili < 2629750000 || mili >= 86400000) {
                                mili = mili - 86400000;
                                dia++;
                            }
                        }
                        res.json("La cancion salio hace " + ano + " año/s, " + mes + " mes/es, y " + dia + " dia/s");
                    }
                }
            }
            yield database_1.db.desconectarBD();
        });
        this.editCancion = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { grupo, nombre, duracion, likes, fechaSalida, genero, topVentas } = req.params;
            yield database_1.db.conectarBD();
            const gru = yield Grupo_1.Grupos.findOne({ _nombre: grupo });
            if (gru == null) {
                res.send("No existe el grupo");
            }
            else {
                let miembros = new Array();
                for (let m of gru._miembros) {
                    let am = new Miembro_1.Miembro(m._nombre, m._apodo, m._fechaNacimiento, m._puesto);
                    miembros.push(am);
                }
                let canciones = new Array();
                for (let c of gru._canciones) {
                    let ac = new Cancion_1.Cancion(c._nombre, c._duracion, c._likes, c._fechaSalida, c._genero, c._topVentas);
                    canciones.push(ac);
                }
                for (let c of canciones) {
                    if (c.nombre == nombre) {
                        c.nombre = nombre;
                        c.duracion = parseFloat(duracion);
                        c.likes = parseInt(likes);
                        c.fechaSalida = new Date(fechaSalida);
                        c.genero = genero;
                        c.topVentas = Boolean(topVentas);
                    }
                }
                let g = new Grupo_1.Grupo(gru._nombre, gru._fechaCreacion, canciones, miembros);
                yield Grupo_1.Grupos.findOneAndUpdate({ _nombre: g.nombre }, {
                    _nombre: g.nombre,
                    _fechaCreacion: g.fechaCreacion,
                    _canciones: g.canciones,
                    _miembros: g.miembros
                }, {
                    new: true,
                    runValidators: true
                })
                    .then((doc) => res.json(doc))
                    .catch((error) => res.send(error));
            }
            yield database_1.db.desconectarBD();
        });
        this.borrar = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { grupo } = req.params;
            yield database_1.db.conectarBD();
            yield Grupo_1.Grupos.findOneAndDelete({ _nombre: grupo }, (err, doc) => {
                if (err)
                    console.log(err);
                else {
                    if (doc == null) {
                        res.send("No encontrado");
                    }
                    else {
                        res.send("Borrado: " + doc);
                    }
                }
            });
            database_1.db.desconectarBD();
        });
        this._router = express_1.Router();
    }
    get router() {
        return this._router;
    }
    rutas() {
        this._router.get('/', this.getGrupos);
        this._router.get('/vGrupo/:grupo', this.verGrupo);
        this._router.get('/mGrupos', this.mostrarGrupos);
        this._router.get('/cGrupo/:nombreG&:fechaCreacionG', this.crearGrupo);
        this._router.get('/dMedia', this.duraMedia);
        this._router.get('/edMedia', this.edMedia);
        this._router.get('/uMiembro/:grupo&:nombre&:apodo&:fechaNacimiento&:puesto', this.uneMiembro);
        this._router.get('/uCancion/:grupo&:nombre&:duracion&:likes&:fechaSalida&:genero&:topVentas', this.uneCancion);
        this._router.get('/edMiembro/:grupo&:nombreM', this.edadMiembro);
        this._router.get('/vTop/:grupo', this.verTop);
        this._router.get('/sCancion/:grupo&:cancion', this.salidaCancion);
        this._router.get('/eCancion/:grupo&:nombre&:duracion&:likes&:fechaSalida&:genero&:topVentas', this.editCancion);
        this._router.get('/borrar/:grupo', this.borrar);
    }
}
const obj = new GrupoRoutes();
obj.rutas();
exports.grupoRoutes = obj.router;
