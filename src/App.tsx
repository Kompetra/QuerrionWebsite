import {
  type CSSProperties,
  type FormEvent,
  useEffect,
  useState,
} from "react"

type Page = "home" | "products" | "demo"

const productLinks = [
  "Search results",
  "Keywords",
  "Ads",
  "AI answers",
  "Delivery options",
]

function ArrowIcon({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20">
      <path d={diagonal ? "M5 15 15 5M7 5h8v8" : "M3 10h13m-5-5 5 5-5 5"} />
    </svg>
  )
}

function DatabaseIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <ellipse cx="12" cy="6" rx="8" ry="3" />
      <path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
    </svg>
  )
}

function App() {
  const getPage = (): Page => {
    if (location.pathname.startsWith("/data-products")) return "products"
    if (location.pathname.startsWith("/book-a-demo")) return "demo"
    return "home"
  }
  const [page, setPage] = useState<Page>(getPage)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onPop = () => setPage(getPage())
    addEventListener("popstate", onPop)
    return () => removeEventListener("popstate", onPop)
  }, [])

  useEffect(() => {
    const elements = document.querySelectorAll(
      ".section, .built-for, .closing, .dataset, .roadmap-grid article",
    )
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 },
    )
    elements.forEach((element) => {
      element.classList.add("motion-in")
      observer.observe(element)
    })
    return () => observer.disconnect()
  }, [page])

  const navigate = (next: Page) => {
    const path =
      next === "home"
        ? "/"
        : next === "products"
          ? "/data-products"
          : "/book-a-demo"
    history.pushState({}, "", path)
    setPage(next)
    setMenuOpen(false)
    scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="app-shell">
      <Header
        page={page}
        navigate={navigate}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />
      <main>
        {page === "home" ? (
          <Home navigate={navigate} />
        ) : page === "products" ? (
          <Products navigate={navigate} />
        ) : (
          <Demo />
        )}
      </main>
      <Footer navigate={navigate} />
    </div>
  )
}

function Header({
  page,
  navigate,
  menuOpen,
  setMenuOpen,
}: {
  page: Page
  navigate: (page: Page) => void
  menuOpen: boolean
  setMenuOpen: (value: boolean) => void
}) {
  return (
    <header className="site-header">
      <div className="nav-wrap">
        <button
          className="brand"
          onClick={() => navigate("home")}
          aria-label="Querrion home"
        >
          <span className="brand-mark">
            <span />
            <span />
            <span />
          </span>
          <span>QUERRION</span>
        </button>
        <nav
          className={menuOpen ? "main-nav open" : "main-nav"}
          aria-label="Main navigation"
        >
          <button
            className={page === "products" ? "active" : ""}
            onClick={() => navigate("products")}
          >
            Data products
          </button>
          <a href="https://portal.querrion.com">
            Log in <ArrowIcon diagonal />
          </a>
          <button
            className="button button-small button-dark"
            onClick={() => navigate("demo")}
          >
            Book a demo <ArrowIcon />
          </button>
        </nav>
        <button
          className="menu-button"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}

function Footer({ navigate }: { navigate: (page: Page) => void }) {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <button
            className="brand brand-light"
            onClick={() => navigate("home")}
          >
            <span className="brand-mark">
              <span />
              <span />
              <span />
            </span>
            <span>QUERRION</span>
          </button>
          <p>
            Connected visibility data,
            <br />
            built to outlast the source.
          </p>
        </div>
        <div className="footer-column">
          <span className="eyebrow">Product</span>
          {productLinks.map((link, i) => (
            <button key={link} onClick={() => navigate("products")}>
              {link}
              {i === 4 && <ArrowIcon />}
            </button>
          ))}
        </div>
        <div className="footer-column">
          <span className="eyebrow">Company</span>
          <button onClick={() => navigate("demo")}>Book a demo</button>
          <a href="mailto:hello@querrion.com">Contact</a>
        </div>
        <div className="footer-column">
          <span className="eyebrow">Legal</span>
          <a href="#terms">Terms of Service</a>
          <a href="#privacy">Privacy Policy</a>
          <a href="#acceptable-use">Acceptable Use Policy</a>
          <a href="#takedown">Takedown &amp; Removal</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          © 2026 Kompetra Labs LLC. Querrion is a product of Kompetra Labs LLC.
        </p>
        <p className="system-status">
          <span /> Systems operational
        </p>
      </div>
    </footer>
  )
}

function SectionTitle({
  index,
  title,
  copy,
}: {
  index: string
  title: string
  copy?: string
}) {
  return (
    <div className="section-heading">
      <span className="section-index">{index}</span>
      <div>
        <h2>{title}</h2>
        {copy && <p>{copy}</p>}
      </div>
    </div>
  )
}

function Home({ navigate }: { navigate: (page: Page) => void }) {
  const sources = [
    ["01", "Search results", "Position #2", "“running shoes”"],
    ["02", "Keywords", "Who ranks", "Who advertises"],
    ["03", "Ads", "Video · Meta", "94 days · 3 placements"],
    ["04", "AI answers", "Mentioned", "1 citation"],
  ]
  const products = [
    [
      "Search results",
      "Organic rankings, paid ads and local results for any keyword and location, tracked over time.",
      "SERP",
    ],
    [
      "Keywords",
      "Who ranks and who advertises on each keyword, and how that changes day to day.",
      "KEY",
    ],
    [
      "Ads",
      "Ad creatives with real run dates, formats, placements and calls to action, with media stored so it never breaks.",
      "ADS",
    ],
    [
      "AI answers",
      "What large language models say when people ask about your category, and which brands they mention and cite.",
      "LLM",
    ],
  ]
  const messy = [
    [
      "Template text like {{product.name}} in ad copy",
      "The real copy for every version of a dynamic ad",
    ],
    [
      "Image and video links that expire within days",
      "Media stored permanently on our side",
    ],
    [
      "A snapshot that disappears when ads stop",
      "History kept from the day we first see a record",
    ],
    ["Duplicates of the same creative", "Creatives grouped, with reuse counts"],
    [
      "Page names that hide who’s advertising",
      "Advertisers linked to their real brand and domain",
    ],
    ["Loose keyword matches", "A relevance flag on every result"],
  ]
  const fields = [
    [
      "Run time",
      "How long an ad has been live: the best public stand-in for performance.",
    ],
    [
      "Creative reuse",
      "How many ads share one creative, a sign a brand is scaling a winner.",
    ],
    [
      "Placement mix",
      "Where each ad runs, from Facebook and Instagram to Threads and WhatsApp.",
    ],
    [
      "Proxy advertisers",
      "Flags for affiliate and persona pages advertising on behalf of a brand.",
    ],
    [
      "Ranking movement",
      "Position changes for every tracked keyword and domain.",
    ],
  ]
  return (
    <>
      <section className="hero">
        <div className="hero-ambient" aria-hidden="true">
          <span className="ambient-ring ambient-ring-one" />
          <span className="ambient-ring ambient-ring-two" />
          <span className="ambient-glow" />
        </div>
        <div className="hero-grid">
          <div className="hero-copy reveal">
            <div className="pill">
              <span /> Connected visibility data
            </div>
            <h1 aria-label="Search, ads and AI answers. One clean dataset.">
              <span>Search, ads and AI answers.</span>
              <span>
                One <em>clean</em> dataset.
              </span>
            </h1>
            <p>
              Querrion cleans and connects search results, keyword, ad and LLM
              response data, and keeps the history. Build your product on it
              through one API.
            </p>
            <div className="hero-actions">
              <button
                className="button button-lime"
                onClick={() => navigate("demo")}
              >
                Book a demo <ArrowIcon />
              </button>
              <button
                className="text-link"
                onClick={() => navigate("products")}
              >
                Explore the data <ArrowIcon />
              </button>
            </div>
          </div>
          <RecordGraphic sources={sources} />
        </div>
        <div className="scroll-cue" aria-hidden="true">
          <span>Scroll to explore</span>
          <i />
        </div>
        <div className="hero-proof">
          <span>BUILT FOR DATA PRODUCTS</span>
          <i />
          <span>HISTORY FROM FIRST SEEN</span>
          <i />
          <span>API + BULK DELIVERY</span>
        </div>
      </section>

      <section className="section paper">
        <div className="container">
          <SectionTitle
            index="01"
            title="One source for brand visibility data"
          />
          <div className="product-grid">
            {products.map(([title, copy, code], i) => (
              <article className="product-card" key={title}>
                <div className="card-top">
                  <span>{code}</span>
                  <span>0{i + 1}</span>
                </div>
                <div className="signal-icon">
                  <span />
                  <span />
                  <span className={i > 1 ? "lit" : ""} />
                  <span />
                  <span className="lit" />
                </div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
          <button className="inline-cta" onClick={() => navigate("products")}>
            See every field and dataset <ArrowIcon />
          </button>
        </div>
      </section>

      <section className="section dark-section">
        <div className="container">
          <SectionTitle
            index="02"
            title="Raw data isn’t usable data"
            copy="Raw ad and search data is messy, short-lived and hard to connect. Making it usable takes months of engineering. We’ve done that work."
          />
          <div className="comparison">
            <div className="comparison-head">
              <span>What raw data gives you</span>
              <span>What Querrion gives you instead</span>
            </div>
            {messy.map(([raw, clean], i) => (
              <div className="comparison-row" key={raw}>
                <div>
                  <span className="row-number">0{i + 1}</span>
                  {raw}
                </div>
                <div>
                  <span className="check">✓</span>
                  {clean}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section fields-section">
        <div className="container two-col-intro">
          <SectionTitle
            index="03"
            title="Fields you’d otherwise have to build"
            copy="Signals, not just records. Each one is computed and kept up to date for you."
          />
          <div className="field-list">
            {fields.map(([name, copy], i) => (
              <div className="field-row" key={name}>
                <span>0{i + 1}</span>
                <div>
                  <h3>{name}</h3>
                  <p>{copy}</p>
                </div>
                <div className="field-spark">
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <i
                      key={n}
                      style={{ height: `${16 + ((n * 11 + i * 9) % 31)}px` }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section paper delivery-section">
        <div className="container">
          <SectionTitle index="04" title="Delivered the way your team works" />
          <div className="delivery-grid">
            <article>
              <DatabaseIcon />
              <span className="card-label">Query</span>
              <h3>REST API</h3>
              <p>Query by keyword, advertiser, domain or record ID.</p>
              <code>GET /v1/visibility</code>
            </article>
            <article>
              <DatabaseIcon />
              <span className="card-label">Sync</span>
              <h3>Bulk delivery</h3>
              <p>Daily or weekly files to your S3, BigQuery or Snowflake.</p>
              <code>S3 · BQ · SNOWFLAKE</code>
            </article>
            <article>
              <DatabaseIcon />
              <span className="card-label">License</span>
              <h3>Built to embed</h3>
              <p>
                Licensed for display inside your own product, with clear
                attribution rules.
              </p>
              <code>PRODUCT-READY</code>
            </article>
          </div>
        </div>
      </section>

      <section className="built-for">
        <div className="container">
          <span className="section-index">05</span>
          <h2>
            Built for teams who turn
            <br />
            data into decisions.
          </h2>
          <div className="audience-grid">
            <div>
              <span>01</span>
              <h3>Product teams</h3>
              <p>Building SEO, ad intelligence and brand monitoring tools.</p>
            </div>
            <div>
              <span>02</span>
              <h3>Agencies and brands</h3>
              <p>Feeding competitive data into their own dashboards.</p>
            </div>
            <div>
              <span>03</span>
              <h3>Research and investment</h3>
              <p>Tracking ad and search activity as a market signal.</p>
            </div>
          </div>
        </div>
      </section>

      <Closing
        navigate={navigate}
        title="See the data on your own keywords"
        copy="In a 30-minute demo we’ll pull live data for keywords and brands you choose, and walk through the API. Qualified teams get 14 days of trial access afterwards."
      />
    </>
  )
}

function RecordGraphic({ sources }: { sources: string[][] }) {
  return (
    <div className="record-graphic reveal">
      <div className="graphic-top">
        <span>LIVE ENTITY GRAPH</span>
        <span className="live">
          <i /> LIVE RECORD
        </span>
      </div>
      <div className="map-canvas">
        <div className="map-grid" aria-hidden="true" />
        <div className="brand-node">
          <span className="node-pulse" aria-hidden="true" />
          <div className="shoe-mark">Q</div>
          <div>
            <strong>Example Running Co.</strong>
            <span>example-running.com</span>
          </div>
          <b>ENTITY MATCHED</b>
        </div>
        <div className="flow-trunk" aria-hidden="true">
          <i />
        </div>
        <div className="source-grid">
          {sources.map(([n, title, line1, line2], index) => (
            <div
              className="source-card"
              style={
                { "--source-delay": `${0.65 + index * 0.1}s` } as CSSProperties
              }
              key={title}
            >
              <span className="source-status">
                <i /> {n}
              </span>
              <h4>{title}</h4>
              <strong>{line1}</strong>
              <small>{line2}</small>
            </div>
          ))}
        </div>
        <div className="flow-rail" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
      </div>
      <div className="graphic-note">
        <span>Illustrative record</span>
        <b>Different sources</b>
        <b>One verified domain</b>
        <b>History kept</b>
      </div>
    </div>
  )
}

function Closing({
  navigate,
  title,
  copy,
}: {
  navigate: (page: Page) => void
  title: string
  copy: string
}) {
  return (
    <section className="closing">
      <div className="orbit orbit-one" />
      <div className="orbit orbit-two" />
      <div className="closing-content">
        <span className="eyebrow">Your data, live</span>
        <h2>{title}</h2>
        <p>{copy}</p>
        <button className="button button-lime" onClick={() => navigate("demo")}>
          Book a demo <ArrowIcon />
        </button>
        <small>No sales deck. Just your data and our API.</small>
      </div>
    </section>
  )
}

const currentDatasets = [
  {
    title: "Search results",
    code: "SERP",
    intro:
      "Full search results pages for the keywords and locations you choose, captured on a schedule and kept over time.",
    included:
      "Organic results (title, URL, snippet, position), paid ads (headline, description, display URL, sitelinks, position), local and map results, featured snippets and other result features.",
    added:
      "Position history per domain, new and dropped results, advertisers linked to brands.",
    note: "Country, language and device per keyword.",
  },
  {
    title: "Keywords",
    code: "KEY",
    intro:
      "The competitive picture for every keyword: who ranks, who advertises and how that’s changing.",
    included:
      "Ranking domains, advertising brands, ad copy per keyword, search result features present.",
    added:
      "Competitor counts, ranking movement, and gaps where competitors advertise and a brand doesn’t.",
  },
  {
    title: "Ads",
    code: "ADS",
    intro:
      "Ad creatives with the context raw ad data leaves out: real run dates, every version of dynamic ads, and media that doesn’t expire.",
    included:
      "Advertiser, copy and headline, format, call to action, landing page, placements, start and end dates, active status.",
    added:
      "Run time in days, real copy for template ads, creatives grouped with reuse counts, permanently stored media, keyword relevance flag.",
    note: "Launch channels: Meta and Google search ads. Spend, impressions and targeting are not available because platforms don’t publish them—and we won’t estimate them as fact.",
  },
  {
    title: "AI answers",
    code: "LLM",
    intro:
      "What AI assistants say about your category, captured from the same prompts over time, so you can see how answers change.",
    included:
      "Prompt, model, full response text, brands mentioned, sources cited, capture date.",
    added:
      "Brand mention and citation counts, share of answers per brand, changes between captures.",
  },
  {
    title: "Advertisers",
    code: "ENT",
    intro:
      "The connecting layer across all datasets: one record per brand, linking its domain, ad pages and social accounts.",
    included:
      "Brand name, domain, ad page IDs, Instagram handle, page category and audience size, verification status.",
    added:
      "Proxy and affiliate page flags, and agencies and parent companies where platforms disclose who paid.",
  },
]

function Products({ navigate }: { navigate: (page: Page) => void }) {
  const roadmap = [
    [
      "Commerce and pricing",
      "Product prices, availability and catalogue changes on brand and retailer sites, tracked over time.",
      "Product name, price, discounts, availability, catalogue changes, marketplace rankings.",
      "Pricing and merchandising teams, retail analytics tools, and investors.",
    ],
    [
      "Company data",
      "Company-level profiles linked to the brands and domains in every other dataset.",
      "Company name, domains, industry, locations, technology and funding events. No personal contact details.",
      "Sales and market-intelligence tools, CRM enrichment, and research teams.",
    ],
    [
      "Jobs",
      "Job postings by company, role and location: a leading signal of where companies are investing.",
      "Job title, function, seniority, location, posting and removal dates, hiring volume.",
      "HR tech platforms, workforce analytics, and investors.",
    ],
    [
      "Public records",
      "Business registries, patents, trademarks, government tenders and SEC filings, cleaned and linked.",
      "Registration status, IP filings, tender notices and awards, filing metadata.",
      "Legal, compliance, procurement and investment teams.",
    ],
    [
      "App stores",
      "App rankings, ratings and releases across the major app stores.",
      "Category and keyword rankings, ratings over time, release notes and version history.",
      "Mobile growth teams, app intelligence tools, and investors.",
    ],
  ]
  return (
    <>
      <section className="products-hero">
        <div className="products-hero-grid container">
          <div className="products-hero-copy">
            <div className="pill">
              <span /> Dataset catalogue · 2026
            </div>
            <h1>
              The data,
              <br />
              <em>field by field.</em>
            </h1>
            <p>
              Four datasets at launch and five more on the way, all linked by
              brand and domain, with history kept from the day we first see each
              record.
            </p>
            <button
              className="button button-dark"
              onClick={() => navigate("demo")}
            >
              See your data live <ArrowIcon />
            </button>
          </div>
          <div className="catalog-monitor">
            <div className="monitor-head">
              <span>QUERRION / DATA CATALOGUE</span>
              <span className="live">
                <i /> LIVE
              </span>
            </div>
            <div className="monitor-entity">
              <span className="entity-mark">Q</span>
              <div>
                <small>CONNECTING LAYER</small>
                <strong>Brand + domain entity</strong>
              </div>
              <code>01</code>
            </div>
            <div className="monitor-flow" aria-hidden="true">
              <span />
              <i />
            </div>
            <div className="monitor-list">
              {currentDatasets.slice(0, 4).map((item, index) => (
                <div
                  key={item.code}
                  style={
                    {
                      "--monitor-delay": `${0.2 + index * 0.12}s`,
                    } as CSSProperties
                  }
                >
                  <span>0{index + 1}</span>
                  <b>{item.code}</b>
                  <strong>{item.title}</strong>
                  <i />
                </div>
              ))}
            </div>
            <div className="monitor-foot">
              <span>HISTORY</span>
              <strong>First seen → today</strong>
              <span>SYNCING</span>
            </div>
          </div>
          <div className="stat-strip">
            <div>
              <strong>04</strong>
              <span>Source datasets</span>
            </div>
            <div>
              <strong>01</strong>
              <span>Connecting entity layer</span>
            </div>
            <div>
              <strong>∞</strong>
              <span>History retained</span>
            </div>
          </div>
        </div>
      </section>
      <section className="section paper">
        <div className="container">
          <div className="catalogue-title">
            <div>
              <span className="section-index">01</span>
              <div>
                <h2>Available now</h2>
                <p>
                  Five connected layers. Open a dataset to inspect what comes
                  from the source and what Querrion adds.
                </p>
              </div>
            </div>
            <span className="availability">
              <i /> Collecting data
            </span>
          </div>
          <div className="dataset-list">
            {currentDatasets.map((item, i) => (
              <Dataset item={item} number={i + 1} key={item.title} />
            ))}
          </div>
        </div>
      </section>
      <section className="section roadmap-section">
        <div className="container">
          <SectionTitle
            index="02"
            title="On the roadmap"
            copy="Datasets we’re building next. Tell us which you need on your demo call: early customers help decide what ships first."
          />
          <p className="roadmap-disclaimer">
            We don’t offer exchange market data such as stock prices, personal
            contact details, or news articles for AI training.
          </p>
          <div className="roadmap-grid">
            {roadmap.map(([title, intro, fields, built], i) => (
              <article key={title}>
                <div className="roadmap-top">
                  <span>0{i + 1}</span>
                  <b>PLANNED</b>
                </div>
                <h3>{title}</h3>
                <p>{intro}</p>
                <dl>
                  <dt>Planned fields</dt>
                  <dd>{fields}</dd>
                  <dt>Built for</dt>
                  <dd>{built}</dd>
                </dl>
                <button onClick={() => navigate("demo")}>
                  Request priority <ArrowIcon />
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section delivery-products">
        <div className="container">
          <SectionTitle index="03" title="Delivery" />
          <div className="delivery-table">
            <div className="delivery-row delivery-head">
              <span>Method</span>
              <span>Best for</span>
              <span>Format</span>
            </div>
            <div className="delivery-row">
              <strong>
                <span>01</span> REST API
              </strong>
              <span>Products and apps that query on demand</span>
              <code>JSON</code>
            </div>
            <div className="delivery-row">
              <strong>
                <span>02</span> Bulk delivery
              </strong>
              <span>Data teams and warehouses</span>
              <code>S3 · BIGQUERY · SNOWFLAKE</code>
            </div>
            <div className="delivery-row">
              <strong>
                <span>03</span> Custom datasets
              </strong>
              <span>One-off research and backfills</span>
              <code>AGREED PER PROJECT</code>
            </div>
          </div>
          <div className="license-box">
            <div className="license-icon">§</div>
            <div>
              <span className="eyebrow">Usage rights</span>
              <h3>Built to be used, not locked away.</h3>
              <p>
                Use Querrion data internally, or display it inside your own
                product. Every plan comes with a clear data licence: what you
                can show, how to attribute it, and what to remove if a record is
                taken down.
              </p>
              <a href="#data-license">
                Read the data licence <ArrowIcon />
              </a>
            </div>
          </div>
        </div>
      </section>
      <Closing
        navigate={navigate}
        title="Not sure which data you need?"
        copy="Tell us what you’re building. We’ll show you the fields that matter and pull a live sample on the call."
      />
    </>
  )
}

function Dataset({
  item,
  number,
}: {
  item: typeof currentDatasets[number]
  number: number
}) {
  return (
    <details className="dataset" open={number === 1}>
      <summary>
        <span className="dataset-number">0{number}</span>
        <span className="dataset-glyph" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <h3>
          {item.title}
          {item.title === "Advertisers" && <small>Connecting layer</small>}
        </h3>
        <span className="dataset-intro">{item.intro}</span>
        <span className="dataset-end">
          <code>{item.code}</code>
          <span className="plus" />
        </span>
      </summary>
      <div className="dataset-body">
        <div>
          <span className="eyebrow">Included</span>
          <p>{item.included}</p>
        </div>
        <div>
          <span className="eyebrow">Added by Querrion</span>
          <p>{item.added}</p>
        </div>
        {item.note && (
          <div className="dataset-note">
            <span>NOTE</span>
            <p>{item.note}</p>
          </div>
        )}
      </div>
    </details>
  )
}

function Demo() {
  const [submitted, setSubmitted] = useState(false)
  const submit = (event: FormEvent) => {
    event.preventDefault()
    setSubmitted(true)
  }
  return (
    <section className="demo-page">
      <div className="demo-grid">
        <div className="demo-copy">
          <div className="pill pill-dark">
            <span /> Your data, live
          </div>
          <h1>
            Book a<br />
            <em>30-minute demo.</em>
          </h1>
          <p>
            We’ll pull live data for keywords and brands you choose, walk
            through the API, and answer questions about fields, delivery and
            licensing. Qualified teams get 14 days of trial access afterwards.
          </p>
          <div className="demo-steps">
            <div>
              <span>01</span>
              <p>Book a time that suits you.</p>
            </div>
            <div>
              <span>02</span>
              <p>See live data on your own keywords and brands.</p>
            </div>
            <div>
              <span>03</span>
              <p>Walk through the API and delivery options.</p>
            </div>
            <div>
              <span>04</span>
              <p>Get 14 days of trial access if there’s a fit.</p>
            </div>
          </div>
          <div className="demo-quote">
            <p>
              “No generic sales deck. We prepare a live sample for every call.”
            </p>
            <span>— The Querrion data team</span>
          </div>
        </div>
        <div className="form-wrap">
          {!submitted ? (
            <form onSubmit={submit}>
              <div className="form-heading">
                <span>DEMO REQUEST</span>
                <span>30 MIN</span>
              </div>
              <h2>Tell us what you’re building.</h2>
              <div className="form-row">
                <label>
                  First name
                  <input
                    required
                    name="firstName"
                    placeholder="Ada"
                    autoComplete="given-name"
                  />
                </label>
                <label>
                  Last name
                  <input
                    required
                    name="lastName"
                    placeholder="Lovelace"
                    autoComplete="family-name"
                  />
                </label>
              </div>
              <label>
                Work email
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="ada@company.com"
                  autoComplete="email"
                />
              </label>
              <label>
                Company
                <input
                  required
                  name="company"
                  placeholder="Company name"
                  autoComplete="organization"
                />
              </label>
              <label>
                What are you hoping to build?
                <textarea
                  required
                  name="useCase"
                  placeholder="Tell us about your product, data needs, or the brands and keywords you'd like to see."
                  rows={4}
                />
              </label>
              <label>
                Dataset of interest
                <select defaultValue="">
                  <option value="" disabled>
                    Select a dataset
                  </option>
                  <option>Search results</option>
                  <option>Keywords</option>
                  <option>Ads</option>
                  <option>AI answers</option>
                  <option>Multiple datasets</option>
                  <option>Roadmap dataset</option>
                </select>
              </label>
              <button className="button button-lime form-submit" type="submit">
                Choose a time <ArrowIcon />
              </button>
              <small>
                By continuing, you agree to our Privacy Policy. We’ll only use
                your details to arrange the demo.
              </small>
            </form>
          ) : (
            <div className="form-success" role="status">
              <div className="success-mark">✓</div>
              <span className="eyebrow">Request ready</span>
              <h2>Thanks. Let’s find a time.</h2>
              <p>
                We’ve captured your details. In a production setup, your
                scheduling calendar will open here.
              </p>
              <button
                className="button button-dark"
                onClick={() => setSubmitted(false)}
              >
                Back to request
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default App
