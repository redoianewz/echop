import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import Footer from './_components/_footer/footer'
import Header from './_components/_header/header'
import { ClerkProvider } from '@clerk/nextjs'

const poppins = Poppins({
  subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Chop now',
  description: 'this app is for chopping now',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return ( 
    
    <html lang="en">
      <body className={poppins.className}>
        <ClerkProvider>
        <div
          className="flex flex-col min-h-screen"
          style={{ backgroundColor: '#f2f2f2' }}
        >
        
          <Header /><hr/>
          <main>{children}</main><hr />
          <Footer />
       
        </div>
        </ClerkProvider>
      </body>
    </html>
    
  )
}
