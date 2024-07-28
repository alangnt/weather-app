"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import Countries from "./Countries"

import Link from "next/link"
import React, { useState } from 'react';

interface CountriesProps {
  className?: string;
}

export default function Register({ className }: CountriesProps) {
  const [submitted, setSubmitted] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitted(true);
        // Optionally, you can automatically sign in the user here
      } else {
        alert(data.error || 'Failed to register');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('An error occurred during registration. Please try again.');
    }
  };

  return (
    <main className="flex-1 flex justify-center items-center">
      {submitted ? (
        <div className='w-full max-w-sm p-6 text-white flex flex-col items-center justify-center gap-6'>
          <p className='text-3xl text-center'>Thank you for registering, {formData.name}!</p>

          <Link href="/login" className="text-center hover:underline hover:scale-110">Please login now</Link>
        </div>
      ) : (
        <div className="w-full max-w-sm p-6 text-white">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Register</h1>
            <p className="mt-2">Create your account to get started.</p>
          </div>

          <form className="mt-8 space-y-8 trans-text" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
              <Label htmlFor="name" className="text-md">Name</Label>
              <Input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
                className="rounded-full" />
            </div>

            <div className="flex flex-col gap-1">
              <Label htmlFor="country" className="text-md">Country</Label>
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
            </div>

            <div className="flex flex-col gap-1">
              <Label htmlFor="email" className="text-md">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="rounded-full" />
            </div>

            <div className="flex flex-col gap-1">
              <Label htmlFor="password" className="text-md">Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                className="rounded-full" />
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
      )}
    </main>
  )
}
