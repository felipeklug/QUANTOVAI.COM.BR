import React, { useEffect } from "react";
import { cn } from '../lib/utils';

type Props = { id:string; className?:string; load?:boolean };

export function AdSlot({ id, className="", load=false }:Props){
 useEffect(()=> {
 if(!load) return;
 // Google AdSense loading logic
 try {
 (window.adsbygoogle = window.adsbygoogle || []).push({});
 } catch (e) {
 console.error("Ad loading failed for slot", id, e);
 }
 }, [load]);

 return (
 <div id={id} className={cn(
 `ad-slot min-h-[140px] md:min-h-[250px] bg-neutral-100/60 
 rounded-xl border border-neutral-200 
 flex items-center justify-center text-xs text-neutral-500`,
 className
 )} 
 aria-label="Espaço publicitário"
 >
 {load ? `Anúncio (ID: ${id})` : 'Anúncio'}
 </div>
 );
}
