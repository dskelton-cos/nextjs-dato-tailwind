import { AnnotationIcon, GlobeAltIcon, LightningBoltIcon, MailIcon, ScaleIcon } from '@heroicons/react/outline'

const transferFeatures = [
  {
    id: 1,
    name: 'Site of the first Government House (now Museum of Sydney)',
    description:
      'It’s easy to spend a few hours exploring this site if you fancy a detour. This contemporary museum now sits on the site of Australia’s first Government House and offers a fascinating insight into the harbour city and its people.',
    icon: GlobeAltIcon,
  },
  {
    id: 2,
    name: 'Royal Botanic Garden',
    description:
      'One of the highlights of many a tourist and office worker’s lunch break, the garden offers a beautiful exploration into the flora and fauna of Gadigal land, with paths leading right down to the harbour’s edge. Make sure you see the Cadi Jam Ora Garden, a striking garden display surrounded by native vegetation with origins of around 200 years, and tells the story of Aboriginal cultural heritage. Or check out the recently opened Calyx while you’re here a contemporary theatre, art, and exhibition space with its striking white arbour architecture.',
    icon: ScaleIcon,
  },
  {
    id: 3,
    name: 'Bennelong Point',
    description:
      'Keeping it east side, Dubbagullee (or Bennelong Point as it’s commonly known) is home to the world-class Sydney Opera House. Take in the crisp, late afternoon air of the harbour while you learn the historical significance of this place. As the sun sets over those white sails, try one of the finest cuisines in Sydney at any of the bars and restaurants in the house, while you hashtag that requisite Instagram pic.',
    icon: LightningBoltIcon,
  },
]
const communicationFeatures = [
  {
    id: 1,
    name: 'Mobile notifications',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
    icon: AnnotationIcon,
  },
  {
    id: 2,
    name: 'Reminder emails',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
    icon: MailIcon,
  },
]

export default function Feature() {
  return (
    <div className="py-16 bg-gray-50 overflow-hidden lg:py-24">
      <div className="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">


        <div className="relative">
          <h2 className="text-center text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Celebrate the Year of the Tiger
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-center text-xl text-gray-500">
            Sydney Lunar Festival 2022 runs from 29 January to 13 February.

The Lunar Tour is a handy guide for what to see and do throughout the city.

Discover the full program of events on the official website
          </p>
        </div>

        <div className="relative mt-12 lg:mt-24 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
          <div className="relative">
            <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-3xl">
              Highlights
            </h3>

            <dl className="mt-10 space-y-10">
              {transferFeatures.map((item) => (
                <div key={item.id} className="relative">
                  <dt>
                    <p className="text-2xl font-medium text-gray-900">{item.name}</p>
                  </dt>
                  <dd className="mt-2 text-base text-gray-700">{item.description}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-10 -mx-4 relative lg:mt-0" aria-hidden="true">

            <img
              className="relative mx-auto"
              width={490}
              src="https://tailwindui.com/img/features/feature-example-1.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  )
}
