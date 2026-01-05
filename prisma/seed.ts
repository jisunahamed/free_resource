import { PricingType, DifficultyLevel } from '@prisma/client'
import prisma from '../src/lib/prisma'
import 'dotenv/config'

async function main() {
    // 1. Clean up existing data
    await prisma.guide.deleteMany()
    await prisma.learningPath.deleteMany()
    await prisma.tool.deleteMany()
    await prisma.category.deleteMany()

    console.log('Deleted existing data.')

    // 2. Create Categories
    const devCategory = await prisma.category.create({
        data: {
            name: 'Development',
            slug: 'development',
            description: 'Tools for software development.',
            icon: 'Code',
        },
    })

    const designCategory = await prisma.category.create({
        data: {
            name: 'Design',
            slug: 'design',
            description: 'Tools for UI/UX and graphic design.',
            icon: 'Palette',
        },
    })

    const productivityCategory = await prisma.category.create({
        data: {
            name: 'Productivity',
            slug: 'productivity',
            description: 'Tools to boost your workflow.',
            icon: 'Zap',
        },
    })

    // 3. Create Tools
    const vsCode = await prisma.tool.create({
        data: {
            name: 'VS Code',
            slug: 'vs-code',
            description: 'Code editing. Redefined.',
            url: 'https://code.visualstudio.com/',
            pricing: PricingType.FREE,
            categoryId: devCategory.id,
            features: ['IntelliSense', 'Run and Debug', 'Built-in Git'],
        },
    })

    const figma = await prisma.tool.create({
        data: {
            name: 'Figma',
            slug: 'figma',
            description: 'The collaborative interface design tool.',
            url: 'https://figma.com',
            pricing: PricingType.FREEMIUM,
            categoryId: designCategory.id,
            features: ['Multiplayer', 'Vector networks', 'Auto Layout'],
        },
    })

    const notion = await prisma.tool.create({
        data: {
            name: 'Notion',
            slug: 'notion',
            description: 'All-in-one workspace.',
            url: 'https://notion.so',
            pricing: PricingType.FREEMIUM,
            categoryId: productivityCategory.id,
            features: ['Notes', 'Docs', 'Wikis', 'Projects'],
        },
    })

    // 4. Create Learning Path
    const webDevPath = await prisma.learningPath.create({
        data: {
            title: 'Web Development Zero to Hero',
            slug: 'web-dev-zero-to-hero',
            description: 'Master modern web development from scratch.',
            difficulty: DifficultyLevel.BEGINNER,
        },
    })

    // 5. Create Guides
    await prisma.guide.create({
        data: {
            title: 'Setting up your Environment',
            slug: 'setting-up-environment',
            content: '# Setup\n\nInstall VS Code and Node.js.',
            order: 1,
            learningPathId: webDevPath.id,
            toolId: vsCode.id,
        },
    })

    console.log('Seeding finished.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
