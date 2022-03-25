export default function PageContent({content}) {
  return(
       <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">

          <div className="prose md:prose-lg lg:prose-xl mx-auto prose-headings:lg:text-6xl prose-headings:font-extrabold prose-headings:text-gray-900 prose-p:text-xl prose-p:text-gray-500 prose-r:max-w-xl prose-p:mt-5" dangerouslySetInnerHTML={{ __html: content }}></div>
        </div>
      </div>
    </div>
  )
    
}

