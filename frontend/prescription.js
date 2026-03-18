const openBtn = document.getElementById("open-prescription");
const modal = document.getElementById("rx-modal");
const closeBtn = document.getElementById("close-rx");

openBtn.addEventListener("click", () => {
  modal.style.display = "flex";

  gsap.from(".rx-modal-content", {
    y: 50,
    opacity: 0,
    duration: 0.6
  });
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

const products = {
    oily: [
  {
    name: "CeraVe Foaming Facial Cleanser",
    desc: "Removes excess oil without damaging barrier",
    link: "https://www.amazon.in/s?k=CeraVe+Foaming+Facial+Cleanser"
  },
  {
    name: "The Ordinary Niacinamide 10% + Zinc",
    desc: "Controls oil & minimizes pores",
    link: "https://www.amazon.in/s?k=The+Ordinary+Niacinamide+10%25+Zinc"
  },
  {
    name: "Neutrogena Hydro Boost Water Gel",
    desc: "Lightweight oil-free hydration",
    link: "https://www.amazon.in/s?k=Neutrogena+Hydro+Boost+Water+Gel"
  },
  {
    name: "La Roche-Posay Anthelios SPF 50 Gel",
    desc: "Oil-free sunscreen for acne-prone skin",
    link: "https://www.amazon.in/s?k=La+Roche+Posay+Anthelios+SPF+50+Gel"
  },
  {
    name: "Differin Gel (Adapalene 0.1%)",
    desc: "Dermatologist-approved acne treatment",
    link: "https://www.amazon.in/s?k=Differin+Gel+Adapalene+0.1"
  }
],

   acne: [
  {
    name: "Cetaphil Oily Skin Cleanser",
    desc: "Gentle cleanser for acne-prone skin",
    link: "https://www.amazon.in/s?k=Cetaphil+Oily+Skin+Cleanser"
  },
  {
    name: "Paula’s Choice 2% BHA Liquid Exfoliant",
    desc: "Unclogs pores and treats acne",
    link: "https://www.amazon.in/s?k=Paulas+Choice+2%25+BHA+Liquid+Exfoliant"
  },
  {
    name: "Benzoyl Peroxide 2.5% Gel",
    desc: "Kills acne-causing bacteria",
    link: "https://www.amazon.in/s?k=Benzoyl+Peroxide+2.5%25+Gel"
  },
  {
    name: "Differin Gel (Adapalene 0.1%)",
    desc: "Prevents breakouts and clears acne",
    link: "https://www.amazon.in/s?k=Differin+Gel+Adapalene+0.1"
  },
  {
    name: "Neutrogena Clear Face Sunscreen SPF 50",
    desc: "Non-comedogenic sun protection",
    link: "https://www.amazon.in/s?k=Neutrogena+Clear+Face+Sunscreen+SPF+50"
  }
],

dry: [
  {
    name: "CeraVe Hydrating Cleanser",
    desc: "Cleans without stripping moisture",
    link: "https://www.amazon.in/s?k=CeraVe+Hydrating+Cleanser"
  },
  {
    name: "Hyaluronic Acid 2% Serum",
    desc: "Deep hydration boost",
    link: "https://www.amazon.in/s?k=Hyaluronic+Acid+2%25+Serum"
  },
  {
    name: "CeraVe Moisturizing Cream",
    desc: "Rich ceramide-based hydration",
    link: "https://www.amazon.in/s?k=CeraVe+Moisturizing+Cream"
  },
  {
    name: "Cetaphil Moisturizing Lotion",
    desc: "Daily gentle hydration",
    link: "https://www.amazon.in/s?k=Cetaphil+Moisturizing+Lotion"
  },
  {
    name: "La Roche-Posay Lipikar Balm",
    desc: "Repairs dry skin barrier",
    link: "https://www.amazon.in/s?k=La+Roche+Posay+Lipikar+Balm"
  }
],
 sensitive: [
  {
    name: "Avene Extremely Gentle Cleanser",
    desc: "Soothes and cleans sensitive skin",
    link: "https://www.amazon.in/s?k=Avene+Extremely+Gentle+Cleanser"
  },
  {
    name: "La Roche-Posay Toleriane Moisturizer",
    desc: "Calms irritation & strengthens barrier",
    link: "https://www.amazon.in/s?k=La+Roche+Posay+Toleriane+Moisturizer"
  },
  {
    name: "Aloe Vera Soothing Gel",
    desc: "Natural calming and cooling effect",
    link: "https://www.amazon.in/s?k=Aloe+Vera+Soothing+Gel"
  },
  {
    name: "Centella Asiatica Serum",
    desc: "Reduces redness and inflammation",
    link: "https://www.amazon.in/s?k=Centella+Asiatica+Serum"
  },
  {
    name: "EltaMD UV Clear SPF 46",
    desc: "Gentle sunscreen for sensitive skin",
    link: "https://www.amazon.in/s?k=EltaMD+UV+Clear+SPF+46"
  }
]
};

const buttons = document.querySelectorAll(".skin-btn");
const container = document.getElementById("rx-products");

buttons.forEach(btn => {
  btn.addEventListener("click", () => {

    buttons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const type = btn.dataset.type;
    showProducts(type);
  });
});

function showProducts(type) {
  container.innerHTML = "";

  products[type].forEach(p => {
    const div = document.createElement("div");
    div.classList.add("rx-card");

    div.innerHTML = `
      <div>
        <strong>${p.name}</strong>
        <p style="font-size:12px;color:#64748B;">${p.desc}</p>
      </div>
      <span>🛒</span>
    `;

    div.addEventListener("click", () => {
      window.open(p.link, "_blank", "noopener,noreferrer");
    });

    container.appendChild(div);
  });

  gsap.from(".rx-card", {
    y: 30,
    opacity: 0,
    stagger: 0.15
  });
}


gsap.from(".glow-hero", {
  y: 40,
  opacity: 0,
  duration: 1,
  ease: "power3.out"
});

gsap.from(".glow-overlay h1", {
  y: 20,
  opacity: 0,
  delay: 0.3,
  duration: 0.8
});

gsap.from(".glow-overlay p", {
  y: 20,
  opacity: 0,
  delay: 0.5,
  duration: 0.8
});