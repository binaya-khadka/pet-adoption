import React from "react"
import { Nav } from "../../components"

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