import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

const prismaClientSingleton = () => {
    let connectionString = process.env.DATABASE_URL

    // Fix: Remove channel_binding if present (not supported by node-postgres)
    if (connectionString && connectionString.includes('channel_binding')) {
        connectionString = connectionString.replace(/&channel_binding=[^&]+/, '').replace(/\?channel_binding=[^&]+&?/, '?')
    }

    const pool = new Pool({
        connectionString,
        ssl: connectionString?.includes('sslmode=require') ? true : (connectionString?.includes('sslmode=disable') ? false : undefined),
        max: 10 // recommended for serverless/lambdas
    })
    const adapter = new PrismaPg(pool)
    return new PrismaClient({ adapter })
}

declare global {
    var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
