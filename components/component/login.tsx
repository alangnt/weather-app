import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import Link from "next/link"

export default function Login() {
    return (
        <main className="flex-1 flex justify-center items-center">
            <div className="w-full max-w-md p-6 shadow-lg trans-background text-white trans-border rounded-3xl">
                <div className="text-center">
                    <h1 className="text-3xl font-bold">Login</h1>
                    <p className="mt-2">Login to your account.</p>
                </div>

                <form className="mt-8 space-y-8 trans-text">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="email" className="text-md">Email</Label>
                        <Input id="email" type="email" placeholder="Enter your email" required className="rounded-full" />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="password" className="text-md">Password</Label>
                        <Input id="password" type="password" placeholder="Enter your password" required className="rounded-full" />
                    </div>

                    <div className="flex justify-center items-center">
                        <Button type="submit" className="transition all duration-100 hover:scale-110 text-md">
                            Login
                        </Button>
                    </div>
                </form>

                <div className="flex justify-center items-center">
                    <Link href="/register" className="text-sm text-primary hover:underline">Don&apos;t have an account ? Register one</Link>
                </div>
            </div>
        </main>
    )
}
