import Link from "next/link";
export default function ListPages({ pages }) {

  return (
    <ul>

      {pages.map((item) => (
        <li key={`nav-${item.id}`}>
          <Link href={`/${encodeURIComponent(item.permalink)}`}>
            <a className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">{item.title}</a>
          </Link>
        </li>
      )

      )}
    </ul>
  )
}