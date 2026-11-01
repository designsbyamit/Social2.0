const presets={
 statement:[
  ["HOOK","Your Figma skills won't save your design career."],
  ["TENSION","Making screens is getting easier."],
  ["INSIGHT 01","Production is becoming faster."],
  ["INSIGHT 02","Competition is becoming tougher."],
  ["TAKEAWAY","Your judgement is becoming more valuable."],
  ["CTA","Become a better thinker. Follow for more."]
 ],
 tips:[
  ["HOOK","3 ways to use AI without outsourcing your thinking."],
  ["TIP 01","Use it to organise messy research notes."],
  ["TIP 02","Ask it to challenge your assumptions."],
  ["TIP 03","Use it to explore alternatives, then judge them."],
  ["TAKEAWAY","AI can expand your thinking. It cannot own your judgement."],
  ["CTA","Save this for your next project."]
 ],
 framework:[
  ["HOOK","Before you design, frame the problem."],
  ["STEP 01","Discover the context."],
  ["STEP 02","Define the real user need."],
  ["STEP 03","Design options, not just screens."],
  ["STEP 04","Demonstrate what changed."],
  ["CTA","Try the 4D loop on your next brief."]
 ]
};
let frames=[];let timer=null;let current=0;let scale=100;
const $=id=>document.getElementById(id);
function loadPreset(name){frames=presets[name].map(x=>({label:x[0],text:x[1],seconds:3}));renderFrames();showFrame(0)}
function renderFrames(){
 $("frames").innerHTML="";
 frames.forEach((f,i)=>{
  const el=document.createElement("div");el.className="frame";
  el.innerHTML='<div class="frame-head"><span>FRAME '+String(i+1).padStart(2,"0")+' / '+escapeHtml(f.label)+'</span><button class="remove" type="button">Remove</button></div><textarea aria-label="Frame text"></textarea><input aria-label="Frame label" placeholder="Small label">';
  el.querySelector("textarea").value=f.text;el.querySelector("textarea").addEventListener("input",e=>{frames[i].text=e.target.value;if(i===current)showFrame(i)});
  el.querySelector("input").value=f.label;el.querySelector("input").addEventListener("input",e=>{frames[i].label=e.target.value});
  el.querySelector(".remove").addEventListener("click",()=>{frames.splice(i,1);renderFrames();showFrame(Math.min(current,frames.length-1))});
  $("frames").appendChild(el);
 });
}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function showFrame(index){
 if(!frames.length){$("stageCopy").innerHTML="<h2>Add a frame<br><em>to begin.</em></h2>";$("counter").textContent="00 / 00";return}
 current=Math.max(0,Math.min(index,frames.length-1));const f=frames[current];
 const words=escapeHtml(f.text).replace(/\n/g,"<br>");
 $("stageCopy").innerHTML='<span class="kicker">'+escapeHtml(f.label||"AMIT 2.0")+'</span><h2>'+words+'</h2>';
 $("counter").textContent=String(current+1).padStart(2,"0")+" / "+String(frames.length).padStart(2,"0");
 $("stageCopy").style.animation="none";void $("stageCopy").offsetWidth;$("stageCopy").style.animation="enter .5s ease both";
}
function stop(){if(timer){clearInterval(timer);timer=null}}
function play(){stop();showFrame(0);let i=0;timer=setInterval(()=>{i++;if(i>=frames.length){stop();return}showFrame(i)},3000)}
$("template").addEventListener("change",e=>{stop();loadPreset(e.target.value)});
$("accent").addEventListener("change",e=>{$("stage").classList.remove("accent-sage","accent-paper");if(e.target.value!=="orange")$("stage").classList.add("accent-"+e.target.value)});
$("scale").addEventListener("input",e=>{$("stageCopy").style.transform="scale("+Number(e.target.value)/100+")";scale=Number(e.target.value)});
$("addFrame").addEventListener("click",()=>{frames.push({label:"NEW FRAME",text:"Write one clear idea.",seconds:3});renderFrames();showFrame(frames.length-1)});
$("preview").addEventListener("click",play);$("restart").addEventListener("click",()=>{stop();showFrame(0)});
$("reset").addEventListener("click",()=>{stop();loadPreset($("template").value)});
loadPreset("statement");
