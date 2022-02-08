import { Image } from 'react-datocms'

/* This example requires Tailwind CSS v2.0+ */
export default function PageHeader({title, intro, coverImage}) {
  const image = (
    <Image
      data={{
        ...coverImage,
        alt: `Cover Image for ${title}`,
      }}
      className="w-full h-full object-cover"
    />
  )

  return (
    <div className="relative bg-indigo-800">
      <div className="absolute inset-0">
        {image}
        <div className="absolute inset-0 bg-gray-500 mix-blend-multiply" aria-hidden="true" />
      </div>
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">{title}</h1>
        {intro ? <p className="mt-6 text-xl text-indigo-100 max-w-3xl" dangerouslySetInnerHTML={{ __html: intro }}></p> : null }
        
      </div>
    </div>
  )
}
