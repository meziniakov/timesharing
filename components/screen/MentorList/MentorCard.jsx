import Image from 'next/image'
import Link from 'next/link'

export default function MentorCard({ mentor }) {
  return (
    <div className="w-full sm:w-1/2 md:w-1/2 xl:w-1/3 p-6">
      <div className="c-card block bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden">
        <Link
          href={{
            pathname: `/mentor/${mentor._id}`,
            // query: { id:  },
          }}
        >
          <a key={mentor.id}>
            <div className="relative overflow-hidden">
              <Image
                src={'/img/getmentor/' + mentor.image || '/vercel.svg'}
                className="absolute inset-0 w-full object-cover"
                width={500}
                height={300}
                alt={''}
              />
            </div>
          </a>
        </Link>
        <div className="p-4">
          <div className="mb-3">
            <h2 className="mt-2 mb-2 text-2xl font-bold">
              {mentor.firstname} {mentor.lastname}
            </h2>
            <span>
              {mentor.job[0].substring(
                mentor.job[0].lastIndexOf('@') + 1,
                mentor.job[0].length
              )}
            </span>
          </div>
          <div className="inline-flex w-full">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </span>
            <span className="text-sm">
              {mentor.job[0].substring(0, mentor.job[0].lastIndexOf('@'))}
            </span>
          </div>
          <div className="inline-flex w-full">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                />
              </svg>
            </span>
            {mentor.skills ? mentor.skills.join(', ') : null}
          </div>
        </div>
      </div>
    </div>
  )
}
