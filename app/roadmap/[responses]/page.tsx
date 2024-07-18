import RoadmapPage from '@/components/Responses/Response'
import Footer from '@/components/landing-page/Footer'
import { FloatingNav } from '@/components/ui/FloatingNavbar'
import { navItems } from '@/data'
import React from 'react'

const page = () => {
  return (
    <main className="relative flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className=" w-full">
        <FloatingNav navItems={navItems}/>
      <RoadmapPage/>
      <Footer/>
    </div>
    </main>
  )
}

export default page
