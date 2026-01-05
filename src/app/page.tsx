import Link from "next/link"
import { ArrowRight, Code, Palette, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import db from "@/lib/prisma"

async function getFeaturedData() {
  const categories = await db.category.findMany({
    take: 3,
    orderBy: { tools: { _count: 'desc' } },
    include: { _count: { select: { tools: true } } }
  })

  const tools = await db.tool.findMany({
    take: 6,
    orderBy: { createdAt: 'desc' },
    include: { category: true }
  })

  return { categories, tools }
}

export default async function Home() {
  const { categories, tools } = await getFeaturedData()

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <Link
            href="/docs"
            className="rounded-2xl bg-surface0 px-4 py-1.5 text-sm font-medium transition-colors hover:bg-surface1"
          >
            Follow our progress on X
          </Link>
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-br from-text to-subtext1 bg-clip-text text-transparent">
            Open Learning & Free Tools
          </h1>
          <p className="max-w-[42rem] leading-normal text-subtext0 sm:text-xl sm:leading-8">
            Curated resources for developers, designers, and creators.
            Learn new skills and find the best free tools to build your next project.
          </p>
          <div className="space-x-4">
            <Link href="/tools">
              <Button size="lg">Browse Tools</Button>
            </Link>
            <Link href="/paths">
              <Button variant="outline" size="lg">Start Learning</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="container space-y-6 py-8 md:py-12 lg:py-24 bg-surface0/30 rounded-3xl my-8">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Categories
          </h2>
          <p className="max-w-[85%] leading-normal text-subtext0 sm:text-lg sm:leading-7">
            Explore resources by topic.
          </p>
        </div>
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          {categories.map((category) => (
            <Link key={category.id} href={`/tools?category=${category.slug}`}>
              <Card className="h-full hover:bg-surface0 transition-colors cursor-pointer border-surface1 bg-base">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {/* Icon placeholder logic */}
                    {category.icon === 'Code' && <Code className="h-5 w-5 text-blue" />}
                    {category.icon === 'Palette' && <Palette className="h-5 w-5 text-pink" />}
                    {category.icon === 'Zap' && <Zap className="h-5 w-5 text-yellow" />}
                    {!['Code', 'Palette', 'Zap'].includes(category.icon || '') && <Code className="h-5 w-5" />}
                    {category.name}
                  </CardTitle>
                  <CardDescription>{category._count.tools} tools</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-subtext0">{category.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent Tools Section */}
      <section id="tools" className="container space-y-6 py-8 md:py-12 lg:py-24">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Fresh Tools
          </h2>
          <p className="max-w-[85%] leading-normal text-subtext0 sm:text-lg sm:leading-7">
            The latest additions to our directory.
          </p>
        </div>
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          {tools.map((tool) => (
            <Card key={tool.id} className="flex flex-col justify-between bg-base border-surface1">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{tool.name}</CardTitle>
                  <Badge variant="secondary">{tool.pricing}</Badge>
                </div>
                <CardDescription>{tool.category.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-subtext0 line-clamp-2">{tool.description}</p>
              </CardContent>
              <CardFooter>
                <Link href={tool.url} target="_blank" className="text-sm text-blue hover:underline flex items-center gap-1">
                  Visit Website <ArrowRight className="h-4 w-4" />
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
