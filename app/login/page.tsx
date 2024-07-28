import Clouds from "@/components/component/Clouds";
import Login from "@/components/component/login";

import Link from "next/link";

export default function LoginPage() {
    return (
        <div className="flex flex-col min-h-[100dvh] relative overflow-hidden trans-background">
            <Clouds />

            <header className="sticky top-0 z-10">
                <div className="container mx-auto px-4 py-4 flex items-center justify-center">
                    <Link href="/" className="flex items-center gap-2" prefetch={false}>
                        <CloudIcon className="w-6 h-6 trans-text" />
                        <span className="text-lg font-medium trans-text">Weather App</span>
                    </Link>
                </div>
            </header>

            <Login />

            <footer className="bg-muted py-6">
                <div className="container mx-auto px-4 flex items-center justify-center">
                    <p className="text-sm trans-text">&copy; 2024 Weather App. All rights reserved.</p>
                </div>
            </footer>
        </div>
    )
}

function CloudIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
        </svg>
    )
}
