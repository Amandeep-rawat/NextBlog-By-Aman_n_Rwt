import BlogFooter from "@/components/home/BlogFooter";
import { Navbar } from "@/components/home/header/Navbar";
import Hero from "@/components/home/hero/Hero";
import TopArticles from "@/components/home/top-articles";
import { Button } from "@/components/ui/button";
// import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default function Home() {
 return(
  <main className="">

  <Navbar className="" />
  <Hero/>
  <section className="relative min-h-screen py-2 ">
    <div className="container mx-auto px-4">
    <div className="text-center py-8">
    <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-xl">Featured Articles</h2>
    <p>Discover our most popular and trending content</p>

    </div>
    <Suspense fallback={<div>Loading......</div>}>

  <TopArticles/>
    </Suspense>
                <div className="text-center mt-8">

            <Link href={"/articles"}>
            <Button className="rounded-full dark:bg-white"> View all articles</Button>
            </Link>
                </div>
        </div>    
  </section>
  <BlogFooter/>
  </main>
 )
}
