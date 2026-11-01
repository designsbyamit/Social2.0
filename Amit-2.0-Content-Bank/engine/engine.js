const weights={relevance:25,timeliness:20,utility:15,shareability:15,originality:10,credibility:10,feasibility:5};
const sample=[
{id:"I001",title:"Your Figma skills won't save your design career",aud:"0-2;2-5",format:"Reel",franchise:"Decode This",problem:"Tool proficiency is often mistaken for design value.",hooks:["Your Figma skills won't save your design career","Being fast in Figma is not the same as being valuable","What makes a designer valuable now?"],s:{relevance:5,timeliness:1,utility:3,shareability:4,originality:5,credibility:3,feasibility:5}},
{id:"I006",title:"Anatomy of a great UX case study",aud:"0-2;2-5",format:"Carousel",franchise:"Design Gym",problem:"Designers need stronger portfolio storytelling.",hooks:["Your portfolio needs more than pretty screens","What makes a case study convincing?","A simple case study structure"],s:{relevance:5,timeliness:1,utility:5,shareability:5,originality:4,credibility:4,feasibility:4}},
{id:"I011",title:"Agentic UX in 20 seconds",aud:"2-5;5-10+",format:"Reel",franchise:"AI x Design Lab",problem:"Designers are unclear how interactions change when software takes actions.",hooks:["Agentic UX explained in 20 seconds","What changes when software takes action?","Designing for delegated tasks"],s:{relevance:4,timeliness:2,utility:3,shareability:4,originality:4,credibility:3,feasibility:5}}
];
let ideas=[];const $=id=>document.getElementById(id);
function escapeHtml(s){return String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function score(x){return Math.round(Object.entries(weights).reduce((sum,[k,w])=>sum+(Math.max(0,Math.min(5,Number(x.s?.[k])||0))/5*w),0));}
function parseCSV(text){
 const rows=[];let row=[],value="",quoted=false;
 for(let i=0;i<text.length;i++){const c=text[i],n=text[i+1];if(c==='"'&&quoted&&n==='"'){value+='"';i++;}else if(c==='"'){quoted=!quoted;}else if(c===","&&!quoted){row.push(value);value="";}else if((c==="\n"||c==="\r")&&!quoted){if(c==="\r"&&n==="\n")i++;row.push(value);if(row.some(v=>v.trim()))rows.push(row);row=[];value="";}else value+=c;}
 if(value||row.length){row.push(value);rows.push(row);}const headers=rows.shift()||[];
 return rows.map((r,index)=>{const o=Object.fromEntries(headers.map((h,i)=>[h,(r[i]||"").trim()]));return{id:o.id||("CSV-"+index),title:o.title||"Untitled",aud:o.audience_segment||"0-5",format:o.format||"Carousel",franchise:o.franchise||"Design Gym",problem:o.audience_problem||"",hooks:[o.hook_1,o.hook_2,o.hook_3].filter(Boolean),source:o.source_url||"",researchDate:o.research_date||"",effort:Number(o.effort_minutes)||60,s:{relevance:4,timeliness:0,utility:3,shareability:3,originality:3,credibility:o.source_url?4:2,feasibility:Number(o.effort_minutes)<=30?5:3}};});
}
function render(){
 const aud=$("aud").value,format=$("fmt").value;const rows=ideas.filter(x=>(aud==="all"||x.aud.includes(aud)||x.aud==="0-5")&&(format==="all"||x.format===format)).map(x=>({...x,total:score(x)})).sort((a,b)=>b.total-a.total).slice(0,10);
 $("count").textContent=rows.length+" ranked candidates · scores are editorial guidance, not a virality forecast";
 $("cards").innerHTML=rows.map((x,i)=>'<article class="card"><div class="cardtop"><span>#'+(i+1)+' · '+escapeHtml(x.id)+'</span><span class="score">'+x.total+'/100</span></div><p class="meta">'+escapeHtml(x.franchise||"")+' · '+escapeHtml(x.format)+' · '+escapeHtml(x.aud)+'</p><h2>'+escapeHtml(x.title)+'</h2><p>'+escapeHtml(x.problem)+'</p><p><b>Hook directions</b><br>'+x.hooks.map(escapeHtml).join("<br>")+'</p><p class="meta">Backlog candidate · trend not assessed · '+(x.source?"source attached":"source research needed")+' · '+x.effort+' min effort</p><button data-id="'+escapeHtml(x.id)+'">Copy for development</button></article>').join("")||'<div class="none">No matching candidates. Widen your filters or import more ideas.</div>';
}
function load(items){ideas=items;render();}
$("sample").addEventListener("click",()=>{load(sample);});
$("csv").addEventListener("change",async e=>{const file=e.target.files?.[0];if(!file)return;try{load(parseCSV(await file.text()));$("count").textContent=ideas.length+" imported candidates · live trend feed not connected";}catch(err){alert("CSV import failed: "+err.message);}});
["aud","fmt"].forEach(id=>$(id).addEventListener("change",render));
$("cards").addEventListener("click",async e=>{const button=e.target.closest("button[data-id]");if(!button)return;const item=ideas.find(x=>x.id===button.dataset.id);const text=[item.title,"Franchise: "+item.franchise,"Format: "+item.format,"Audience: "+item.aud,"Hooks:",...item.hooks,"Audience problem: "+item.problem,"Source: "+(item.source||"Needs verification"),"Next: add Amit's original perspective and verify claims."].join("\n");try{await navigator.clipboard.writeText(text);button.textContent="Copied";}catch{button.textContent="Copy unavailable";}});
load(sample);
