import { type CSSProperties, type FormEvent, useEffect, useState } from "react"

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
          <p>Clean, connected visibility data.</p>
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
      </div>
    </footer>
  )
}

function SectionTitle({
  label,
  title,
  copy,
}: {
  label: string
  title: string
  copy?: string
}) {
  return (
    <div className="section-heading">
      <span className="section-label">
        <i aria-hidden="true" />
        {label}
      </span>
      <div>
        <h2>{title}</h2>
        {copy && <p>{copy}</p>}
      </div>
    </div>
  )
}

function Home({ navigate }: { navigate: (page: Page) => void }) {
  const sources = [
    ["Search results", "Product page", "Tree Runner · allbirds.com"],
    ["Keywords", "Category terms", "sustainable running shoes"],
    ["Ads", "Creative library", "Copy · media · landing pages"],
    ["AI answers", "Answer tracking", "Prompts · mentions · citations"],
  ]
  const products = [
    [
      "Search results",
      "Organic rankings, paid ads and local results for any keyword and location, tracked over time.",
    ],
    [
      "Keywords",
      "Who ranks and who advertises on each keyword, and how that changes day to day.",
    ],
    [
      "Ads",
      "Ad creatives with real run dates, formats, placements and calls to action, with media stored so it never breaks.",
    ],
    [
      "AI answers",
      "What large language models say when people ask about your category, and which brands they mention and cite.",
    ],
  ]
  const messy = [
    [
      "Everything the source returned",
      "Only the datasets, brands and keywords you choose",
    ],
    [
      "Loose matches mixed in with real results",
      "A relevance flag on every record, so noise is easy to filter out",
    ],
    [
      "Template text like {{product.name}} in ad copy",
      "The real copy for every version of an ad",
    ],
    [
      "Links to images and videos that expire",
      "Media stored permanently",
    ],
    [
      "A snapshot that disappears",
      "History kept from the day we first see a record",
    ],
    [
      "Records with no context",
      "Every record linked to its brand and domain",
    ],
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
            <h1 aria-label="The data you need. Ready the way you need.">
              <span>The data you need.</span>
              <span>Ready the way you need.</span>
            </h1>
            <p>
              Tell us the datasets, brands and keywords that matter. Querrion
              cleans, connects and delivers exactly that, by API or straight
              into your warehouse.
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
          <SectionTitle label="Your data, prepared" title="How it works" />
          <div className="delivery-grid">
            <article>
              <DatabaseIcon />
              <h3>You choose</h3>
              <p>Pick the datasets, brands and keywords you care about.</p>
            </article>
            <article>
              <DatabaseIcon />
              <h3>We prepare it</h3>
              <p>
                Every record is cleaned, de-duplicated and linked to the real
                brand behind it, with history kept.
              </p>
            </article>
            <article>
              <DatabaseIcon />
              <h3>You receive it ready to use</h3>
              <p>
                By API, or as files in your S3, BigQuery or Snowflake.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section paper">
        <div className="container">
          <SectionTitle
            label="Connected coverage"
            title="One source for brand visibility data"
          />
          <div className="product-grid">
            {products.map(([title, copy], i) => (
              <article className="product-card" key={title}>
                <div className="card-top">
                  <span>{title}</span>
                  <span className="card-status">Live</span>
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
            label="Clean by default"
            title="A data dump vs. data you can use"
            copy="Most data providers send everything and leave the sorting to you. We do the work before it reaches you."
          />
          <div className="comparison">
            <div className="comparison-head">
              <span>A data dump</span>
              <span>Querrion</span>
            </div>
            {messy.map(([raw, clean], i) => (
              <div className="comparison-row" key={raw}>
                <div>
                  <span className="remove-mark" aria-hidden="true" />
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
            label="Enriched signals"
            title="Fields you’d otherwise have to build"
            copy="Signals, not just records. Each one is computed and kept up to date for you."
          />
          <div className="field-list">
            {fields.map(([name, copy], i) => (
              <div className="field-row" key={name}>
                <span className="field-dot" aria-hidden="true" />
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
          <SectionTitle
            label="Flexible delivery"
            title="Delivered the way your team works"
            copy="Choose what you receive and how."
          />
          <div className="delivery-grid delivery-grid-two">
            <article>
              <DatabaseIcon />
              <h3>Scope</h3>
              <p>The datasets, brands and keywords you need.</p>
            </article>
            <article>
              <DatabaseIcon />
              <h3>Method</h3>
              <p>REST API, or files in your S3, BigQuery or Snowflake.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="built-for">
        <div className="container">
          <span className="section-label section-label-light">
            <i aria-hidden="true" />
            Designed around your workflow
          </span>
          <h2>
            Built for teams who turn
            <br />
            data into decisions.
          </h2>
          <div className="audience-grid">
            <div>
              <span className="audience-mark" aria-hidden="true" />
              <h3>Product teams</h3>
              <p>Building SEO, ad intelligence and brand monitoring tools.</p>
            </div>
            <div>
              <span className="audience-mark" aria-hidden="true" />
              <h3>Agencies and brands</h3>
              <p>Feeding competitive data into their own dashboards.</p>
            </div>
            <div>
              <span className="audience-mark" aria-hidden="true" />
              <h3>Research and investment</h3>
              <p>Tracking ad and search activity as a market signal.</p>
            </div>
          </div>
        </div>
      </section>

      <Closing
        navigate={navigate}
        title="See your data, shaped for you."
        copy="In a 30-minute demo, we'll pull a sample built around your keywords and brands, and show you how it would arrive in your stack."
      />
    </>
  )
}

function RecordGraphic({ sources }: { sources: string[][] }) {
  return (
    <div className="record-graphic reveal">
      <div className="record-toolbar">
        <span>Sample data view</span>
        <span>Brand intelligence record</span>
      </div>
      <div className="map-canvas">
        <div className="map-grid" aria-hidden="true" />
        <div className="brand-node">
          <span className="node-pulse" aria-hidden="true" />
          <div className="shoe-mark">A</div>
          <div>
            <small>Brand profile</small>
            <strong>Allbirds</strong>
            <span>allbirds.com</span>
          </div>
        </div>
        <div className="flow-trunk" aria-hidden="true">
          <i />
        </div>
        <div className="source-grid">
          {sources.map(([title, line1, line2], index) => (
            <div
              className="source-card"
              style={
                { "--source-delay": `${0.65 + index * 0.1}s` } as CSSProperties
              }
              key={title}
            >
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
        <b>One brand and domain</b>
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
      </div>
    </section>
  )
}

const currentDatasets = [
  {
    title: "Search results",
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
    intro:
      "The competitive picture for every keyword: who ranks, who advertises and how that’s changing.",
    included:
      "Ranking domains, advertising brands, ad copy per keyword, search result features present.",
    added:
      "Competitor counts, ranking movement, and gaps where competitors advertise and a brand doesn’t.",
  },
  {
    title: "Ads",
    intro:
      "Ad creatives with the context raw ad data leaves out: real run dates, every version of dynamic ads, and media that doesn’t expire.",
    included:
      "Advertiser, copy and headline, format, call to action, landing page, placements, start and end dates, active status.",
    added:
      "Run time in days, real copy for template ads, creatives grouped with reuse counts, permanently stored media, keyword relevance flag.",
    note: "Launch channels: Meta and Google search ads. Spend, impressions and targeting are not available because platforms don’t publish them, and we won’t estimate them as fact.",
  },
  {
    title: "AI answers",
    intro:
      "What AI assistants say about your category, captured from the same prompts over time, so you can see how answers change.",
    included:
      "Prompt, model, full response text, brands mentioned, sources cited, capture date.",
    added:
      "Brand mention and citation counts, share of answers per brand, changes between captures.",
  },
  {
    title: "Advertisers",
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
              Every dataset can be scoped to your brands and keywords. Here's
              what's available, field by field.
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
            </div>
            <div className="monitor-entity">
              <span className="entity-mark">Q</span>
              <div>
                <small>CONNECTING LAYER</small>
                <strong>Brand + domain entity</strong>
              </div>
              <code>LIVE</code>
            </div>
            <div className="monitor-flow" aria-hidden="true">
              <span />
              <i />
            </div>
            <div className="monitor-list">
              {currentDatasets.slice(0, 4).map((item, index) => (
                <div
                  key={item.title}
                  style={
                    {
                      "--monitor-delay": `${0.2 + index * 0.12}s`,
                    } as CSSProperties
                  }
                >
                  <span className="monitor-dot" aria-hidden="true" />
                  <strong>{item.title}</strong>
                </div>
              ))}
            </div>
            <div className="monitor-foot">
              <span>HISTORY</span>
              <strong>First seen → today</strong>
            </div>
          </div>
          <div className="stat-strip">
            <div>
              <strong>Connected</strong>
              <span>Every source resolves to the same brand and domain</span>
            </div>
            <div>
              <strong>Historical</strong>
              <span>Every record is retained from first seen</span>
            </div>
          </div>
        </div>
      </section>
      <section className="section paper">
        <div className="container">
          <div className="catalogue-title">
            <div>
              <span className="section-label">
                <i aria-hidden="true" />
                Available now
              </span>
              <div>
                <h2>Available now</h2>
                <p>
                  Five connected layers. Open a dataset to inspect what comes
                  from the source and what Querrion adds.
                </p>
              </div>
            </div>
          </div>
          <div className="dataset-list">
            {currentDatasets.map((item, i) => (
              <Dataset item={item} initiallyOpen={i === 0} key={item.title} />
            ))}
          </div>
        </div>
      </section>
      <section className="section roadmap-section">
        <div className="container">
          <SectionTitle
            label="Coming next"
            title="On the roadmap"
            copy="Datasets we’re building next. Tell us which you need on your demo call: early customers help decide what ships first."
          />
          <p className="roadmap-disclaimer">
            We don’t offer exchange market data such as stock prices, personal
            contact details, or news articles for AI training.
          </p>
          <div className="roadmap-grid">
            {roadmap.map(([title, intro, fields, built]) => (
              <article key={title}>
                <div className="roadmap-top">
                  <span className="roadmap-mark" aria-hidden="true" />
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
          <SectionTitle label="Choose your workflow" title="Delivery" />
          <div className="delivery-table">
            <div className="delivery-row delivery-head">
              <span>Method</span>
              <span>Best for</span>
              <span>Format</span>
            </div>
            <div className="delivery-row">
              <strong>
                <span className="delivery-mark" aria-hidden="true" /> REST API
              </strong>
              <span>Products and apps that query on demand</span>
              <code>JSON</code>
            </div>
            <div className="delivery-row">
              <strong>
                <span className="delivery-mark" aria-hidden="true" /> Bulk
                delivery
              </strong>
              <span>Data teams and warehouses</span>
              <code>S3 · BIGQUERY · SNOWFLAKE</code>
            </div>
            <div className="delivery-row">
              <strong>
                <span className="delivery-mark" aria-hidden="true" /> Custom
                datasets
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
  initiallyOpen,
}: {
  item: typeof currentDatasets[number]
  initiallyOpen: boolean
}) {
  return (
    <details className="dataset" open={initiallyOpen}>
      <summary>
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
  const [errors, setErrors] = useState<Record<string, string>>({})

  const clearError = (name: string) => {
    setErrors((current) => {
      if (!current[name]) return current
      const next = { ...current }
      delete next[name]
      return next
    })
  }

  const submit = (event: FormEvent) => {
    event.preventDefault()
    const form = event.currentTarget as HTMLFormElement
    const data = new FormData(form)
    const value = (name: string) => String(data.get(name) ?? "").trim()
    const nextErrors: Record<string, string> = {}

    if (!value("firstName")) nextErrors.firstName = "First name is required."
    if (!value("lastName")) nextErrors.lastName = "Last name is required."

    const email = value("workEmail")
    if (!email) {
      nextErrors.workEmail = "Work email is required."
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.workEmail = "Enter a valid work email."
    } else {
      const domain = email.split("@")[1]?.toLowerCase()
      const freeDomains = new Set([
        "gmail.com",
        "yahoo.com",
        "hotmail.com",
        "outlook.com",
        "live.com",
        "msn.com",
        "icloud.com",
        "me.com",
        "aol.com",
        "proton.me",
        "protonmail.com",
        "gmx.com",
        "mail.com",
        "yandex.com",
      ])
      if (domain && freeDomains.has(domain)) {
        nextErrors.workEmail = "Please use your work email."
      }
    }

    if (!value("companyName")) {
      nextErrors.companyName = "Company name is required."
    }

    const website = value("companyWebsite")
    if (!website) {
      nextErrors.companyWebsite = "Company website is required."
    } else {
      try {
        const url = new URL(website)
        if (!["http:", "https:"].includes(url.protocol) || !url.hostname) {
          throw new Error("Invalid URL")
        }
      } catch {
        nextErrors.companyWebsite =
          "Enter a valid URL, including https:// or http://."
      }
    }

    if (!value("country")) nextErrors.country = "Country is required."
    if (!value("dataUse")) {
      nextErrors.dataUse = "Select how you will use the data."
    }
    if (data.getAll("interestedData").length === 0) {
      nextErrors.interestedData = "Choose at least one data type."
    }
    if (!value("whatBuilding")) {
      nextErrors.whatBuilding = "Tell us what you are building."
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      const firstInvalid = form.querySelector<HTMLElement>(
        `[name="${Object.keys(nextErrors)[0]}"]`,
      )
      firstInvalid?.focus()
      return
    }

    setErrors({})
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
              <span className="step-mark" aria-hidden="true" />
              <p>Book a time that suits you.</p>
            </div>
            <div>
              <span className="step-mark" aria-hidden="true" />
              <p>See live data on your own keywords and brands.</p>
            </div>
            <div>
              <span className="step-mark" aria-hidden="true" />
              <p>Walk through the API and delivery options.</p>
            </div>
            <div>
              <span className="step-mark" aria-hidden="true" />
              <p>Get 14 days of trial access if there’s a fit.</p>
            </div>
          </div>
        </div>
        <div className="form-wrap">
          {!submitted ? (
            <form onSubmit={submit} noValidate>
              <div className="form-heading">
                <span>DEMO REQUEST</span>
                <span>30 MIN</span>
              </div>
              <h2>
                Tell us what you're building, and we'll shape a live sample to
                it.
              </h2>
              <div className="form-row">
                <label className={errors.firstName ? "field-invalid" : ""}>
                  First name
                  <input
                    required
                    name="firstName"
                    placeholder="Ada"
                    autoComplete="given-name"
                    aria-invalid={Boolean(errors.firstName)}
                    aria-describedby={
                      errors.firstName ? "firstName-error" : undefined
                    }
                    onChange={() => clearError("firstName")}
                  />
                  {errors.firstName && (
                    <span className="field-error" id="firstName-error">
                      {errors.firstName}
                    </span>
                  )}
                </label>
                <label className={errors.lastName ? "field-invalid" : ""}>
                  Last name
                  <input
                    required
                    name="lastName"
                    placeholder="Lovelace"
                    autoComplete="family-name"
                    aria-invalid={Boolean(errors.lastName)}
                    aria-describedby={
                      errors.lastName ? "lastName-error" : undefined
                    }
                    onChange={() => clearError("lastName")}
                  />
                  {errors.lastName && (
                    <span className="field-error" id="lastName-error">
                      {errors.lastName}
                    </span>
                  )}
                </label>
              </div>
              <label className={errors.workEmail ? "field-invalid" : ""}>
                Work email
                <input
                  required
                  type="email"
                  name="workEmail"
                  placeholder="ada@company.com"
                  autoComplete="email"
                  aria-invalid={Boolean(errors.workEmail)}
                  aria-describedby={
                    errors.workEmail ? "workEmail-error" : undefined
                  }
                  onChange={() => clearError("workEmail")}
                />
                {errors.workEmail && (
                  <span className="field-error" id="workEmail-error">
                    {errors.workEmail}
                  </span>
                )}
              </label>
              <label className={errors.companyName ? "field-invalid" : ""}>
                Company name
                <input
                  required
                  name="companyName"
                  placeholder="Company name"
                  autoComplete="organization"
                  aria-invalid={Boolean(errors.companyName)}
                  aria-describedby={
                    errors.companyName ? "companyName-error" : undefined
                  }
                  onChange={() => clearError("companyName")}
                />
                {errors.companyName && (
                  <span className="field-error" id="companyName-error">
                    {errors.companyName}
                  </span>
                )}
              </label>
              <label className={errors.companyWebsite ? "field-invalid" : ""}>
                Company website
                <input
                  required
                  type="url"
                  name="companyWebsite"
                  placeholder="https://company.com"
                  autoComplete="url"
                  aria-invalid={Boolean(errors.companyWebsite)}
                  aria-describedby={
                    errors.companyWebsite ? "companyWebsite-error" : undefined
                  }
                  onChange={() => clearError("companyWebsite")}
                />
                {errors.companyWebsite && (
                  <span className="field-error" id="companyWebsite-error">
                    {errors.companyWebsite}
                  </span>
                )}
              </label>
              <label className={errors.country ? "field-invalid" : ""}>
                Country
                <select
                  required
                  name="country"
                  defaultValue=""
                  aria-invalid={Boolean(errors.country)}
                  aria-describedby={
                    errors.country ? "country-error" : undefined
                  }
                  onChange={() => clearError("country")}
                >
                  <option value="" disabled>
                    Select a country
                  </option>
                  <option value="United States">United States</option>
                </select>
                {errors.country && (
                  <span className="field-error" id="country-error">
                    {errors.country}
                  </span>
                )}
              </label>
              <label className={errors.dataUse ? "field-invalid" : ""}>
                How will you use the data?
                <select
                  required
                  name="dataUse"
                  defaultValue=""
                  aria-invalid={Boolean(errors.dataUse)}
                  aria-describedby={
                    errors.dataUse ? "dataUse-error" : undefined
                  }
                  onChange={() => clearError("dataUse")}
                >
                  <option value="" disabled>
                    Select one
                  </option>
                  <option value="Internal analysis">Internal analysis</option>
                  <option value="Inside our product">Inside our product</option>
                  <option value="Both">Both</option>
                </select>
                {errors.dataUse && (
                  <span className="field-error" id="dataUse-error">
                    {errors.dataUse}
                  </span>
                )}
              </label>
              <fieldset
                className={
                  errors.interestedData
                    ? "checkbox-field field-invalid"
                    : "checkbox-field"
                }
              >
                <legend>Which data are you interested in?</legend>
                <div className="checkbox-grid">
                  {[
                    "Search results",
                    "Keywords",
                    "Ads",
                    "AI answers",
                    "A roadmap dataset",
                  ].map((option) => (
                    <label key={option}>
                      <input
                        type="checkbox"
                        name="interestedData"
                        value={option}
                        aria-invalid={Boolean(errors.interestedData)}
                        aria-describedby={
                          errors.interestedData
                            ? "interestedData-error"
                            : undefined
                        }
                        onChange={() => clearError("interestedData")}
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
                {errors.interestedData && (
                  <span className="field-error" id="interestedData-error">
                    {errors.interestedData}
                  </span>
                )}
              </fieldset>
              <label className={errors.whatBuilding ? "field-invalid" : ""}>
                What are you building?
                <textarea
                  required
                  name="whatBuilding"
                  placeholder="Tell us about the product, analysis, or workflow you are building."
                  rows={5}
                  aria-invalid={Boolean(errors.whatBuilding)}
                  aria-describedby={
                    errors.whatBuilding ? "whatBuilding-error" : undefined
                  }
                  onChange={() => clearError("whatBuilding")}
                />
                {errors.whatBuilding && (
                  <span className="field-error" id="whatBuilding-error">
                    {errors.whatBuilding}
                  </span>
                )}
              </label>
              <label>
                Keywords or brands to show in the demo{" "}
                <span className="optional-label">Optional</span>
                <textarea
                  name="demoSubjects"
                  placeholder="Add any keywords, brands, or domains you would like us to prepare."
                  rows={3}
                />
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
