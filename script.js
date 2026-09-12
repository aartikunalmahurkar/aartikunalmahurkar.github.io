document.getElementById("year").textContent = new Date().getFullYear();

const panel = document.getElementById("chatPanel");
const closeBtn = document.getElementById("chatClose");
const messages = document.getElementById("chatMessages");
const form = document.getElementById("chatForm");
const input = document.getElementById("chatInput");

document.querySelectorAll(".chat-open").forEach(btn => btn.addEventListener("click", () => {
  panel.classList.add("open");
  panel.setAttribute("aria-hidden","false");
  setTimeout(()=>input.focus(),100);
}));
closeBtn.addEventListener("click", () => {
  panel.classList.remove("open");
  panel.setAttribute("aria-hidden","true");
});

function addBubble(text, who="bot"){
  const div = document.createElement("div");
  div.className = `${who} bubble`;
  div.textContent = text;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

const answers = [
  {keys:["current","now","role","do"], text:"Aarti currently works as an Operations Excellence Specialist supporting the CRE Sales Enablement organization at Dassault Systèmes Global Services. Her work includes SOLIDWORKS University certification requests, reseller KPI support, dashboard-related backend activities and learning content."},
  {keys:["tool","software","technology","skills"], text:"Her tools include 3DEXPERIENCE, MS Office, Excel, Articulate 360, Storyline, Review 360, Natural Reader, Camtasia, Teamcenter and foundational SQL/Java exposure."},
  {keys:["experience","career","journey","worked"], text:"Her career progressed from Dispatch Supervisor to PLM Intern, then Operations Excellence Associate and Operations Excellence Specialist at Dassault Systèmes Global Services."},
  {keys:["education","degree","college","study"], text:"Aarti completed B.Tech in Mechanical Engineering from SGGS Nanded in 2020 with a CGPA of 7.37."},
  {keys:["solidworks","certification","reseller"], text:"Aarti supports resellers with SOLIDWORKS University certification-related requests and helps them work toward their enablement KPIs."},
  {keys:["course","learning","articulate","storyline"], text:"She develops learning content for resellers and internal employees using tools such as Articulate Storyline, Review 360 and Natural Reader."},
  {keys:["contact","email","reach"], text:"You can reach Aarti at aartigaikwad110@gmail.com."}
];

function answerQuestion(q){
  const s = q.toLowerCase();
  let best = null, score = 0;
  for(const item of answers){
    const count = item.keys.filter(k => s.includes(k)).length;
    if(count > score){score = count; best = item;}
  }
  if(best) return best.text;
  return "I can answer questions about Aarti’s current role, SOLIDWORKS University work, learning-content experience, tools, career journey, education and contact details. Try asking one of those.";
}

form.addEventListener("submit", e => {
  e.preventDefault();
  const q = input.value.trim();
  if(!q) return;
  addBubble(q,"user");
  input.value="";
  setTimeout(()=>addBubble(answerQuestion(q)),250);
});

document.querySelectorAll(".quick-prompts button").forEach(btn => {
  btn.addEventListener("click", () => {
    const q = btn.dataset.q;
    addBubble(q,"user");
    setTimeout(()=>addBubble(answerQuestion(q)),250);
  });
});