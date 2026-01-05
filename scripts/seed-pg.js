const { Client } = require('pg');
require('dotenv').config();

// Hardcoded for local dev seeding blocked by .env access issues
const connectionString = "postgres://postgres:postgres@localhost:51214/template1?sslmode=disable";

const client = new Client({
    connectionString: connectionString,
});

async function main() {
    try {
        await client.connect();
        console.log('Connected to database.');

        const fs = require('fs');
        const path = require('path');
        const sql = fs.readFileSync(path.join(__dirname, '../prisma/seed.sql'), 'utf8');

        await client.query(sql);
        console.log('Seed executed successfully.');
    } catch (err) {
        console.error('Error seeding database:', err);
        process.exit(1);
    } finally {
        await client.end();
    }
}

main();
