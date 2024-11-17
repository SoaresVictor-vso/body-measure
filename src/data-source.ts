import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

if (!process.env.DB_HOST || !process.env.DB_PORT || !process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_NAME) {
  throw new Error('Faltando variáveis de ambiente para a conexão com o banco de dados.');
}

console.log({
    type: 'postgres',
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    synchronize: false,
    entities: [__dirname + '/**/*.entity{.js,.ts}'],
    migrations: [__dirname + '/migration/*{.js,.ts}'],
})
const dataSource = new DataSource({
    type: 'postgres',
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    synchronize: false,
    entities: [__dirname + '/**/*.entity{.js,.ts}'],
    migrations: [__dirname + '/migration/**/*.ts'],
});

dataSource.initialize().then(() => {
    console.log('DataSource inicializado com sucesso!');
  }).catch((err) => {
    console.error('Erro durante a inicialização do DataSource:', err);
  });
  
  export { dataSource };