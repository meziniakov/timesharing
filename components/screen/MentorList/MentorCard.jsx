import Image from 'next/image'
import Link from 'next/link'

export default function MentorCard({ mentor }) {
  console.log(mentor)
  return (
    <div className="w-full sm:w-1/2 md:w-1/2 xl:w-1/3 p-6">
      <Link
        href={{
          pathname: `/mentor/${mentor._id}`,
          // query: { id:  },
        }}
      >
        <a
          key={mentor.id}
          className="c-card block bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden"
        >
          <div className="relative overflow-hidden">
            <Image
              src={mentor.img || '/vercel.svg'}
              className="absolute inset-0 w-full object-cover"
              width={500}
              height={300}
              alt={''}
            />
          </div>
          <div className="p-4">
            <span className="inline-block px-2 py-1 leading-none bg-orange-200 text-orange-800 rounded-full font-semibold uppercase tracking-wide text-xs">
              {/* {mentor.category.name} */}
            </span>
            <h2 className="mt-2 mb-2  font-bold">{mentor.name}</h2>
            <p className="text-sm">{mentor.job?.split('@')[0]}</p>
            <div className="mt-3 flex items-center">
              <span className="font-bold text-xl">
                {mentor.job?.split('@')[1]}
              </span>
              &nbsp;
            </div>
            <div className="mt-3 flex items-center">
              {/* <span className="font-bold text-xl">{mentor.ageRestriction}</span> */}
              &nbsp;
              <span className="text-sm font-semibold">+</span>
            </div>
          </div>
        </a>
      </Link>
    </div>
  )
}
