import {Client} from "pg";

const client=new Client({
    user:'datta',
    password:'1234',
    host:'localhost',
    port:5432,
    database:'photovault'
})

export default client;