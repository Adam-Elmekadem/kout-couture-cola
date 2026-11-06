"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { products, type Product } from "@/lib/products";

type Filter = "All" | Product["type"];
type BagItem = { id: string; productId: string; size: string };

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true" className="arrow">{diagonal ? "↗" : "→"}</span>;
}

export default function Home() {
  const [filter, setFilter] = useState<Filter>("All");
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [size, setSize] = useState("M");
  const [bag, setBag] = useState<BagItem[]>([]);
  const [bagOpen, setBagOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const productDialog = useRef<HTMLDialogElement>(null);
  const bagDialog = useRef<HTMLDialogElement>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (activeProduct && !productDialog.current?.open) productDialog.current?.showModal();
  }, [activeProduct]);

  useEffect(() => {
    if (bagOpen && !bagDialog.current?.open) bagDialog.current?.showModal();
  }, [bagOpen]);

  function openProduct(product: Product, trigger: HTMLElement) {
    lastTrigger.current = trigger;
    setSize("M");
    setActiveProduct(product);
  }

  function closeProduct() {
    productDialog.current?.close();
  }

  function addToBag() {
    if (!activeProduct) return;
    setBag((current) => [...current, { id: crypto.randomUUID(), productId: activeProduct.id, size }]);
    setAnnouncement(`${activeProduct.name}, size ${size}, added to your concept bag.`);
    closeProduct();
  }

  const visibleProducts = filter === "All" ? products : products.filter((product) => product.type === filter);
  const total = bag.reduce((sum, item) => sum + (products.find((product) => product.id === item.productId)?.price ?? 0), 0);

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <a className="brand-lockup" href="#top" aria-label="Couture-Cola home" onClick={() => setMenuOpen(false)}>
          <img src="/cc-mark.svg" alt="" width="39" height="31" />
          <span>COUTURE-COLA</span>
        </a>
        <nav className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label="Main navigation">
          <a href="#collection" onClick={() => setMenuOpen(false)}>Collection</a>
          <a href="#story" onClick={() => setMenuOpen(false)}>The idea</a>
          <a href="#details" onClick={() => setMenuOpen(false)}>Details</a>
        </nav>
        <div className="header-actions">
          <button className="bag-button" type="button" onClick={() => setBagOpen(true)} aria-label={`Open concept bag, ${bag.length} items`}>
            Bag <span className="bag-count">{bag.length}</span>
          </button>
          <button className="menu-button" type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
            <span /> <span />
          </button>
        </div>
      </header>

      <main id="main">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero-art" aria-hidden="true" />
          <div className="hero-topline"><span>AN ORIGINAL KOUT PROJECT CONCEPT</span><span>DROP 01 / 2026</span></div>
          <div className="hero-title-wrap">
            <h1 id="hero-title"><span>COUTURE</span><span>COLA<span className="hero-period">.</span></span></h1>
            <span className="hero-side-note">THE FAMILIAR, RECUT</span>
          </div>
          <div className="hero-bottom">
            <p>Everyday icon. New dress code.</p>
            <a className="button button-cream" href="#collection">Explore the collection <Arrow diagonal /></a>
          </div>
        </section>

        <section className="intro-strip" aria-label="Collection themes">
          <p>One familiar feeling, three new forms.</p>
          <div><span>Oversized fleece</span><span>Statement outerwear</span><span>Utility cuts</span></div>
        </section>

        <section className="collection section-shell" id="collection" aria-labelledby="collection-title">
          <div className="section-heading collection-heading">
            <div>
              <p className="section-kicker">The first edit</p>
              <h2 id="collection-title">Made to be worn.<br /><em>Made to be seen.</em></h2>
            </div>
            <p>Street staples rebuilt through texture, proportion, and one unmistakable shade of red.</p>
          </div>
          <div className="collection-toolbar">
            <div className="filters" role="group" aria-label="Filter collection">
              {(["All", "Outerwear", "Fleece", "Bottoms"] as Filter[]).map((option) => (
                <button key={option} type="button" className={filter === option ? "filter is-active" : "filter"} aria-pressed={filter === option} onClick={() => setFilter(option)}>{option}</button>
              ))}
            </div>
            <span className="result-count">{visibleProducts.length} pieces</span>
          </div>
          <div className="product-grid">
            {visibleProducts.map((product, index) => (
              <article className="product-card" key={product.id}>
                <button type="button" className="product-image-button" onClick={(event) => openProduct(product, event.currentTarget)} aria-label={`View ${product.name}`}>
                  <Image src={product.image} alt={product.alt} fill sizes="(max-width: 700px) 100vw, (max-width: 1020px) 50vw, 33vw" priority={index === 0} />
                  <span className="product-image-action">View piece <Arrow diagonal /></span>
                </button>
                <div className="product-meta"><div><span>{product.type}</span><h3>{product.name}</h3></div><span>${product.price}</span></div>
                <p className="product-color">{product.color}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="campaign" id="story" aria-labelledby="story-title">
          <Image src="/images/campaign-portrait.webp" alt="Model wearing the Block Varsity jacket against a deep red painted wall" fill sizes="100vw" />
          <div className="campaign-copy">
            <p className="section-kicker">A different kind of classic</p>
            <h2 id="story-title">Pop culture.<br />Cut different.</h2>
            <p>We borrowed a feeling everyone knows and gave it new form: heavier fabric, freer silhouettes, a little attitude.</p>
            <a href="#details" className="text-link">See the details <Arrow diagonal /></a>
          </div>
        </section>

        <section className="details section-shell" id="details" aria-labelledby="details-title">
          <div className="details-heading"><h2 id="details-title">The cut is<br /><em>the point.</em></h2><p>Considered up close. Easy to wear at a distance.</p></div>
          <div className="detail-mosaic">
            <div className="detail-tile detail-text"><span>01 / FEEL</span><h3>Weight where it matters.</h3><p>Substantial fleece, structured wool, and cotton twill give every piece its own presence.</p></div>
            <div className="detail-tile detail-image"><Image src="/images/spill-hoodie.webp" alt="Close view of the Spill Hoodie fabric and red appliqué" fill sizes="(max-width: 720px) 100vw, 50vw" /></div>
            <div className="detail-tile detail-image detail-image-cargo"><Image src="/images/cutline-cargo.webp" alt="Close view of the Cutline Cargo pocket construction" fill sizes="(max-width: 720px) 100vw, 50vw" /></div>
            <div className="detail-tile detail-text detail-red"><span>02 / FORM</span><h3>Room to move.</h3><p>Generous cuts and clear lines make a statement without asking for permission.</p></div>
          </div>
        </section>

        <section className="final-call" aria-labelledby="final-title">
          <img src="/cc-mark.svg" alt="" width="70" height="56" />
          <h2 id="final-title">Familiar feeling.<br />Fresh fit.</h2>
          <a className="button button-red" href="#collection">Explore the collection <Arrow diagonal /></a>
        </section>
      </main>

      <footer className="site-footer"><span>COUTURE-COLA © 2026</span><p>Independent fashion concept by Kout Project. Not affiliated with any beverage brand.</p><a href="#top">Back to top ↑</a></footer>

      <dialog ref={productDialog} className="product-dialog" aria-labelledby={activeProduct ? "dialog-title" : undefined} onClose={() => { setActiveProduct(null); lastTrigger.current?.focus(); }} onClick={(event) => { if (event.target === productDialog.current) closeProduct(); }}>
        {activeProduct && <div className="product-dialog-inner">
          <div className="dialog-image"><Image src={activeProduct.image} alt={activeProduct.alt} fill sizes="(max-width: 760px) 100vw, 50vw" /></div>
          <div className="dialog-content">
            <button className="dialog-close" type="button" aria-label="Close product details" onClick={closeProduct}>×</button>
            <span className="section-kicker">{activeProduct.type}</span>
            <h2 id="dialog-title">{activeProduct.name}</h2>
            <p className="dialog-price">${activeProduct.price} <span>Concept pricing</span></p>
            <p>{activeProduct.description}</p>
            <ul className="product-details">{activeProduct.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
            <fieldset className="size-picker"><legend>Choose size</legend><div>{activeProduct.sizes.map((option) => <button type="button" aria-pressed={size === option} className={size === option ? "size is-selected" : "size"} key={option} onClick={() => setSize(option)}>{option}</button>)}</div></fieldset>
            <button className="button button-dark dialog-add" type="button" onClick={addToBag}>Add to concept bag <Arrow diagonal /></button>
            <small>This is a design demo. No checkout or payment is connected.</small>
          </div>
        </div>}
      </dialog>

      <dialog ref={bagDialog} className="bag-dialog" aria-labelledby="bag-title" onClose={() => setBagOpen(false)} onClick={(event) => { if (event.target === bagDialog.current) bagDialog.current?.close(); }}>
        <div className="bag-panel">
          <div className="bag-header"><div><span className="section-kicker">Your edit</span><h2 id="bag-title">Concept bag <span>({bag.length})</span></h2></div><button type="button" className="bag-close" aria-label="Close bag" onClick={() => bagDialog.current?.close()}>×</button></div>
          {bag.length ? <><div className="bag-items">{bag.map((item) => { const product = products.find((p) => p.id === item.productId)!; return <div className="bag-item" key={item.id}><Image src={product.image} alt="" width={90} height={110} /><div><strong>{product.name}</strong><span>Size {item.size}</span><span>${product.price}</span><button type="button" onClick={() => setBag((current) => current.filter((entry) => entry.id !== item.id))}>Remove</button></div></div>; })}</div><div className="bag-summary"><div><span>Concept total</span><strong>${total}</strong></div><p>This portfolio demo does not accept orders or payment.</p></div></> : <div className="bag-empty"><p>Your bag is waiting for its first piece.</p><button className="button button-dark" type="button" onClick={() => { bagDialog.current?.close(); document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" }); }}>Explore the collection <Arrow diagonal /></button></div>}
        </div>
      </dialog>
      <div className="sr-only" role="status" aria-live="polite">{announcement}</div>
    </>
  );
}
