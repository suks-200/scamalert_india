// script.js (MODULE)

// 🔥 FIREBASE IMPORTS
import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

// --------------------
// DOM ELEMENTS
// --------------------
const feed = document.getElementById("feed");
const trending = document.getElementById("trending");
const topList = document.getElementById("topList");
const searchBar = document.getElementById("searchBar");
const officialContainer = document.getElementById("officialLinks");
const form = document.getElementById("userScamForm");

// --------------------
// 1️⃣ LOAD LOCAL SCAM DATA (data.js)
// --------------------
scams.forEach(s => {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <h3>${s.title}</h3>
    <p>${s.platform} | ${s.city}</p>
    <p>💸 ₹${s.amount}</p>
    <small>${s.desc}</small>
  `;
  feed.appendChild(card);
  trending.appendChild(card.cloneNode(true));
});

// --------------------
// 2️⃣ TOP 20 SCAMS
// --------------------
top20.forEach(t => {
  const li = document.createElement("li");
  li.innerText = t;
  topList.appendChild(li);
});

// --------------------
// 3️⃣ SEARCH FILTER
// --------------------
searchBar.addEventListener("input", e => {
  const v = e.target.value.toLowerCase();
  document.querySelectorAll(".card").forEach(c => {
    c.style.display = c.innerText.toLowerCase().includes(v)
      ? "block"
      : "none";
  });
});

// --------------------
// 4️⃣ USER SCAM SUBMIT → FIREBASE
// --------------------
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const city = form[0].value;
  const type = form[1].value;
  const amount = form[2].value;
  const desc = form[3].value;

  await addDoc(collection(db, "scamReports"), {
    city,
    type,
    amount,
    desc,
    createdAt: serverTimestamp()
  });

  alert("✅ Scam reported successfully!");
  form.reset();
});

// --------------------
// 5️⃣ LIVE FIREBASE SCAM FEED
// --------------------
const scamQuery = query(
  collection(db, "scamReports"),
  orderBy("createdAt", "desc")
);

onSnapshot(scamQuery, snapshot => {
  snapshot.forEach(doc => {
    const d = doc.data();

    const card = document.createElement("div");
    card.className = "card firebase";
    card.innerHTML = `
      <h3>${d.type} (User Report)</h3>
      <p>📍 ${d.city}</p>
      <p>💸 ₹${d.amount || "N/A"}</p>
      <small>${d.desc}</small>
    `;
    feed.prepend(card);
  });
});

// --------------------
// 6️⃣ WHAT SHOULD I DO? (SMART ANSWERS)
// --------------------
window.answerQuestion = function () {
  const q = document.getElementById("userQuestion").value.toLowerCase();
  let ans = `
📞 Call 1930 immediately  
🌐 Report on cybercrime.gov.in  
🏦 Inform your bank
`;

  if (q.includes("upi")) {
    ans = `
🚨 UPI Scam Steps:
❌ Never approve requests  
📞 Call 1930  
🏦 Change UPI PIN  
🌐 cybercrime.gov.in
`;
  }

  if (q.includes("job")) {
    ans = `
🚨 Job Scam Alert:
❌ No job asks money  
📞 Report number  
🌐 cybercrime.gov.in
`;
  }

  if (q.includes("loan")) {
    ans = `
🚨 Loan App Scam:
❌ Uninstall app  
🚫 Revoke permissions  
📞 Call 1930
`;
  }

  document.getElementById("answerBox").innerHTML = ans;
};

// --------------------
// 7️⃣ OFFICIAL LINKS RENDER
// --------------------
officialResources.forEach(r => {
  const card = document.createElement("div");
  card.className = "official-card";
  card.innerHTML = `
    <h3>${r.name}</h3>
    <p>${r.desc}</p>
    <span class="tag">${r.category}</span>
    <a href="${r.url}" target="_blank">Visit Official Site ↗</a>
  `;
  officialContainer.appendChild(card);
});