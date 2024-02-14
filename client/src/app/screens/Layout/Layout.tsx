import React from "react"
import { Nav } from "@/app/components"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header>
        <Nav />
      </header>
      <main>
        {children}
      </main>
    </div>
  )
}