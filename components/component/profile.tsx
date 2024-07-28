"use client"

import React, { useState } from 'react';
import { signOut, useSession } from "next-auth/react";
import Link from "next/link"
import { UserRound } from "lucide-react";
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import Countries from "@/components/component/Countries"

interface CountriesProps {
    className?: string;
}

export default function Profile({ className }: CountriesProps) {
    const { data: session, status: sessionStatus, update } = useSession();

    const [formData, setFormData] = useState({
        country: session?.user?.country || '',
    });

    const [showChangeLocation, setShowChangeLocation] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/update-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ country: formData.country }),
            });

            if (!response.ok) {
                throw new Error('Failed to update user');
            }

            // Update the session
            await update({ country: formData.country });

            setShowChangeLocation(false);
        } catch (error) {
            console.error("Failed to update user:", error);
        }
    };

    if (sessionStatus === "loading") {
        return <div className="text-white">Loading...</div>;
    }

    return (
        <main className="flex-1 flex flex-col justify-center items-center gap-8">
            {session ? (
                <>
                    <div className="w-full max-w-sm p-6 text-white">
                        <section className="flex flex-col items-center justify-center gap-8">
                            <div className="text-center"><UserRound className="w-12 h-12" /></div>
                            <div className="flex flex-col items-center justify-center gap-2">
                                <h2 className="text-xl font-bold">Name</h2>
                                <p>{session.user?.name}</p>
                            </div>

                            <Separator className="trans-background" />

                            <div className="flex flex-col items-center justify-center gap-2">
                                <h2 className="text-xl font-bold">Email</h2>
                                <p>{session.user?.email}</p>
                            </div>

                            <Separator className="trans-background" />

                            <div className="flex flex-col items-center justify-center gap-2">
                                <h2 className="text-xl font-bold">Location</h2>
                                <p>{session.user?.country}</p>

                                <div>
                                    {!showChangeLocation ? (
                                        <Button
                                            className="w-full text-sm hover:scale-105 transition-all duration-100"
                                            onClick={() => setShowChangeLocation(true)}
                                        >
                                            Change location
                                        </Button>
                                    ) : (
                                        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                                            <select
                                                id="country"
                                                name="country"
                                                value={formData.country}
                                                onChange={handleChange}
                                                required
                                                className={`form-control rounded-full flex h-10 w-full border border-input bg-background p-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
                                            >
                                                <Countries />
                                            </select>

                                            <div className="flex justify-center items-center">
                                                <Button type="submit" className="transition all duration-100 hover:scale-110 text-md">
                                                    Submit
                                                </Button>
                                            </div>
                                        </form>
                                    )}
                                </div>
                            </div>
                        </section>
                    </div>

                    <div className="flex justify-center items-center text-white hover:scale-110 transition-all duration-100 hover:underline">
                        <Button onClick={() => signOut()}>
                            Sign Out
                        </Button>
                    </div>
                </>
            ) : (
                <div className='w-full max-w-sm p-6 text-white flex flex-col items-center justify-center gap-8'>
                    <h1 className="text-3xl text-center">
                        You are not connected...
                    </h1>
                    <Link href="/login" className="text-center hover:underline hover:scale-110">Please first login here</Link>
                </div>
            )}
        </main>
    )
}