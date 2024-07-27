"use client"

import { MapPin } from "lucide-react";
import { useState, useEffect, useRef, useLayoutEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link"
import Image from "next/image"

import Clouds from "@/components/component/Clouds";

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const apiKey = "25874f614b60f4c03a3eed09ed7e800d";

  const { data: session, status } = useSession();

  const fetchWeather = useCallback(async (event: React.FormEvent<HTMLFormElement> | null, defaultCountry?: string) => {
    if (event) event.preventDefault();
    setHasSearched(true);
    setIsLoading(true);
    setShowContent(false);
    setContentHeight(0);

    const searchTerm = defaultCountry || searchInput;

    if (searchTerm.trim() === "") {
      setWeatherData(null);
      setIsLoading(false);
      return;
    }

    const capitalizedInput = searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1);

    try {
      const geocodeData = await getLonAndLat(capitalizedInput);
      if (geocodeData) {
        const weatherData = await getWeatherData(geocodeData.lon, geocodeData.lat);
        setWeatherData(weatherData);
      } else {
        setWeatherData(null);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setWeatherData(null);
    } finally {
      setIsLoading(false);
    }
  }, [apiKey, searchInput]);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.country) {
      setSearchInput(session.user.country);
      fetchWeather(null, session.user.country);
    }
  }, [status, session, fetchWeather]);

  useEffect(() => {
    if (weatherData || (hasSearched && !weatherData)) {
      setShowContent(true);
    }
  }, [weatherData, hasSearched]);

  useLayoutEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [weatherData, hasSearched]);

  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  async function getLonAndLat(searchInput: string): Promise<GeoCodeData | null> {
    const countryCode = 1;
    const geocodeURL = `https://api.openweathermap.org/geo/1.0/direct?q=${searchInput.replace(" ", "%20")},${countryCode}&limit=1&appid=${apiKey}`;

    try {
      const response = await fetch(geocodeURL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.length === 0) {
        return null;
      } else {
        return data[0];
      }
    } catch (error) {
      console.error("Error fetching location data:", error);
      return null;
    }
  }

  async function getWeatherData(lon: number, lat: number): Promise<WeatherData> {
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    const response = await fetch(weatherURL);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  }

  return (
    <div className="flex flex-col min-h-[100dvh] relative overflow-hidden">
      <Clouds />

      <header className="sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2" prefetch={false}>
            <CloudIcon className="w-6 h-6 trans-text" />
            <span className="text-lg font-medium trans-text">Weather App</span>
          </Link>

          {status === "authenticated" ? (
            <Link href="/profile" className="flex items-center gap-2 bg-muted px-4 py-1 rounded-3xl trans-border hover:scale-110 transition all duration-100" prefetch={false}>
              <span className="text-lg font-medium trans-text">Profile</span>
            </Link>
          ) : (
            <Link href="/register" className="flex items-center gap-2 bg-muted px-4 py-1 rounded-3xl trans-border hover:scale-110 transition all duration-100" prefetch={false}>
              <span className="text-lg font-medium trans-text">Sign Up</span>
            </Link>
          )}
        </div>
      </header>

      <main className="flex-1 flex justify-center items-center">
        <section className="container mx-auto px-4 py-12 md:py-24 flex flex-col items-center justify-center gap-8 animate-fade-in">
          <div className="flex flex-col justify-center items-center gap-2 rounded-3xl p-4 trans-background trans-border">
            <form onSubmit={(e) => fetchWeather(e)} className="flex items-center gap-2 rounded-3xl p-2 trans-border">
              <MapPin className="trans-text" />
              <input
                type="text"
                id="search"
                name="search"
                placeholder="Enter location"
                className="outline-none bg-background capitalize trans-text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
              />
              <button type="submit" disabled={isLoading}>
                {isLoading ? <Spinner /> : <SearchIcon className="trans-text" />}
              </button>
            </form>

            <div
              className={`transition-all duration-900 ease-in-out overflow-hidden`}
              style={{ height: showContent ? `${contentHeight}px` : '0px' }}
            >
              <div ref={contentRef} className={`transition-all duration-900 ease-in-out transform ${showContent ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
                {weatherData ? (
                  <div className="flex flex-col items-center justify-center gap-8">
                    <Image
                      src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                      alt={weatherData.weather[0].description}
                      width={150}
                      height={150}
                      className="weather-icon"
                    />
                    <div className="flex flex-col gap-2">
                      <h2 className="text-xl font-bold text-center trans-text">{weatherData.name}</h2>
                      <div className="text-center font-bold trans-text">
                        <p> {Math.round((weatherData.main.temp - 273.15) * 1.8 + 32)}°F / {Math.round(weatherData.main.temp - 273.15)}°C</p>
                        <p>{capitalizeFirstLetter(weatherData.weather[0].description)}</p>
                      </div>
                    </div>
                  </div>
                ) : hasSearched ? (
                  <div className="flex flex-col items-center justify-center">
                    <Image src="/404-notfound.png" alt="not-found" width={200} height={200} />
                    <h1 className="text-xl font-bold mt-4 trans-text">Oops. Location not found!</h1>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </section>
      </main>

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

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}

function Spinner({ size = 24 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="animate-spin"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  )
}

// Types
interface WeatherData {
  name: string;
  main: {
    temp: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
}

interface GeoCodeData {
  lon: number;
  lat: number;
}