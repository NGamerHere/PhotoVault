import {Client} from "pg";

const client=new Client({
    user:'postgres',
    password:'password',
    host:'localhost',
    port:5432,
    database:'photovault'
})

export default client;