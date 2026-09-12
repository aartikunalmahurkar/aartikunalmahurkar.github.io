document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Mobile navigation
  const menu = document.getElementById("menu");
  const nav = document.getElementById("nav");

  const closeMenu = () => {
    if (!menu || !nav) return;
    nav.classList.remove("open");
    menu.classList.remove("open");
    menu.setAttribute("aria-expanded", "false");
    menu.setAttribute("aria-label", "Open menu");
    menu.textContent = "☰";
    document.body.classList.remove("menu-lock");
  };

  const openMenu = () => {
    if (!menu || !nav) return;
    nav.classList.add("open");
    menu.classList.add("open");
    menu.setAttribute("aria-expanded", "true");
    menu.setAttribute("aria-label", "Close menu");
    menu.textContent = "×";
    document.body.classList.add("menu-lock");
  };

  if (menu && nav) {
    menu.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      nav.classList.contains("open") ? closeMenu() : openMenu();
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", (event) => {
      if (
        nav.classList.contains("open") &&
        !nav.contains(event.target) &&
        !menu.contains(event.target)
      ) {
        closeMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 980) closeMenu();
    });
  }

  // Portfolio assistant
  const panel = document.getElementById("chatPanel");
  const messages = document.getElementById("chatMessages");
  const input = document.getElementById("chatInput");
  const close = document.getElementById("chatClose");
  const form = document.getElementById("chatForm");

  const openChat = () => {
    if (!panel) return;
    closeMenu();
    panel.classList.add("open");
    panel.setAttribute("aria-hidden", "false");
    document.body.classList.add("chat-lock");
    window.setTimeout(() => input?.focus(), 80);
  };

  const closeChat = () => {
    if (!panel) return;
    panel.classList.remove("open");
    panel.setAttribute("aria-hidden", "true");
    document.body.classList.remove("chat-lock");
  };

  document.querySelectorAll(".chat-open").forEach((button) => {
    button.addEventListener("click", openChat);
  });

  if (close) close.addEventListener("click", closeChat);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeChat();
      closeMenu();
    }
  });

  const knowledge = [
    {
      keys: ["current", "role", "now", "do"],
      answer:
        "Aarti currently works as an Operations Excellence Specialist supporting CRE Sales Enablement at Dassault Systèmes Global Services. Her work includes SOLIDWORKS University certification requests, reseller KPI support, dashboard-related backend activities and learning content."
    },
    {
      keys: ["tool", "skill", "software", "learning"],
      answer:
        "Her toolkit includes 3DEXPERIENCE, Articulate 360, Storyline, Review 360, Natural Reader, Camtasia, Excel, Teamcenter and foundational SQL."
    },
    {
      keys: ["career", "experience", "journey", "worked"],
      answer:
        "Aarti’s journey moved from Dispatch Supervisor to PLM Intern, then Operations Excellence Associate and Operations Excellence Specialist."
    },
    {
      keys: ["education", "degree", "college"],
      answer:
        "Aarti completed a B.Tech in Mechanical Engineering from SGGS Nanded in 2020 with a CGPA of 7.37."
    },
    {
      keys: ["solidworks", "reseller", "certification", "partner"],
      answer:
        "She supports reseller certification-related requests around SOLIDWORKS University and helps partners with enablement activities connected to KPI progress."
    },
    {
      keys: ["course", "content", "articulate", "storyline", "camtasia"],
      answer:
        "She creates digital learning content for resellers and internal employees using Articulate Storyline, Review 360, Natural Reader and Camtasia."
    },
    {
      keys: ["role fit", "roles", "job", "fit"],
      answer:
        "Her strongest fit is in Operations Excellence, Partner or Reseller Enablement, Learning Experience, Sales Enablement Operations, Customer Education and Program or Enablement Operations roles."
    },
    {
      keys: ["contact", "email", "linkedin", "reach"],
      answer:
        "You can reach Aarti at aartigaikwad110@gmail.com or connect on LinkedIn at linkedin.com/in/aartigaikwad110/."
    }
  ];

  const addMessage = (text, who) => {
    if (!messages) return;
    const bubble = document.createElement("div");
    bubble.className = `bubble ${who}`;
    bubble.textContent = text;
    messages.appendChild(bubble);
    messages.scrollTop = messages.scrollHeight;
  };

  const getAnswer = (question) => {
    const text = question.toLowerCase();
    let best = null;
    let score = 0;

    knowledge.forEach((item) => {
      const current = item.keys.filter((key) => text.includes(key)).length;
      if (current > score) {
        score = current;
        best = item;
      }
    });

    return best
      ? best.answer
      : "I can answer questions about Aarti’s current role, experience, partner enablement, learning-content work, tools, education and role fit.";
  };

  if (form && input) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const question = input.value.trim();
      if (!question) return;
      addMessage(question, "user");
      input.value = "";
      window.setTimeout(() => addMessage(getAnswer(question), "bot"), 160);
    });
  }

  document.querySelectorAll(".quick-prompts button").forEach((button) => {
    button.addEventListener("click", () => {
      const question = button.dataset.q || button.textContent.trim();
      addMessage(question, "user");
      window.setTimeout(() => addMessage(getAnswer(question), "bot"), 160);
    });
  });

  // Aarti OS interactive role lens
  const lensData = {
    enablement: {
      idx: "01",
      title: "Turn questions into confident action.",
      text:
        "For partners and resellers, the value is not simply answering a request. It is making the path forward clear enough that they can keep moving with confidence.",
      proof: "Certification support • KPI guidance • Partner-facing coordination"
    },
    learning: {
      idx: "02",
      title: "Turn information into an experience people can use.",
      text:
        "Learning content works when it reduces confusion and helps someone perform a task. I focus on flow, clarity, review and practical usability.",
      proof: "Storyline • Review 360 • Natural Reader • Camtasia"
    },
    operations: {
      idx: "03",
      title: "Turn recurring work into a dependable rhythm.",
      text:
        "Operations excellence is the layer that keeps work moving consistently. I value visibility, follow-through and simple processes people can trust.",
      proof: "Dashboard support • Backend activities • Recurring execution"
    }
  };

  const lensButtons = document.querySelectorAll(".lens-btn");
  const lensTitle = document.getElementById("lensTitle");
  const lensText = document.getElementById("lensText");
  const lensProof = document.getElementById("lensProof");
  const lensIndex = document.querySelector(".lens-index");

  lensButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const data = lensData[button.dataset.lens];
      if (!data) return;

      lensButtons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");

      if (lensTitle) lensTitle.textContent = data.title;
      if (lensText) lensText.textContent = data.text;
      if (lensProof) lensProof.textContent = data.proof;
      if (lensIndex) lensIndex.textContent = data.idx;
    });
  });
});