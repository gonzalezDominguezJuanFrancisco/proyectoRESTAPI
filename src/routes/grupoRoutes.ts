import {query, Request, Response, Router} from 'express'
import {Grupo, Grupos} from '../models/Grupo'
import {Miembro} from '../models/Miembro'
import {Cancion} from '../models/Cancion'
import {db} from '../database/database'

class GrupoRoutes {
    private _router: Router

    constructor() {
        this._router = Router()
    }
    get router(){
        return this._router
    }

    private getGrupos = async (req: Request, res: Response) => {
        res.json("Bienvenidos a mi proyecto RESTAPI")
    }

    private verGrupo = async (req: Request, res: Response) => {
        const {grupo} = req.params
        await db.conectarBD()
        const g1: any = await Grupos.findOne({_nombre: grupo})
        res.json(g1)
        await db.desconectarBD()
    }

    private mostrarGrupos = async (req: Request, res: Response) => {
        await db.conectarBD()
        type g = {
            nombre: String,
            info: String
        }
        let gru: any
        let query: any
        let aG: Array<g> = new Array()
        query = await Grupos.find({})
        for (gru of query) {
            let miembros: Array<Miembro> = new Array()
            for (let m of gru._miembros) {
                let am = new Miembro(m._nombre, m._apodo, m._fechaNacimiento, m._puesto)
                miembros.push(am)
            }
            let canciones: Array<Cancion> = new Array()
            for (let c of gru._canciones) {
                let ac = new Cancion(c._nombre, c._duracion, c._likes, c._fechaSalida, c._genero, c._topVentas)
                canciones.push(ac)
            }
            let g = new Grupo(gru._nombre, gru._fechaCreacion, canciones, miembros)
            const ig: g = {
                nombre: g.nombre, 
                info: g.verGrupo()
            }
            aG.push(ig)
        }
        res.json(aG)
        await db.desconectarBD()
    }

    private crearGrupo = async (req: Request, res: Response) => {
        const {nombreG, fechaCreacionG} = req.params
        const canciones: Array<Cancion> = new Array
        const miembros: Array<Miembro> = new Array
        const g1 = new Grupo(nombreG, new Date(fechaCreacionG), canciones, miembros)
        console.log(g1)
        await db.conectarBD()
        const dSchema = {
            _nombre: g1.nombre,
            _fechaCreacion: g1.fechaCreacion,
            _canciones: g1.canciones,
            _miembros: g1.miembros
        }
        const oSchema = new Grupos(dSchema)
        await oSchema.save()
            .then( (doc) => res.send(doc))
            .catch( (err: any) => res.send("Error: " + err)) 
        await db.desconectarBD()
    }

    private duraMedia = async (req: Request, res: Response) => {
        await db.conectarBD()
        type g = {
            nombre: String,
            duracionMedia: String
        }
        let gru: any
        let query: any
        let aG: Array<g> = new Array()
        query = await Grupos.find({})
        for (gru of query) {
            let miembros: Array<Miembro> = new Array()
            for (let m of gru._miembros) {
                let am = new Miembro(m._nombre, m._apodo, m._fechaNacimiento, m._puesto)
                miembros.push(am)
            }
            let canciones: Array<Cancion> = new Array()
            for (let c of gru._canciones) {
                let ac = new Cancion(c._nombre, c._duracion, c._likes, c._fechaSalida, c._genero, c._topVentas)
                canciones.push(ac)
            }
            let g = new Grupo(gru._nombre, gru._fechaCreacion, canciones, miembros)
            const ig: g = {
                nombre: g.nombre, 
                duracionMedia: g.duraMedia()
            }
            aG.push(ig)
        }
        res.json(aG)
        await db.desconectarBD()
    }

    private edMedia = async (req: Request, res: Response) => {
        await db.conectarBD()
        type g = {
            nombre: String,
            edadMedia: Number
        }
        let gru: any
        let query: any
        let aG: Array<g> = new Array()
        query = await Grupos.find({})
        for (gru of query) {
            let miembros: Array<Miembro> = new Array()
            for (let m of gru._miembros) {
                let am = new Miembro(m._nombre, m._apodo, m._fechaNacimiento, m._puesto)
                miembros.push(am)
            }
            let canciones: Array<Cancion> = new Array()
            for (let c of gru._canciones) {
                let ac = new Cancion(c._nombre, c._duracion, c._likes, c._fechaSalida, c._genero, c._topVentas)
                canciones.push(ac)
            }
            let g = new Grupo(gru._nombre, gru._fechaCreacion, canciones, miembros)
            const ig: g = {
                nombre: g.nombre,
                edadMedia : g.edadMedia()
            }
            aG.push(ig)
        }
        res.json(aG)
        await db.desconectarBD()
    }

    private uneMiembro = async (req: Request, res: Response) => {
        const {grupo, nombre, apodo, fechaNacimiento, puesto} = req.params
        const m = new Miembro(nombre, apodo, new Date(fechaNacimiento), puesto)
        await db.conectarBD()
        const gru: any = await Grupos.findOne({_nombre: grupo})
        if (gru == null) {
            res.send("No existe el grupo")
        } else {
            let miembros: Array<Miembro> = new Array()
            for (let m of gru._miembros) {
                let am = new Miembro(m._nombre, m._apodo, m._fechaNacimiento, m._puesto)
                miembros.push(am)
            }
            let canciones: Array<Cancion> = new Array()
            for (let c of gru._canciones) {
                let ac = new Cancion(c._nombre, c._duracion, c._likes, c._fechaSalida, c._genero, c._topVentas)
                canciones.push(ac)
            }
            miembros.push(m)
            let g = new Grupo(gru._nombre, gru._fechaCreacion, canciones, miembros)
            await Grupos.findOneAndUpdate(
                {_nombre: g.nombre},
                {
                    _nombre: g.nombre,
                    _fechaCreacion: g.fechaCreacion,
                    _canciones: g.canciones,
                    _miembros: g.miembros
                }, {
                    new: true,
                    runValidators: true  
                }
            )
            .then((doc)=> res.json(doc))
            .catch((error)=> res.send(error))
            await db.desconectarBD()
        }
    }

    private uneCancion = async (req: Request, res: Response) => {
        const {grupo, nombre, duracion, likes, fechaSalida, genero, topVentas} = req.params
        const c = new Cancion(nombre, parseInt(duracion), parseInt(likes), new Date(fechaSalida), genero, Boolean(topVentas))
        await db.conectarBD()
        const gru: any = await Grupos.findOne({_nombre: grupo})
        if (gru == null) {
            res.send("No existe el grupo")
        } else {
            let miembros: Array<Miembro> = new Array()
            for (let m of gru._miembros) {
                let am = new Miembro(m._nombre, m._apodo, m._fechaNacimiento, m._puesto)
                miembros.push(am)
            }
            let canciones: Array<Cancion> = new Array()
            for (let c of gru._canciones) {
                let ac = new Cancion(c._nombre, c._duracion, c._likes, c._fechaSalida, c._genero, c._topVentas)
                canciones.push(ac)
            }
            canciones.push(c)
            let g = new Grupo(gru._nombre, gru._fechaCreacion, canciones, miembros)
            await Grupos.findOneAndUpdate(
                {_nombre: g.nombre},
                {
                    _nombre: g.nombre,
                    _fechaCreacion: g.fechaCreacion,
                    _canciones: g.canciones,
                    _miembros: g.miembros
                }, {
                    new: true,
                    runValidators: true  
                }
            )
            .then((doc)=> res.json(doc))
            .catch((error)=> res.send(error))
            await db.desconectarBD()
        }
    }

    private edadMiembro = async (req: Request, res: Response) => {
        const {grupo, nombreM} = req.params
        console.log(grupo, nombreM)
        await db.conectarBD()
        const gru: any = await Grupos.findOne({_nombre: grupo})
        if (gru == null) {
            res.send("No existe el grupo")
        } else {
            let miembros: Array<Miembro> = new Array()
            for (let m of gru._miembros) {
                let am = new Miembro(m._nombre, m._apodo, m._fechaNacimiento, m._puesto)
                miembros.push(am)
            }
            let canciones: Array<Cancion> = new Array()
            for (let c of gru._canciones) {
                let ac = new Cancion(c._nombre, c._duracion, c._likes, c._fechaSalida, c._genero, c._topVentas)
                canciones.push(ac)
            }
            let g = new Grupo(gru._nombre, gru._fechaCreacion, canciones, miembros)
            if (g.Edad(nombreM) == 0) {
                res.json("El miembro no existe")
            } else {
                res.json("Nombre: " + nombreM + ", Edad: " + g.Edad(nombreM))
            }
        }
        await db.desconectarBD()
    }

    private verTop = async (req: Request, res: Response) => {
        const {grupo} = req.params
        await db.conectarBD()
        const gru: any = await Grupos.findOne({_nombre: grupo})
        if (gru == null) {
            res.send("No existe el grupo")
        } else {
            let miembros: Array<Miembro> = new Array()
            for (let m of gru._miembros) {
                let am = new Miembro(m._nombre, m._apodo, m._fechaNacimiento, m._puesto)
                miembros.push(am)
            }
            let canciones: Array<Cancion> = new Array()
            for (let c of gru._canciones) {
                let ac = new Cancion(c._nombre, c._duracion, c._likes, c._fechaSalida, c._genero, c._topVentas)
                canciones.push(ac)
            }
            let g = new Grupo(gru._nombre, gru._fechaCreacion, canciones, miembros)
            let can: Array<Cancion> = new Array()
            for (let c1 of g.canciones) {
                if (!c1.topVentas){
                    can.push(c1)
                }
            }
            res.json(can)
        }
        await db.desconectarBD()
    }
    
    private salidaCancion = async (req: Request, res: Response) => {
        const {grupo, cancion} = req.params
        await db.conectarBD()
        const gru: any = await Grupos.findOne({_nombre: grupo})
        if (gru == null) {
            res.send("No existe el grupo")
        } else {
            let miembros: Array<Miembro> = new Array()
            for (let m of gru._miembros) {
                let am = new Miembro(m._nombre, m._apodo, m._fechaNacimiento, m._puesto)
                miembros.push(am)
            }
            let canciones: Array<Cancion> = new Array()
            for (let c of gru._canciones) {
                let ac = new Cancion(c._nombre, c._duracion, c._likes, c._fechaSalida, c._genero, c._topVentas)
                canciones.push(ac)
            }
            let g = new Grupo(gru._nombre, gru._fechaCreacion, canciones, miembros)
            for (let c of g.canciones) {
                if (c.nombre == cancion) {
                    let mili = c.salida()
                    let ano = 0
                    let mes = 0
                    let dia = 0
                    while (mili > 0) {
                        if (mili >= 31556900000) {
                            mili = mili - 31556900000
                            ano++
                        }
                        if (mili < 3155690000 || mili >= 2629750000) {
                            mili = mili - 2629750000
                            mes++
                            if (mes == 12) {
                                ano++
                                mes = 0
                            }
                        }
                        if (mili < 2629750000 || mili >= 86400000) {
                            mili = mili - 86400000
                            dia++
                        }
                    }
                    res.json("La cancion salio hace " + ano + " año/s, " + mes + " mes/es, y " + dia + " dia/s")
                }
            }
        }
        await db.desconectarBD()
    }

    private editCancion = async (req: Request, res: Response) => {
        const {grupo, nombre, duracion, likes, fechaSalida, genero, topVentas} = req.params
        await db.conectarBD()
        const gru: any = await Grupos.findOne({_nombre: grupo})
        if (gru == null) {
            res.send("No existe el grupo")
        } else {
            let miembros: Array<Miembro> = new Array()
            for (let m of gru._miembros) {
                let am = new Miembro(m._nombre, m._apodo, m._fechaNacimiento, m._puesto)
                miembros.push(am)
            }
            let canciones: Array<Cancion> = new Array()
            for (let c of gru._canciones) {
                let ac = new Cancion(c._nombre, c._duracion, c._likes, c._fechaSalida, c._genero, c._topVentas)
                canciones.push(ac)
            }
            for (let c of canciones) {
                if (c.nombre == nombre) {
                    c.nombre = nombre
                    c.duracion = parseFloat(duracion)
                    c.likes = parseInt(likes)
                    c.fechaSalida = new Date(fechaSalida)
                    c.genero = genero
                    c.topVentas = Boolean(topVentas)
                }
            }
            let g = new Grupo(gru._nombre, gru._fechaCreacion, canciones, miembros)
            await Grupos.findOneAndUpdate(
                {_nombre: g.nombre},
                {
                    _nombre: g.nombre,
                    _fechaCreacion: g.fechaCreacion,
                    _canciones: g.canciones,
                    _miembros: g.miembros
                },
                {
                    new:true,
                    runValidators:true  
                }
            )
            .then((doc)=> res.json(doc))
            .catch((error)=> res.send(error))
        }
        await db.desconectarBD()
    }

    private borrar = async (req: Request, res: Response) => {
        const {grupo} = req.params
        await db.conectarBD()
        await Grupos.findOneAndDelete(
            { _nombre: grupo}, 
            (err: any, doc) => {
                if(err) console.log(err)
                else{
                    if (doc == null) {
                        res.send("No encontrado")
                    }else {
                        res.send("Borrado: " + doc)
                    }
                }
            })
        db.desconectarBD()
    }

    rutas() {
        this._router.get('/', this.getGrupos)
        this._router.get('/vGrupo/:grupo', this.verGrupo)
        this._router.get('/mGrupos', this.mostrarGrupos)
        this._router.get('/cGrupo/:nombreG&:fechaCreacionG', this.crearGrupo)
        this._router.get('/dMedia', this.duraMedia)
        this._router.get('/eMedia', this.edMedia)
        this._router.get('/uMiembro/:grupo&:nombre&:apodo&:fechaNacimiento&:puesto', this.uneMiembro)
        this._router.get('/uCancion/:grupo&:nombre&:duracion&:likes&:fechaSalida&:genero&:topVentas', this.uneCancion)
        this._router.get('/eMiembro/:grupo&:nombreM', this.edadMiembro)
        this._router.get('/vTop/:grupo', this.verTop)
        this._router.get('/sCancion/:grupo&:cancion', this.salidaCancion)
        this._router.get('/eCancion/:grupo&:nombre&:duracion&:likes&:fechaSalida&:genero&:topVentas', this.editCancion)
        this._router.get('/borrar/:grupo', this.borrar)
    }
}

const obj = new GrupoRoutes()
obj.rutas()
export const grupoRoutes = obj.router