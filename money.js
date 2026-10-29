const CATS=["flight","ferry","stay","activity","food","fuel","parking","shopping","other"];
const PRE=[
{id:"p-airnz",date:"2026-11-13",cat:"flight",amt:3610,cur:"AUD",st:"paid",note:"Air NZ JRI6WH · NZ126/NZ121 (approx. A$3,610)"},
{id:"p-ferry",date:"2026-11-19",cat:"ferry",amt:1197.60,cur:"NZD",st:"paid",note:"Interislander 70358454 · Mastercard ••5911"},
{id:"p-hob",date:"2026-11-16",cat:"activity",amt:325,cur:"NZD",st:"paid",note:"Hobbiton 3596428 · paid 12 Oct"},
{id:"p-rot",date:"2026-11-16",cat:"stay",amt:367.11,cur:"AUD",st:"upcoming",due:"2026-11-03",note:"Airbnb Rotorua HMTPHB5SYK · charge 3 Nov"},
{id:"p-por",date:"2026-11-18",cat:"stay",amt:212.44,cur:"AUD",st:"upcoming",due:"2026-11-09",note:"Airbnb Porirua HMKSTH2JFE · charge 9 Nov"},
{id:"p-kai",date:"2026-11-19",cat:"stay",amt:230.13,cur:"AUD",st:"upcoming",due:"2026-11-10",note:"Airbnb Kaikōura HMTW42XERN · charge 10 Nov"},
{id:"p-pp",date:"2026-11-20",cat:"stay",amt:191.95,cur:"AUD",st:"upcoming",due:"2026-11-11",note:"Airbnb Pleasant Point HMX9RCSNET · charge 11 Nov"},
{id:"p-jp",date:"2026-11-21",cat:"stay",amt:923.36,cur:"AUD",st:"upcoming",due:"2026-11-08",note:"Airbnb Jacks Point HMYWTA8MC4 · charge 8 Nov"},
{id:"p-chc",date:"2026-11-24",cat:"stay",amt:196.59,cur:"AUD",st:"upcoming",due:"2026-11-15",note:"Airbnb Christchurch HMXF8MSXXE · charge 15 Nov"}];
const M$={rate(){return parseFloat(localStorage.getItem("nz-rate")||"0.90")},user(){try{return JSON.parse(localStorage.getItem("nz-exp")||"[]")}catch(e){return []}},save(a){localStorage.setItem("nz-exp",JSON.stringify(a))}};
let DB;function idb(){return new Promise((res,rej)=>{if(DB)return res(DB);const r=indexedDB.open("nz-receipts",1);r.onupgradeneeded=()=>r.result.createObjectStore("r");r.onsuccess=()=>res(DB=r.result);r.onerror=()=>rej(r.error)})}
async function putR(id,blob){const d=await idb();return new Promise(r=>{const t=d.transaction("r","readwrite");t.objectStore("r").put(blob,id);t.oncomplete=r})}
async function getR(id){const d=await idb();return new Promise(r=>{const q=d.transaction("r").objectStore("r").get(id);q.onsuccess=()=>r(q.result);q.onerror=()=>r(null)})}
async function delR(id){const d=await idb();d.transaction("r","readwrite").objectStore("r").delete(id)}
function compress(file){return new Promise(res=>{const img=new Image();img.onload=()=>{const s=Math.min(1,1280/Math.max(img.width,img.height));const c=document.createElement("canvas");c.width=img.width*s;c.height=img.height*s;c.getContext("2d").drawImage(img,0,0,c.width,c.height);c.toBlob(b=>res(b),"image/jpeg",0.7);URL.revokeObjectURL(img.src)};img.src=URL.createObjectURL(file)})}
const toNZ=(e,r)=>e.cur==="NZD"?e.amt:e.amt/r, f2=x=>x.toLocaleString("en-NZ",{minimumFractionDigits:2,maximumFractionDigits:2});
let editId=null;
function allExp(){return PRE.concat(M$.user().map(u=>Object.assign({st:"paid"},u)))}
function renderMoney(){
 const r=M$.rate();document.getElementById("m-rate").value=r;
 const all=allExp().sort((a,b)=>a.date.localeCompare(b.date));
 let paid=0,up=0;const byC={},byD={};
 all.forEach(e=>{const v=toNZ(e,r);e.st==="upcoming"?up+=v:paid+=v;byC[e.cat]=(byC[e.cat]||0)+v;byD[e.date]=(byD[e.date]||0)+v});
 const T=paid+up;
 document.getElementById("m-tot").innerHTML=[["Paid so far",paid],["Upcoming",up],["Grand total",T]].map(([l,v])=>`<div class="stat"><b>NZ$${f2(v)}</b><span>${l} · A$${f2(v*r)}</span></div>`).join("");
 const bars=(o,lab)=>Object.entries(o).sort((a,b)=>b[1]-a[1]).map(([k,v])=>`<div class="mb"><div class="ml"><span>${lab(k)}</span><b>NZ$${f2(v)}</b></div><div class="bar"><i style="width:${100*v/T}%"></i></div></div>`).join("");
 document.getElementById("m-cat").innerHTML=bars(byC,k=>k[0].toUpperCase()+k.slice(1));
 document.getElementById("m-day").innerHTML=Object.keys(byD).sort().map(k=>`<div class="ml"><span>${new Date(k+"T00:00").toLocaleDateString("en-AU",{weekday:"short",day:"numeric",month:"short"})}</span><b>NZ$${f2(byD[k])}</b></div>`).join("");
 document.getElementById("m-list").innerHTML=all.map(e=>`<div class="me"><div><b>${e.cur==="NZD"?"NZ$":"A$"}${f2(e.amt)}</b> <span class="tg ${e.st==="upcoming"?"t":"b"}">${e.st==="upcoming"?"Upcoming "+(e.due||""):"Paid"}</span><div class="sub">${e.date} · ${e.cat}${e.note?" · "+esc(e.note):""}</div>${e.rc?`<button class="lnk" data-rc="${e.id}">📷 Receipt</button>`:""}</div>${e.id.startsWith("p-")?"":`<div class="row"><button class="btn ghost sm" data-ed="${e.id}">Edit</button><button class="btn ghost sm" data-dl="${e.id}">Delete</button></div>`}</div>`).join("");
}
function initMoney(){
 const $m=id=>document.getElementById(id);
 $m("m-cat-in").innerHTML=["food","fuel","activity","stay","parking","shopping","other"].map(c=>`<option>${c}</option>`).join("");
 const reset=()=>{editId=null;$m("m-date").value=new Date().toISOString().slice(0,10);$m("m-amt").value="";$m("m-note").value="";$m("m-photo").value="";$m("m-save").textContent="Add expense"};reset();
 $m("m-rate").oninput=e=>{const v=parseFloat(e.target.value);if(v>0){localStorage.setItem("nz-rate",v);renderMoney()}};
 $m("m-save").onclick=async()=>{const amt=parseFloat($m("m-amt").value);if(!(amt>0)){alert("Enter an amount");return}
  const a=M$.user();const id=editId||("u-"+Date.now());const f=$m("m-photo").files[0];let rc=(a.find(x=>x.id===id)||{}).rc||false;
  if(f){await putR(id,await compress(f));rc=true}
  const e={id,date:$m("m-date").value,cat:$m("m-cat-in").value,amt,cur:$m("m-cur").value,note:$m("m-note").value,rc,st:"paid"};
  const i=a.findIndex(x=>x.id===id);i>=0?a[i]=e:a.push(e);M$.save(a);reset();renderMoney()};
 $m("m-list").onclick=async ev=>{const t=ev.target;const a=M$.user();
  if(t.dataset.dl){if(!confirm("Delete this expense?"))return;M$.save(a.filter(x=>x.id!==t.dataset.dl));delR(t.dataset.dl);renderMoney()}
  if(t.dataset.ed){const e=a.find(x=>x.id===t.dataset.ed);editId=e.id;$m("m-date").value=e.date;$m("m-cat-in").value=e.cat;$m("m-amt").value=e.amt;$m("m-cur").value=e.cur;$m("m-note").value=e.note||"";$m("m-save").textContent="Save changes";$m("m-form").scrollIntoView({behavior:"smooth"})}
  if(t.dataset.rc){const b=await getR(t.dataset.rc);if(b){const u=URL.createObjectURL(b);$m("m-img").src=u;$m("m-view").style.display="flex"}}};
 $m("m-view").onclick=()=>{$m("m-view").style.display="none"};
 $m("m-csv").onclick=()=>{const r=M$.rate();const rows=[["date","category","amount","currency","amount_nzd","amount_aud","status","due","note"]].concat(allExp().map(e=>{const v=toNZ(e,r);return [e.date,e.cat,e.amt,e.cur,v.toFixed(2),(v*r).toFixed(2),e.st,e.due||"",e.note||""]}));
  const csv=rows.map(r=>r.map(x=>`"${String(x).replace(/"/g,'""')}"`).join(",")).join("\n");const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([csv],{type:"text/csv"}));a.download="nz-trip-expenses.csv";a.click()};
 renderMoney();
}
