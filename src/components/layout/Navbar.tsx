import Link from "next/link"
import { Monitor, BookOpen, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full border-b border-surface0 bg-base/95 backdrop-blur supports-[backdrop-filter]:bg-base/60">
            <div className="container flex h-14 items-center">
                <div className="mr-4 hidden md:flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <Monitor className="h-6 w-6 text-mauve" />
                        <span className="hidden font-bold sm:inline-block">Open Learning</span>
                    </Link>
                    <nav className="flex items-center space-x-6 text-sm font-medium">
                        <Link href="/tools" className="transition-colors hover:text-text/80 text-text/60">
                            Tools
                        </Link>
                        <Link href="/paths" className="transition-colors hover:text-text/80 text-text/60">
                            Learning Paths
                        </Link>
                    </nav>
                </div>
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <div className="w-full flex-1 md:w-auto md:flex-none">
                        {/* Search placeholder */}
                    </div>
                    <nav className="flex items-center">
                        <Link href="/login">
                            <Button variant="ghost" size="sm">
                                Login
                            </Button>
                        </Link>
                        {/* Mobile menu could go here */}
                    </nav>
                </div>
            </div>
        </nav>
    )
}
