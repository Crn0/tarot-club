#! /usr/bin/env node
import 'dotenv/config';
import pg from 'pg';
import tables from './queries/tables/index.js';

const { Client } = pg;

async function createTables(client) {
    await Promise.all([
        tables.user(client),
        tables.authentication(client),
        tables.comment(client),
        tables.userAuth(client),
        tables.userComment(client),
    ]);
}

// async function populateTables(client) {
//     const user = await 
// }

async function main() {
    console.log('seeding...');
    const client = new Client({ connectionString: process.env.LOCAL_URL });
    await client.connect();

    await createTables(client);

    await client.end();
    console.log('done');
}

main();