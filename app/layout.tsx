'use client';
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
      </head>
      <div className="m-auto">
        {children}
      </div>
    </html>
  )
}
