document.getElementById("year").textContent = new Date().getFullYear();
const panel=document.getElementById("chatPanel");
const messages=document.getElementById("chatMessages");
const input=document.getElementById("chatInput");
document.querySelectorAll(".chat-open").forEach(b=>b.addEventListener("click",()=>{panel.classList.add("open");panel.setAttribute("aria-hidden","false");setTimeout(()=>input.focus(),100)}));
document.getElementById("chatClose").addEventListener("click",()=>{panel.classList.remove("open");panel.setAttribute("aria-hidden","true")});
const kb=[
 {k:["current","role","now","do"],a:"Aarti currently works as an Operations Excellence Specialist supporting the CRE Sales Enablement organization at Dassault Systèmes Global Services. Her work includes SOLIDWORKS University certification requests, reseller KPI support, dashboard-related backend activities and learning content."},
 {k:["tool","skill","software"],a:"Her tools include 3DEXPERIENCE, MS Office, Excel, Articulate 360, Storyline, Review 360, Natural Reader, Camtasia, Teamcenter and foundational SQL/Java exposure."},
 {k:["career","experience","journey","worked"],a:"Aarti progressed from Dispatch Supervisor to PLM Intern, then to Operations Excellence Associate and Operations Excellence Specialist at Dassault Systèmes Global Services."},
 {k:["education","degree","college"],a:"Aarti completed a B.Tech in Mechanical Engineering from SGGS Nanded in 2020 with a CGPA of 7.37."},
 {k:["solidworks","reseller","certification"],a:"She supports resellers with SOLIDWORKS University certification-related requests and helps them work toward enablement KPIs."},
 {k:["course","learning","articulate","storyline"],a:"She develops learning content for resellers and internal employees using Articulate Storyline, Review 360, Natural Reader and Camtasia."},
 {k:["linkedin","profile","social"],a:"You can view Aarti’s LinkedIn profile at linkedin.com/in/aartigaikwad110/."},
 {k:["contact","email","reach"],a:"You can reach Aarti at aartigaikwad110@gmail.com or connect with her on LinkedIn at linkedin.com/in/aartigaikwad110/."}
];
function add(text,who){const d=document.createElement("div");d.className="bubble "+who;d.textContent=text;messages.appendChild(d);messages.scrollTop=messages.scrollHeight}
function answer(q){const s=q.toLowerCase();let best=null,score=0;for(const item of kb){const c=item.k.filter(k=>s.includes(k)).length;if(c>score){score=c;best=item}}return best?best.a:"I can answer questions about Aarti’s current role, career journey, SOLIDWORKS University work, tools, learning-content experience, education and contact details."}
document.getElementById("chatForm").addEventListener("submit",e=>{e.preventDefault();const q=input.value.trim();if(!q)return;add(q,"user");input.value="";setTimeout(()=>add(answer(q),"bot"),180)});
document.querySelectorAll(".quick-prompts button").forEach(b=>b.addEventListener("click",()=>{const q=b.dataset.q;add(q,"user");setTimeout(()=>add(answer(q),"bot"),180)}));