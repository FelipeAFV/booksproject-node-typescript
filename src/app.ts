import express from 'express';
const app = express();
import BooksRoutes from './routes/books-routes';
import AuthRoutes from './routes/auth';
import AuthorsRoutes from './routes/author-routes';
import UsersRoutes from './routes/user-routes';
import AuthMiddleware from './middlewares/token-auth';
const cookieParser = require('cookie-parser');
const cors = require('cors'); 

import { createConnection, getConnectionOptions} from "typeorm";


createConnection().then(() => {
    console.log('Connection successful')
}).catch((err) => {
    console.log('Connection error');
    console.log(err);
});

/**Middleware for cors policy*/
app.use(cors({
    credentials: true,
    origin: 'http://localhost:4200'
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.static(process.cwd()+"/frontend/dist/books-angular-node/"));


app.use('/', AuthRoutes)
app.use('/api', AuthMiddleware.checkAuth);
app.use('/api/books', BooksRoutes);
app.use('/api/authors', AuthorsRoutes);
app.use('/api/users', UsersRoutes);

app.get('*', (req,res) => {
    console.log('LA RUTA NO COINCIDE CON ALGUN PATH DEFINIDO');
    console.log('LA RUTA NO COINCIDE CON ALGUN PATH DEFINIDO');
    console.log('LA RUTA NO COINCIDE CON ALGUN PATH DEFINIDO');
    console.log(req.url);

    console.log('LA RUTA NO COINCIDE CON ALGUN PATH DEFINIDO');
    console.log('LA RUTA NO COINCIDE CON ALGUN PATH DEFINIDO');
    console.log('LA RUTA NO COINCIDE CON ALGUN PATH DEFINIDO');
    console.log('LA RUTA NO COINCIDE CON ALGUN PATH DEFINIDO');
    res.sendFile(process.cwd()+"/frontend/dist/books-angular-node/index.html")
  });

app.listen(5000, () => {
    console.log('Server listening on port 5000');
    console.log(process.env.MY_VAR);
})