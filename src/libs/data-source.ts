import 'reflect-metadata';
import { name_age } from 'src/entities/name_age';
import { DataSource } from "typeorm";

let dataSource:DataSource;

const getDatabaseConnection = async (): Promise<DataSource> =>{
    if(dataSource && dataSource.isInitialized){
    console.log('Already Connection Created! Using Same Connection!');
    return dataSource;
    }else{
    console.log('No DB Connection Found! Creating New Connection!');
    dataSource=new DataSource({
    type: 'postgres',
    host: 'database-1.c4m9ckjt8scx.us-east-1.rds.amazonaws.com',
    port: 5432,
    username: 'postgres',
    password: 'ROOTgrape8008!',
    database: 'testdb',
    entities: [name_age],
    connectTimeoutMS:30000,
    logging:false
    });

    return await dataSource.initialize().then(()=>{
    console.trace('New DB Created!');
    return dataSource;
    }).catch((e)=>{
    console.debug(e,'Error Occured in DB creation');
    throw new Error(e);
    });
    }
    }
export{getDatabaseConnection};
