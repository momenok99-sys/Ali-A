"use client";
export default function Error({reset}:{reset:()=>void}){return <section className="not-found"><span>Something shifted</span><h1>We could not load<br/>this page.</h1><button onClick={reset}>Try again →</button></section>}
