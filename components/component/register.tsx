import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import Countries from "./Countries"

import Link from "next/link"

export default function Register() {
  return (
    <main className="flex-1 flex justify-center items-center">
      <div className="w-full max-w-md p-6 shadow-lg trans-background text-white trans-border rounded-3xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Register</h1>
          <p className="mt-2">Create your account to get started.</p>
        </div>

        <form className="mt-8 space-y-8 trans-text">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name" className="text-md">Name</Label>
            <Input id="name" type="text" placeholder="Enter your name" required className="rounded-full" />
          </div>

          <div className="flex flex-col gap-2">
            <Countries />
          </div>

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
              Register
            </Button>
          </div>
        </form>

        <div className="flex justify-center items-center">
          <Link href="/login" className="text-sm text-primary hover:underline">Already have an account? Login instead</Link>
        </div>
      </div>
    </main>
  )
}
