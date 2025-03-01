"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "../../ui/navbar-menu";
import { cn } from "@/lib/utils";

export function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2" />
      <p className="text-black dark:text-white">
        The Navbar will show on top of the page
      </p>
    </div>
  );
}

export function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn("fixed z-50 top-0 inset-x-0  mx-auto ", className)}
    >
        
        
      <Menu  setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="Dashboard">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/dashboard">Dashboard</HoveredLink>
            {/* <HoveredLink href="/interface-design">Interface Design</HoveredLink>
            <HoveredLink href="/seo">Search Engine Optimization</HoveredLink>
            <HoveredLink href="/branding">Branding</HoveredLink> */}
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="About">
          <div className="  text-sm grid  gap-10 p-4">
            <ProductItem
              title="About"
              href="/about"
              src="/about us.webp"
              description="Learn more about our Website done by Aman_n_rwt."
            />
          
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Articles">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/articles">View All Articles</HoveredLink>
            
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}
