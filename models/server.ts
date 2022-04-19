import express, {Application} from 'express';
import userRoutes from '../routes/usuarios';
import cors from 'cors';
import db from '../db/connection';

class Server {
    private app: Application;
    private port: string;
    private apiPaths = {
        usuarios: '/api/usuarios'
    }

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '8000';

        this.dbConnection();
        this.middlewares();

        // definir rutas
        this.routes();
    }

    async dbConnection(){
        try{
            await db.authenticate();
            console.log("database online");
        }catch(error: any){
          throw new Error( error || 'Error en la conexión a la base de datos' );
        }
    }

    middlewares(){
        this.app.use(cors());

        this.app.use(express.json()); // lectura de body

        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.apiPaths.usuarios, userRoutes)
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Server on port' + this.port);
        })
    }
}

export default Server;