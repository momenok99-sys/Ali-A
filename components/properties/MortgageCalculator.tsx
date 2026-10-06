"use client";
import { useMemo, useState } from "react";
export function MortgageCalculator({ price }: { price:number }) {
 const [down,setDown]=useState(Math.round(price*.25)); const [rate,setRate]=useState(4.5); const [years,setYears]=useState(25);
 const payment=useMemo(()=>{const principal=Math.max(0,price-down);const r=rate/100/12;const n=years*12;if(!r)return principal/n;return principal*(r*Math.pow(1+r,n))/(Math.pow(1+r,n)-1)},[price,down,rate,years]);
 return <section className="calculator"><div><span className="eyebrow">Mortgage estimate</span><h2>Plan the numbers.</h2><p>This is an illustrative estimate, not financial advice or a guaranteed financing term.</p></div><div className="calculator-fields"><label>Property price<input type="number" value={price} readOnly/></label><label>Down payment<input type="number" min="0" max={price} value={down} onChange={e=>setDown(Number(e.target.value))}/></label><label>Interest rate (%)<input type="number" min="0" step="0.1" value={rate} onChange={e=>setRate(Number(e.target.value))}/></label><label>Term (years)<input type="number" min="1" max="40" value={years} onChange={e=>setYears(Number(e.target.value))}/></label></div><div className="calculation-result"><span>Estimated monthly payment</span><strong>AED {Math.round(payment).toLocaleString()}</strong></div></section>;
}
