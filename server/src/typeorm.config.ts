import {DataSource} from "typeorm";
import CONNECTION from "./db.connection";

// @ts-ignore
const AppDataSource = new DataSource({
    ...CONNECTION,
    entities:["*/**/*.entity.ts"],
    migrations:["src/migrations/*.ts"]
})

AppDataSource.initialize()
    .then(()=>{
        console.log('data source has been init')
    })
    .catch((err) => {
        console.log('error data source: ', err)
    })

export default AppDataSource;
