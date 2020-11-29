import mongoose from 'mongoose';

class dataBase {

    private _cadenaConexion: string = 'mongodb+srv://user1:user1@cluster0.mtqa2.mongodb.net/test1?retryWrites=true&w=majority'
    constructor() {

    }
    set cadenaConexion(_cadenaConexion: string) {
        this._cadenaConexion = _cadenaConexion
    }

    conectarBD = async () => {
        const promise = new Promise<string>( async (resolve, reject) => {
            await mongoose.connect(this._cadenaConexion, {
                useNewUrlParser: true, 
                useUnifiedTopology: true, 
                useCreateIndex: true,   // Para que cree el índice único asociado al campo unique
                useFindAndModify: false  // para usar findOneAndDelete y findAndModify (comporbar true o false)
            })
            .then( () => resolve(`Conectado a ${this._cadenaConexion}`) )
            .catch( (error) => reject(`Error conectando a ${this._cadenaConexion}: ${error}`) )     
        })
        return promise

    }

    desconectarBD = async () => {

        const promise = new Promise<string>( async (resolve, reject) => {
            await mongoose.disconnect() 
            .then( () => resolve(`Desconectado de ${this._cadenaConexion}`) )
            .catch( (error) => reject(`Error desconectando de ${this._cadenaConexion}: ${error}`) )     
        })
        return promise
    }
}

export const db = new dataBase()