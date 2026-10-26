import { box, type ProduceCategory } from '../content/site'

/**
 * Decorative placeholder artwork for a produce category tile. Real photography
 * isn't available, so we render an on-brand SVG derived from the category id.
 * Purely presentational — the accessible label lives on the tile heading.
 */
function CategoryArt({ id }: { id: ProduceCategory['id'] }) {
  return (
    <svg
      viewBox="0 0 200 160"
      role="presentation"
      aria-hidden="true"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="200" height="160" fill="#2f4a2a" />
      {id === 'greens' && (
        <g fill="#5f8f4e">
          <ellipse cx="100" cy="95" rx="30" ry="60" />
          <ellipse cx="70" cy="100" rx="22" ry="48" transform="rotate(-20 70 100)" />
          <ellipse cx="130" cy="100" rx="22" ry="48" transform="rotate(20 130 100)" />
        </g>
      )}
      {id === 'fruit' && (
        <g>
          <circle cx="80" cy="90" r="34" fill="#d98a3c" />
          <circle cx="128" cy="100" r="26" fill="#c0442f" />
          <circle cx="110" cy="70" r="18" fill="#e0a95a" />
        </g>
      )}
      {id === 'root' && (
        <g>
          <path d="M100 55 C120 70 116 130 100 140 C84 130 80 70 100 55 Z" fill="#c56a34" />
          <path d="M96 52 l -10 -22 M104 52 l 10 -22 M100 50 l 0 -26" stroke="#5f8f4e" strokeWidth="5" fill="none" />
        </g>
      )}
      {id === 'herbs' && (
        <g fill="#6fae55">
          <path d="M100 140 C80 110 82 70 100 40 C118 70 120 110 100 140 Z" />
          <path d="M100 40 L100 140" stroke="#3d5636" strokeWidth="3" />
        </g>
      )}
      {id === 'dairy' && (
        <g>
          <ellipse cx="80" cy="100" rx="26" ry="34" fill="#f0e6cf" />
          <ellipse cx="126" cy="104" rx="24" ry="30" fill="#e9dcbf" />
          <circle cx="80" cy="96" r="10" fill="#e0a95a" />
        </g>
      )}
      {id === 'pantry' && (
        <g fill="#d8c39a">
          <rect x="66" y="60" width="30" height="80" rx="6" />
          <rect x="104" y="72" width="30" height="68" rx="6" fill="#c9b183" />
          <rect x="66" y="60" width="30" height="14" rx="4" fill="#a9713f" />
          <rect x="104" y="72" width="30" height="14" rx="4" fill="#a9713f" />
        </g>
      )}
    </svg>
  )
}

/**
 * "What's in a box" section: a visual showcase of the produce categories a
 * typical delivery contains. Rendered on the deep-forest surface from the
 * reference, with each category as an image tile carrying a label overlay.
 */
export function WhatsInBox() {
  return (
    <section
      id="box"
      aria-labelledby="box-heading"
      className="mt-6 bg-[#263B22] py-[76px] text-cream"
    >
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8">
        <div className="mb-11 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mb-3 text-[14px] font-semibold uppercase tracking-[0.08em] text-[#E0A277]">
              {box.eyebrow}
            </p>
            <h2
              id="box-heading"
              className="max-w-[520px] font-display text-[32px] font-semibold leading-[1.08] tracking-[-0.02em] sm:text-[40px]"
            >
              {box.heading}
            </h2>
          </div>
          <p className="max-w-[340px] text-[16px] leading-[1.55] text-[#C7CFBE]">
            {box.intro}
          </p>
        </div>

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {box.categories.map((category) => (
            <li
              key={category.id}
              className="relative aspect-[5/4] overflow-hidden rounded-[18px] border border-[#3d5636]"
            >
              <CategoryArt id={category.id} />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[rgba(18,28,15,0.85)] to-transparent p-[18px]">
                <span className="font-display text-[22px] font-semibold text-cream">
                  {category.label}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
