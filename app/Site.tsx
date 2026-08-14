"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { leadership, processSteps, products, type Product } from "./data";

// Native anchors keep every route usable even if client-side hydration is slow
// or unavailable in a review browser.
let navigationTimer: number | undefined;

function Link({ href, children, onClick, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  const router = useRouter();
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || !href.startsWith("/") || props.target === "_blank") return;
    const target = new URL(href, window.location.href);
    if (target.origin !== window.location.origin) return;
    if (target.pathname === window.location.pathname && target.search === window.location.search && target.hash) return;
    event.preventDefault();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (target.pathname === window.location.pathname && target.search === window.location.search) {
      window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
      return;
    }
    if (navigationTimer) window.clearTimeout(navigationTimer);
    const currentLocation = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    window.sessionStorage.setItem(`bilotta-scroll:${currentLocation}`, String(window.scrollY));
    window.sessionStorage.setItem("bilotta-navigation", "push");
    document.documentElement.classList.add("route-exiting");
    navigationTimer = window.setTimeout(() => {
      router.push(href, { scroll: true });
      navigationTimer = undefined;
    }, reducedMotion ? 0 : 170);
  };
  return <a href={href} onClick={handleClick} {...props}>{children}</a>;
}

const nav = [
  ["Home", "/"], ["About", "/about"], ["Products", "/products"],
  ["Transaction Process", "/transaction-process"], ["Contact Us", "/contact"],
];

function Mark({ light = false }: { light?: boolean }) {
  return <Link href="/" className={`mark ${light ? "mark-light" : ""}`} aria-label="Bilotta Traders home"><span className="mark-icon">B</span><span><b>BILOTTA</b><small>TRADERS GROUP</small></span></Link>;
}

export function Header({ dark = false }: { dark?: boolean }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        const next = window.scrollY > 32;
        setScrolled(current => current === next ? current : next);
        frame = 0;
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = open ? "hidden" : previousOverflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    if (open) requestAnimationFrame(() => closeButtonRef.current?.focus());
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);
  const isActive = (href: string) => href === "/products" ? pathname.startsWith("/products") : pathname === href;
  return <>
    <header className={`header ${dark ? "header-dark-page" : ""} ${(dark && !scrolled) ? "header-overlay" : ""} ${scrolled ? "header-scrolled" : ""}`}>
      <Mark light={dark && !scrolled} />
      <nav className="desktop-nav" aria-label="Primary">{nav.map(([label, href], i) => <Link className={`${i === 4 ? "nav-cta" : ""} ${isActive(href) ? "is-active" : ""}`} aria-current={isActive(href) ? "page" : undefined} key={href} href={href}>{label}</Link>)}</nav>
      <button ref={menuButtonRef} className="menu-button" onClick={() => setOpen(true)} aria-label="Open menu" aria-expanded={open} aria-controls="mobile-navigation"><span /><span /></button>
    </header>
    <div id="mobile-navigation" className={`mobile-menu ${open ? "is-open" : ""}`} aria-hidden={!open} role="dialog" aria-modal="true" aria-label="Mobile navigation">
      <div className="mobile-menu-top"><Mark light /><button ref={closeButtonRef} onClick={() => { setOpen(false); menuButtonRef.current?.focus(); }} aria-label="Close menu" className="menu-close">×</button></div>
      <nav>{nav.map(([label, href], i) => <Link className={isActive(href) ? "is-active" : ""} aria-current={isActive(href) ? "page" : undefined} key={href} href={href} onClick={() => setOpen(false)}><span>{String(i + 1).padStart(2, "0")}</span>{label}</Link>)}</nav>
      <div className="mobile-meta"><span>Toronto</span><span>Dubai</span><span>Switzerland</span><span>Germany</span></div>
    </div>
  </>;
}

function Arrow() { return <span aria-hidden="true" className="arrow">↗</span>; }
function Label({ children }: { children: React.ReactNode }) { return <div className="section-label">{children}</div>; }
function Button({ href, children, outline = false }: { href: string; children: React.ReactNode; outline?: boolean }) { return <Link className={`button ${outline ? "button-outline" : ""}`} href={href}>{children}<Arrow /></Link>; }

function ProductCard({ product, index, compact = false }: { product: Product; index: number; compact?: boolean }) {
  return <Link href={`/products/${product.slug}`} aria-label={`View product: ${product.name}`} className={`product-card scroll-reveal ${compact ? "product-card-compact" : ""}`}>
    <div className="product-image"><Image src={product.image} alt={`${product.name} commodity`} fill sizes={compact ? "(max-width: 600px) calc(100vw - 40px), (max-width: 900px) 50vw, 33vw" : "(max-width: 600px) calc(100vw - 40px), (max-width: 900px) 50vw, 33vw"} loading={index === 0 ? "eager" : "lazy"} /><span className="product-index">{String(index + 1).padStart(2, "0")}</span></div>
    <div className="product-copy"><span>{product.category}</span><h3>{product.name}</h3><p>{product.description}</p><small>View product</small><Arrow /></div>
  </Link>;
}

export function ProductCatalogue() {
  return <div className="product-catalogue">{products.map((product, index) => <ProductCard key={product.slug} product={product} index={index} />)}</div>;
}

function HomeCommodities() {
  const featured = products.slice(0, 6);
  const [activeSlug, setActiveSlug] = useState(featured[0].slug);
  const active = featured.find(product => product.slug === activeSlug) ?? featured[0];
  return <div className="featured-products scroll-reveal">
    <div className="featured-product-list">{featured.map((product, index) => <Link key={product.slug} href={`/products/${product.slug}`} className={`featured-product-row ${active.slug === product.slug ? "is-active" : ""}`} onPointerEnter={() => setActiveSlug(product.slug)} onFocus={() => setActiveSlug(product.slug)}>
      <div className="featured-mobile-image"><Image src={product.image} alt={`${product.name} commodity`} fill sizes="(max-width: 600px) calc(100vw - 40px), 90vw" /></div>
      <span className="featured-index">{String(index + 1).padStart(2, "0")}</span>
      <div><small>{product.category}</small><h3>{product.name}</h3><p>{product.description}</p></div>
      <span className="featured-action">View product <Arrow /></span>
    </Link>)}</div>
    <div className="featured-product-preview" aria-live="polite"><div className="featured-preview-image">{featured.map((product, index) => <Image className={active.slug === product.slug ? "is-active" : ""} key={product.slug} src={product.image} alt={`${product.name} commodity`} fill sizes="(max-width: 1100px) 42vw, 560px" loading={index === 0 ? "eager" : "lazy"} />)}</div><div className="featured-preview-caption"><span>{active.category}</span><strong>{active.name}</strong></div></div>
  </div>;
}

function Leadership() {
  return <section className="leadership wrap"><Label>LEADERSHIP</Label><div className="leadership-head scroll-reveal"><h2>EXPERIENCE AT<br />EVERY LEVEL.</h2><p>Guided by professionals with deep experience in international business, commodities and operations.</p></div><div className="leadership-list scroll-reveal">{leadership.map((person, i) => <div className="leader" key={person.name}><span>0{i + 1}</span><h3>{person.name}</h3><p>{person.role}</p><a href={`mailto:${person.email}`}>{person.email}<Arrow /></a></div>)}</div></section>;
}

function Network() {
  const places = [["TORONTO", "19%", "29%"], ["DUBAI", "66%", "58%"], ["SWITZERLAND", "49%", "37%"], ["GERMANY", "52%", "31%"]];
  return <section className="network"><div className="wrap network-head"><Label>02 / GLOBAL NETWORK</Label><h2>CONNECTED ACROSS KEY<br />INTERNATIONAL MARKETS.</h2></div><div className="map wrap"><div className="map-grid" />{places.map(([name, x, y]) => <div key={name} className="map-point" style={{ left: x, top: y }}><i /><span>{name}</span></div>)}<p className="map-note">43°27′N — 79°41′W<br />GLOBAL TRADE OPERATIONS</p></div></section>;
}

function ContactCTA({ id }: { id?: string }) { return <section id={id} className="contact-cta"><div className="wrap scroll-reveal"><Label>CONTACT</Label><h2>LET&apos;S DISCUSS YOUR<br />COMMODITY REQUIREMENTS.</h2><Button href="/contact">START A CONVERSATION</Button></div></section>; }

function ScrollReveals({ pathname }: { pathname: string }) {
  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>(".scroll-reveal"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      items.forEach(item => item.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });
    items.forEach(item => observer.observe(item));
    return () => observer.disconnect();
  }, [pathname]);
  return null;
}

function Newsletter() {
  const [submitted, setSubmitted] = useState(false);
  return <section className="newsletter"><div className="wrap newsletter-inner"><div><Label>MARKET CONNECTIONS</Label><h3>Stay connected with Bilotta.</h3></div><div><form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}><label className="sr-only" htmlFor="newsletter">Email address</label><input id="newsletter" type="email" placeholder="Email address" required /><button type="submit">SUBSCRIBE <Arrow /></button></form>{submitted && <p className="newsletter-success" role="status">Thank you. Newsletter integration is ready for the next phase.</p>}</div></div></section>;
}

export function Footer() { return <footer><div className="wrap footer-grid"><div className="footer-brand"><Mark light /><p>Global commodity trading.<br />Built on trust. Connected worldwide.</p></div><div><h4>COMPANY</h4><Link href="/">Home</Link><Link href="/about">About</Link><Link href="/products">Products</Link><Link href="/transaction-process">Transaction Process</Link><Link href="/contact">Contact</Link><a href="https://bilottatraders.com/video-blog/">Video Blog</a></div><div><h4>PRODUCTS</h4>{products.map(p => <Link key={p.slug} href={`/products/${p.slug}`}>{p.name}</Link>)}</div><div><h4>CONTACT</h4><p>133 Bronte Road — 727<br />Oakville, Ontario L6L 0H2<br />Canada</p><a href="tel:+12892421143">+1 (289) 242-1143</a><a href="mailto:info@bilottatraders.com">info@bilottatraders.com</a></div></div><div className="wrap footer-bottom"><span>© 2026 Bilotta Traders. All rights reserved.</span><a href="https://bilottatraders.com/privacy-policy/">Privacy Policy</a><span>TORONTO · DUBAI · SWITZERLAND · GERMANY</span></div></footer>; }

function Shell({ children, darkHeader = false }: { children: React.ReactNode; darkHeader?: boolean }) {
  const pathname = usePathname();
  useEffect(() => {
    if (document.documentElement.dataset.bilottaHistory === "ready") return;
    document.documentElement.dataset.bilottaHistory = "ready";
    window.history.scrollRestoration = "manual";
    window.sessionStorage.setItem("bilotta-current-location", `${window.location.pathname}${window.location.search}${window.location.hash}`);
    window.addEventListener("popstate", () => {
      const previousLocation = window.sessionStorage.getItem("bilotta-current-location");
      if (previousLocation) window.sessionStorage.setItem(`bilotta-scroll:${previousLocation}`, String(window.scrollY));
      window.sessionStorage.setItem("bilotta-navigation", "pop");
      window.sessionStorage.setItem("bilotta-current-location", `${window.location.pathname}${window.location.search}${window.location.hash}`);
    });
  }, []);
  useEffect(() => {
    document.documentElement.classList.remove("route-exiting");
    const locationKey = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    const navigationType = window.sessionStorage.getItem("bilotta-navigation");
    window.sessionStorage.removeItem("bilotta-navigation");
    if (navigationType === "push") {
      window.setTimeout(() => window.scrollTo({ top: 0, behavior: "auto" }), 180);
    } else if (navigationType === "pop") {
      const restoredPosition = Number(window.sessionStorage.getItem(`bilotta-scroll:${locationKey}`) ?? 0);
      window.setTimeout(() => window.scrollTo({ top: restoredPosition, behavior: "auto" }), 120);
    }
    window.sessionStorage.setItem("bilotta-current-location", locationKey);
  }, [pathname]);
  return <><Header dark={darkHeader} /><main key={pathname} className="page-transition">{children}</main><Newsletter /><Footer /><ScrollReveals pathname={pathname} /></>;
}

export function HomePage() { return <Shell darkHeader>
  <section className="hero"><div className="hero-image"><Image src="/images/hero.webp" alt="" fill priority sizes="100vw" /></div><div className="hero-grid" /><div className="hero-content wrap"><div><Label>BILOTTA TRADERS GROUP</Label><h1>GLOBAL<br />COMMODITY<br />TRADING.</h1><p>Built on Trust. Connected Worldwide.</p><div className="hero-actions"><Button href="/products">EXPLORE PRODUCTS</Button><Button href="/contact" outline>CONTACT US</Button></div></div></div><div className="hero-cities wrap">{["TORONTO", "DUBAI", "SWITZERLAND", "GERMANY"].map((x, i) => <span key={x}><i>0{i + 1}</i>{x}</span>)}</div></section>
  <section id="products" className="commodities wrap"><div className="section-heading scroll-reveal"><div><Label>01 / COMMODITIES</Label><h2>COMMODITIES ACROSS<br />GLOBAL MARKETS</h2></div><p>Connecting buyers and suppliers through an established international network and a focused portfolio of essential commodities.</p></div><HomeCommodities /><div className="section-end scroll-reveal"><Button href="/products" outline>VIEW FULL CATALOGUE</Button></div></section>
  <Network />
  <section id="about" className="about-preview"><div className="wrap about-grid scroll-reveal"><div><Label>03 / ABOUT</Label><h2>GLOBAL RELATIONSHIPS.<br />RELIABLE SUPPLY.</h2></div><div><p className="lead">Bilotta Traders Group is a globally recognized commodity trading and reselling firm headquartered in Toronto, Canada, with branch offices in Dubai, Switzerland and Germany.</p><p>The company serves clients internationally with a broad professional network, focused service and experienced leadership across the commodities industry.</p><Button href="/about" outline>DISCOVER BILOTTA</Button></div></div></section>
  <section id="transaction-process" className="process-preview wrap"><div className="section-heading scroll-reveal"><div><Label>04 / TRANSACTION PROCESS</Label><h2>CLARITY AT<br />EVERY STAGE.</h2></div><p>A defined, mandatory procedure gives buyers and sellers a clear path from the initial ICPO or LOI through bank confirmation and shipment.</p></div><div className="process-short scroll-reveal">{processSteps.slice(0, 4).map((step, i) => <div key={step.title}><span>0{i + 1}</span><h3>{step.title}</h3><p>{step.description}</p></div>)}</div><Button href="/transaction-process">VIEW COMPLETE PROCESS</Button></section>
  <ContactCTA id="contact" />
 </Shell>; }

function PageHero({ label, title, intro, image }: { label: string; title: React.ReactNode; intro: string; image?: string }) { return <section className="page-hero"><div className="page-hero-image">{image && <Image src={image} alt="" fill priority sizes="100vw" />}</div><div className="wrap page-hero-inner"><Label>{label}</Label><h1>{title}</h1><p>{intro}</p></div></section>; }

export function ProductsPage() { return <Shell darkHeader><PageHero label="PRODUCTS / 01—09" title={<>GLOBAL<br />COMMODITIES.</>} intro="A focused portfolio spanning energy, agriculture and industrial metals." image="/images/hero.webp" /><section className="catalogue wrap"><div className="catalogue-meta"><Label>OUR CATALOGUE</Label><p>Nine key commodity groups. One experienced international network.</p></div><ProductCatalogue /></section><ContactCTA /></Shell>; }

export function ProductDetailPage({ slug }: { slug: string }) {
  const product = products.find(item => item.slug === slug);
  if (!product) return null;
  const productIndex = products.findIndex(item => item.slug === slug);
  const related = product.related.map(relatedSlug => products.find(item => item.slug === relatedSlug)).filter((item): item is Product => Boolean(item));
  const previous = productIndex > 0 ? products[productIndex - 1] : undefined;
  const next = productIndex < products.length - 1 ? products[productIndex + 1] : undefined;
  return <Shell>
    <section className="product-detail-hero">
      <div className="product-detail-intro">
        <Link className="back-link" href="/products">← Back to Products</Link>
        <div className="product-detail-meta"><Label>{product.category.toUpperCase()} / {String(productIndex + 1).padStart(2, "0")}</Label><span className="product-hero-number" aria-hidden="true">{String(productIndex + 1).padStart(2, "0")}</span></div>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <Button href={`/contact?product=${product.slug}`}>REQUEST AN INQUIRY</Button>
      </div>
      <figure className="detail-image"><Image src={product.image} alt={`${product.name} commodity`} fill sizes="(max-width: 900px) 100vw, 58vw" loading="eager" /><figcaption>{product.category.toUpperCase()} / GLOBAL COMMODITY</figcaption></figure>
    </section>

    <section className="product-overview wrap scroll-reveal">
      <Label>PRODUCT OVERVIEW</Label>
      <div className="product-overview-grid"><h2>{product.statement}</h2><p>{product.overview[0]}</p></div>
    </section>

    <section className="product-facts wrap scroll-reveal" aria-label={`${product.name} commercial information`}>
      <div><span>COMMODITY</span><strong>{product.name}</strong></div>
      <div><span>CATEGORY</span><strong>{product.category}</strong></div>
      <div><span>APPLICATION</span><strong>{product.applications}</strong></div>
      <div><span>SUPPLY SCOPE</span><strong>International trading</strong></div>
      <div><span>COMMERCIAL TERMS</span><strong>Confirmed during inquiry</strong></div>
    </section>

    <section className="product-visual-story wrap scroll-reveal">
      <figure><Image src={product.image} alt={`Close-up view of ${product.name}`} fill sizes="(max-width: 900px) calc(100vw - 40px), 72vw" /></figure>
      <div><Label>COMMODITY CONTEXT</Label><h2>BUILT AROUND QUALIFIED COMMERCIAL REQUIREMENTS.</h2><p>{product.overview[1] ?? product.overview[0]}</p><p className="detail-note">Specifications, origin, quantity and delivery terms are confirmed during a qualified inquiry.</p></div>
    </section>

    <section className="product-inquiry"><div className="wrap product-inquiry-inner scroll-reveal"><div><Label>COMMERCIAL INQUIRY</Label><h2>INTERESTED IN {product.name.toUpperCase()} SUPPLY?</h2><p>Share your commodity requirement with the Bilotta Traders team for commercial review.</p></div><Button href={`/contact?product=${product.slug}`}>START AN INQUIRY</Button></div></section>

    <section className="related wrap"><div className="related-heading scroll-reveal"><Label>RELATED COMMODITIES</Label><h2>EXPLORE THE PORTFOLIO.</h2></div><div className="related-grid">{related.map((item, index) => <ProductCard compact key={item.slug} product={item} index={index} />)}</div></section>

    <nav className="product-sequence wrap scroll-reveal" aria-label="Product navigation">
      <div>{previous && <Link href={`/products/${previous.slug}`}><small>PREVIOUS COMMODITY</small><strong>← {previous.name}</strong></Link>}</div>
      <div>{next && <Link href={`/products/${next.slug}`}><small>NEXT COMMODITY</small><strong>{next.name} →</strong></Link>}</div>
    </nav>
  </Shell>;
}

export function AboutPage() { return <Shell darkHeader><PageHero label="ABOUT / BILOTTA TRADERS GROUP" title={<>TRUST BUILT<br />ACROSS BORDERS.</>} intro="An international commodity trading and reselling firm connecting supply with global market demand." image="/images/about.webp" /><section className="about-story wrap scroll-reveal"><div><Label>COMPANY OVERVIEW</Label><h2>GLOBAL RELATIONSHIPS.<br />RELIABLE SUPPLY.</h2></div><div><p className="lead">Headquartered in Toronto, Bilotta Traders Group maintains a presence through branch offices in Dubai, Switzerland and Germany.</p><p>Its product portfolio spans fuels, sugar, fertilizers, copper, aluminum and steel. The leadership team combines business, commodities and operational experience to support clients across international markets.</p><p>The company emphasizes long-term relationships, transparency, responsive service and the practical coordination required for cross-border commodity transactions.</p></div></section><section className="reach"><div className="wrap scroll-reveal"><Label>GLOBAL REACH</Label><div className="reach-grid">{["Toronto / Headquarters", "Dubai / Branch Office", "Switzerland / Branch Office", "Germany / Branch Office"].map((x, i) => <div key={x}><span>0{i + 1}</span><h3>{x.split(" / ")[0]}</h3><p>{x.split(" / ")[1]}</p></div>)}</div></div></section><Leadership /><ContactCTA /></Shell>; }

const processGroups = [
  { label: "DOCUMENTATION", range: "STEPS 01—05", steps: processSteps.slice(0, 5), offset: 0 },
  { label: "BANKING & VERIFICATION", range: "STEPS 06—09", steps: processSteps.slice(5, 9), offset: 5 },
  { label: "SHIPMENT", range: "STEP 10", steps: processSteps.slice(9), offset: 9 },
];

export function TransactionPage() { return <Shell><section className="transaction-head wrap"><Label>TRANSACTION PROCESS</Label><h1>DEFINED TERMS.<br />CLEAR EXECUTION.</h1><div className="transaction-intro"><h2>Seller’s Transaction Procedure Terms & Conditions</h2><p>To initiate a transaction, an official signed and sealed End Buyer’s LOI in PDF format is required. The following procedure is mandatory and non-negotiable.</p></div></section><section className="timeline wrap">{processGroups.map(group => <section className="timeline-group scroll-reveal" key={group.label} aria-labelledby={`group-${group.offset}`}><header><span id={`group-${group.offset}`}>{group.label}</span><small>{group.range}</small></header>{group.steps.map((step, i) => <article className="timeline-row" key={step.title}><span className="timeline-number">{String(group.offset + i + 1).padStart(2, "0")}</span><div><h2>{step.title}</h2><p>{step.description}</p></div></article>)}</section>)}<div className="timeline-cta scroll-reveal"><Button href="/contact">START AN INQUIRY</Button></div></section></Shell>; }

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [product, setProduct] = useState("");
  const statusRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("product");
    if (!requested || !products.some(item => item.slug === requested)) return;
    const timer = window.setTimeout(() => setProduct(requested), 0);
    return () => window.clearTimeout(timer);
  }, []);
  return <form className="contact-form" onSubmit={e => { e.preventDefault(); setSubmitted(true); requestAnimationFrame(() => statusRef.current?.focus()); }}>
    <fieldset className="form-group"><legend><span>01</span> YOUR ROLE</legend><div className="radio-row">{["End Buyer", "Buyer Intermediary", "Supplier", "Other"].map((x, i) => <label key={x}><input type="radio" name="type" required={i === 0} /> <span>{x}</span></label>)}</div></fieldset>
    <fieldset className="form-group"><legend><span>02</span> CONTACT DETAILS</legend><div className="form-grid"><label>FULL NAME<input required name="fullName" autoComplete="name" placeholder="Enter your full name" /></label><label>EMAIL ADDRESS<input required name="email" autoComplete="email" type="email" placeholder="name@company.com" /></label><label>COUNTRY<input name="country" autoComplete="country-name" placeholder="Enter your country" /></label><label>PHONE NUMBER<input name="phone" autoComplete="tel" type="tel" placeholder="Country code + number" /></label><label className="full">COMPANY<input name="company" autoComplete="organization" placeholder="Enter your company name" /></label></div></fieldset>
    <fieldset className="form-group"><legend><span>03</span> COMMODITY REQUIREMENT</legend><div className="form-grid"><label>SELECT PRODUCT<select name="product" value={product} onChange={event => setProduct(event.target.value)}><option value="">Choose a commodity</option>{products.map(p => <option key={p.slug} value={p.slug}>{p.name}</option>)}</select></label><label>QUANTITY IN TOTAL AND PER MONTH?<input name="quantity" placeholder="Total and per month" /></label><label>DESTINATION PORT?<input name="destinationPort" placeholder="Enter destination port" /></label><label>PRICE<input name="price" placeholder="Target price, if applicable" /></label><label>DURATION OF CONTRACT?<input name="contractDuration" placeholder="Contract duration" /></label><label>PREFERRED PAYMENT INSTRUMENT?<input name="paymentInstrument" placeholder="Enter preferred instrument" /></label></div></fieldset>
    <fieldset className="form-group form-message"><legend><span>04</span> MESSAGE</legend><label>MESSAGE<textarea name="message" rows={5} placeholder="Tell us about your requirement" /></label></fieldset>
    <button className="button" type="submit">SUBMIT INQUIRY <Arrow /></button>{submitted && <p ref={statusRef} tabIndex={-1} className="form-success" role="status">Thank you. Your inquiry has been captured in this design prototype.</p>}
  </form>;
}

export function ContactPage() { return <Shell><section className="contact-page wrap"><div className="contact-left"><Label>CONTACT</Label><h1>LET&apos;S TALK<br />COMMODITIES.</h1><p>Tell us what you need, where it is going, and the commercial context. Our team will review your inquiry.</p><div className="contact-facts"><div><span>ADDRESS</span><p>133 Bronte Road — 727<br />Oakville, Ontario L6L 0H2<br />Canada</p></div><div><span>TELEPHONE</span><a href="tel:+12892421143">+1 (289) 242-1143</a></div><div><span>EMAIL</span><a href="mailto:info@bilottatraders.com">info@bilottatraders.com</a></div></div></div><div className="contact-right"><h2>WRITE A MESSAGE</h2><ContactForm /></div></section></Shell>; }
