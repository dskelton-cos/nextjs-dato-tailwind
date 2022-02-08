import Link from "next/link";
import { Image } from 'react-datocms'

export default function ListPages({ pages}) {

  return (
    <div className="bg-white">
      <div className="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8">
          <div className="space-y-5 sm:space-y-4">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Meet our leadership</h2>
            <p className="text-xl text-gray-500">
              Libero fames augue nisl porttitor nisi, quis. Id ac elit odio vitae elementum enim vitae ullamcorper
              suspendisse. Vivamus fringilla.
            </p>
          </div>
          <div className="lg:col-span-2">
            <ul className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-12 sm:space-y-0 lg:gap-x-8">
              {pages.map((item) => (
                <li key={`nav-${item.id}`}>

                 <div className="flex items-center space-x-4 lg:space-x-6">
                 
                    <img className="w-16 h-16 rounded-full lg:w-20 lg:h-20" src={item.backgroundImage.responsiveImage.src} alt="" />
                    <div className="font-medium text-lg leading-6 space-y-1">
                      <h3 className="text-orange-600 hover:text-black">

                      <Link href={item.permalink}>
                      
                      <a>{item.title}</a>
                      </Link>
                    
                      
                      </h3>
                      <p>{item.location}</p>
                    </div>
                  </div>

                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
