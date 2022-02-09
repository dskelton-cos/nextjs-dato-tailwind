import { Image } from 'react-datocms';

export default function Hero({ title, intro, coverImage, slug }) {

  //console.log(coverImage)

  const image = (
    <Image
      data={{
        ...coverImage,
        alt: `Cover Image for ${title}`,
      }}
      layout="fill"
      objectFit="cover"
      objectPosition="50% 50%"
      className=""
    />
  );


  return (
    <div className="relative">
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gray-100" />
      <div className="w-full">
        <div className="relative shadow-xl sm:overflow-hidden">
          <div className="absolute inset-0">
            {image}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-800 to-transparent mix-blend-multiply" />
          </div>
          <div className="max-w-7xl mx-auto relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
            <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              <span className="block text-white">{title}</span>
              {slug === "index" && <span className="block text-orange-600">in your pocket</span>}
            </h1>
            <p className="mt-6 max-w-lg mx-auto text-center text-2xl text-white sm:max-w-3xl">
              {intro}
            </p>

            {slug === "index" && 
            <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
              <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
                <a
                  href="#"
                  className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-orange-600 bg-white hover:bg-orange-50 sm:px-8"
                >
                  App Store
                    </a>
                <a
                  href="#"
                  className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-orange-600  hover:bg-opacity-70 sm:px-8"
                >
                  Play Store
                    </a>
              </div>
            </div>
            }
          </div>
        </div>
      </div>
    </div>

  )
}