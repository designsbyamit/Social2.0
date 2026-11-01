const weights={relevance:25,timeliness:20,utility:15,shareability:15,originality:10,credibility:10,feasibility:5};
let backlog=[],trendCandidates=[],allCandidates=[];
const $=id=>document.getElementById(id);
function escapeHtml(s){return String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function parseCSV(text){
 const rows=[];let row=[],value="",quoted=false;
 for(let i=0;i<text.length;i++){const c=text[i],n=text[i+1];if(c==='"'&&quoted&&n==='"'){value+='"';i++;}else if(c==='"'){quoted=!quoted;}else if(c===","&&!quoted){row.push(value);value="";}else if((c==="\n"||c==="\r")&&!quoted){if(c==="\r"&&n==="\n")i++;row.push(value);if(row.some(v=>v.trim()))rows.push(row);row=[];value="";}else value+=c;}
 if(value||row.length){row.push(value);rows.push(row);}const headers=rows.shift()||[];
 return rows.map((r,index)=>{const o=Object.fromEntries(headers.map((h,i)=>[h,(r[i]||"").trim()]));const segment=o.audience_segment||"0-5",effort=Number(o.effort_minutes)||60,title=o.title||"Untitled",utilityText=(o.utility||"").toLowerCase();return{id:o.id||"CSV-"+index,title,aud:segment,format:o.format||"Carousel",franchise:o.franchise||"Design Gym",problem:o.audience_problem||"",hooks:[o.hook_1,o.hook_2,o.hook_3].filter(Boolean),source:o.source_url||"",sourceName:"Idea Bank",publishedAt:o.research_date||"",confidence:o.source_url?"Medium":"Low",evidence:o.trend_signal||"Research needed",kind:"backlog",effort,s:{relevance:segment.includes("0-")||segment==="0-5"?5:segment.includes("2-5")?4:3,timeliness:0,utility:/portfolio|practical|framework|checklist|roadmap|action|skill|craft|test|plan/.test(utilityText+" "+title.toLowerCase())?5:3,shareability:/why|how|stop|won't|not|mistake|truth|difference|first|better/.test(title.toLowerCase())?4:3,originality:/stop|won't|uncomfortable|difference|truth|diary/.test(title.toLowerCase())?4:3,credibility:o.source_url?4:2,feasibility:effort<=30?5:effort<=45?4:effort<=60?3:2}};});
}
function score(x){return Math.round(Object.entries(weights).reduce((sum,[k,w])=>sum+(Math.max(0,Math.min(5,Number(x.s?.[k])||0))/5*w),0));}
function freshness(date){if(!date)return"Undated";const days=(Date.now()-Date.parse(date+"T00:00:00Z"))/86400000;return days<=7?"Fresh":days<=30?"Recent":"Stale";}
function render(){
 const aud=$("aud").value,format=$("fmt").value,source=$("source").value;
 const rows=allCandidates.filter(x=>(aud==="all"||x.aud.includes(aud)||x.aud==="0-5")&&(format==="all"||x.format===format)&&(source==="all"||x.kind===source)).map(x=>({...x,total:score(x)})).sort((a,b)=>b.total-a.total).slice(0,12);
 $("count").textContent=rows.length+" recommended candidates · scores are editorial estimates, not virality forecasts";
 $("summary").innerHTML='<div class="stat"><b>'+backlog.length+'</b><span>BACKLOG IDEAS</span></div><div class="stat"><b>'+trendCandidates.length+'</b><span>RESEARCH SIGNALS</span></div><div class="stat"><b>'+rows.length+'</b><span>SHORTLISTED</span></div>';
 $("cards").innerHTML=rows.map((x,i)=>'<article class="card"><div class="card-top"><span class="rank">#'+(i+1)+' · '+escapeHtml(x.id)+'</span><span class="score">'+x.total+'/100</span></div><p class="meta">'+escapeHtml(x.franchise)+' · '+escapeHtml(x.format)+' · '+escapeHtml(x.aud)+'</p><h3>'+escapeHtml(x.title)+'</h3><p class="rationale">'+escapeHtml(x.problem)+'</p><div class="chips"><span class="chip accent">'+(x.kind==="trend"?"RESEARCH SIGNAL":"BACKLOG")+'</span><span class="chip">'+freshness(x.publishedAt)+'</span><span class="chip">Effort '+x.effort+'m</span></div><p class="evidence">'+escapeHtml(x.evidence||"Research and evidence still needed")+'</p><p class="meta">Confidence: '+escapeHtml(x.confidence||"Not assessed")+' · Relevance '+x.s.relevance+'/5 · Utility '+x.s.utility+'/5</p>'+(x.source?'<a class="source-link" href="'+escapeHtml(x.source)+'" target="_blank" rel="noopener">Source: '+escapeHtml(x.sourceName||"Read evidence")+' ↗</a>':'<span class="meta">No source attached - validate before factual claims</span>')+'<p class="hooks"><b>Hook directions</b><br>'+x.hooks.map(escapeHtml).join("<br>")+'</p><div class="card-footer"><span class="meta">Editorial estimate</span><button data-id="'+escapeHtml(x.id)+'">Copy for development</button></div></article>').join("")||'<div class="empty">No candidates match these filters.</div>';
}
function loadAll(){allCandidates=[...backlog,...trendCandidates];render();}
async function init(){
 $("feedStatus").textContent="LOADING REPOSITORY DATA";
 try{const response=await fetch("../IDEA-BANK.csv");if(!response.ok)throw new Error("CSV unavailable");backlog=parseCSV(await response.text());}
 catch(e){$("feedStatus").textContent="IMPORT IDEA BANK CSV";$("trendNotice").innerHTML="<strong>Automatic CSV loading is unavailable in this context.</strong> Use Import idea bank CSV. The engine will still work with a manually selected file.";}
 try{const response=await fetch("../../Social-Viral-Content-Engine/trend-watchlist.json");if(!response.ok)throw new Error("Trend list unavailable");const data=await response.json();trendCandidates=(data.candidates||[]).map(x=>({id:x.id,title:x.title,aud:x.audience_segment||"0-5",format:x.format||"Carousel",franchise:x.franchise||"AI x Design Lab",problem:x.audience_problem||"",hooks:x.hooks||[],source:x.source_url||"",sourceName:x.source_name||"Research source",publishedAt:x.published_at||"",confidence:x.evidence_confidence||"Not assessed",evidence:x.evidence_summary||"",kind:"trend",effort:x.format==="Reel"?30:60,s:x.scores||{}}));}
 catch(e){trendCandidates=[];}
 loadAll();
 $("feedStatus").textContent=backlog.length+" IDEAS · "+trendCandidates.length+" SIGNALS";
 if(trendCandidates.length===0)$("trendNotice").innerHTML="<strong>Trend watchlist unavailable.</strong> Backlog ranking is active; import the idea CSV or check the repository trend-watchlist.json.";
 else $("trendNotice").innerHTML="<strong>"+trendCandidates.length+" source-backed research signals loaded.</strong> These are timely research/product/career signals, not measured social virality trends. Scores are editorial estimates.";
}
$("csv").addEventListener("change",async e=>{const file=e.target.files?.[0];if(!file)return;try{backlog=parseCSV(await file.text());loadAll();$("feedStatus").textContent=backlog.length+" IMPORTED IDEAS";}catch(err){alert("CSV import failed: "+err.message);}});
$("reload").addEventListener("click",init);
["aud","fmt","source"].forEach(id=>$(id).addEventListener("change",render));
$("cards").addEventListener("click",async e=>{const button=e.target.closest("button[data-id]");if(!button)return;const item=allCandidates.find(x=>x.id===button.dataset.id);const text=[item.title,"Franchise: "+item.franchise,"Format: "+item.format,"Audience: "+item.aud,"Hooks:",...item.hooks,"Audience problem: "+item.problem,"Evidence: "+item.evidence,"Source: "+(item.source||"Needs verification"),"Next: add Amit's original perspective and verify claims."].join("\n");try{await navigator.clipboard.writeText(text);button.textContent="Copied";}catch{button.textContent="Copy unavailable";}});
init();
