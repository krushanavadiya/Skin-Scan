document.getElementById('year').textContent = new Date().getFullYear();

const PRODUCTS = {
  oily: [
    { icon: '🫧', brand: 'CeraVe', name: 'Foaming Facial Cleanser', desc: 'Removes excess oil without disrupting the skin barrier. Contains niacinamide and hyaluronic acid.', tag: 'AM / PM', link: 'https://www.amazon.in/s?k=CeraVe+Foaming+Facial+Cleanser' },
    { icon: '🧪', brand: 'The Ordinary', name: 'Niacinamide 10% + Zinc 1%', desc: 'Regulates sebum, minimises pores, and reduces blemish-causing congestion.', tag: 'AM / PM serum', link: 'https://www.amazon.in/s?k=The+Ordinary+Niacinamide+10+Zinc' },
    { icon: '💦', brand: 'Neutrogena', name: 'Hydro Boost Water Gel', desc: 'Oil-free gel moisturiser with hyaluronic acid. Hydrates without any greasy residue.', tag: 'Daily', link: 'https://www.amazon.in/s?k=Neutrogena+Hydro+Boost+Water+Gel' },
    { icon: '✨', brand: "Paula's Choice", name: 'Skin Perfecting 2% BHA', desc: 'Oil-soluble salicylic acid exfoliant that unclogs and minimises pores. Use 2–3× weekly.', tag: '2–3× / wk', link: 'https://www.amazon.in/s?k=Paulas+Choice+BHA+2+percent' },
    { icon: '🌤️', brand: 'La Roche-Posay', name: 'Anthelios SPF 50 Gel', desc: 'Oil-free, matte-finish sunscreen that won\'t cause breakouts. Lightweight formula.', tag: 'AM only', link: 'https://www.amazon.in/s?k=La+Roche+Posay+Anthelios+SPF+50+Gel' },
  ],
  dry: [
    { icon: '🌿', brand: 'CeraVe', name: 'Hydrating Cleanser', desc: 'Creamy, non-foaming cleanser that cleans without stripping your lipid barrier.', tag: 'AM / PM', link: 'https://www.amazon.in/s?k=CeraVe+Hydrating+Cleanser' },
    { icon: '💧', brand: 'The Ordinary', name: 'Hyaluronic Acid 2% + B5', desc: 'Multi-weight HA serum that draws moisture into all layers of the skin. Apply on damp skin.', tag: 'AM / PM serum', link: 'https://www.amazon.in/s?k=The+Ordinary+Hyaluronic+Acid' },
    { icon: '🧴', brand: 'CeraVe', name: 'Moisturising Cream', desc: 'Rich ceramide and hyaluronic acid cream. Seals moisture and supports barrier repair overnight.', tag: 'Daily', link: 'https://www.amazon.in/s?k=CeraVe+Moisturizing+Cream' },
    { icon: '🌙', brand: 'La Roche-Posay', name: 'Lipikar Balm AP+', desc: 'Intense barrier-repair balm for very dry or eczema-prone skin. Use as last PM step.', tag: 'PM only', link: 'https://www.amazon.in/s?k=La+Roche+Posay+Lipikar+Balm' },
    { icon: '🌤️', brand: 'Neutrogena', name: 'Sheer Zinc SPF 50', desc: 'Mineral sunscreen gentle enough for dry, reactive skin. Non-comedogenic and fragrance-free.', tag: 'AM only', link: 'https://www.amazon.in/s?k=Neutrogena+Sheer+Zinc+SPF+50' },
  ],
  combination: [
    { icon: '🫧', brand: 'La Roche-Posay', name: 'Toleriane Purifying Cleanser', desc: 'Balanced gel cleanser that removes T-zone oil without drying out the cheeks.', tag: 'AM / PM', link: 'https://www.amazon.in/s?k=La+Roche+Posay+Toleriane+Purifying' },
    { icon: '🧪', brand: 'The Ordinary', name: 'Niacinamide 10% + Zinc 1%', desc: 'Balances oil on the T-zone and improves overall skin tone without affecting dry areas.', tag: 'AM / PM serum', link: 'https://www.amazon.in/s?k=The+Ordinary+Niacinamide+10+Zinc' },
    { icon: '💦', brand: 'Neutrogena', name: 'Hydro Boost Water Gel', desc: 'Lightweight enough for T-zone; apply a richer cream on cheeks on top.', tag: 'T-zone daily', link: 'https://www.amazon.in/s?k=Neutrogena+Hydro+Boost+Water+Gel' },
    { icon: '✨', brand: "Paula's Choice", name: 'Skin Perfecting 2% BHA', desc: 'Spot-apply on T-zone only to keep pores clear without over-drying cheeks.', tag: '2× / wk · T-zone', link: 'https://www.amazon.in/s?k=Paulas+Choice+BHA+2+percent' },
    { icon: '🌤️', brand: 'Bioré', name: 'UV Aqua Rich SPF 50+', desc: 'Ultra-lightweight watery SPF. Works brilliantly as the last AM step for combination skin.', tag: 'AM only', link: 'https://www.amazon.in/s?k=Biore+UV+Aqua+Rich+SPF+50' },
  ],
  sensitive: [
    { icon: '🌸', brand: 'Avène', name: 'Extremely Gentle Cleanser', desc: 'Soap-free, fragrance-free formula that cleans without any stinging or redness.', tag: 'AM / PM', link: 'https://www.amazon.in/s?k=Avene+Extremely+Gentle+Cleanser' },
    { icon: '🌿', brand: 'La Roche-Posay', name: 'Toleriane Moisturiser', desc: 'Fragrance-free, minimal-ingredient daily moisturiser that calms reactive skin.', tag: 'Daily', link: 'https://www.amazon.in/s?k=La+Roche+Posay+Toleriane+Moisturiser' },
    { icon: '🩹', brand: 'COSRX', name: 'Centella Blemish Cream', desc: 'Cica-based spot treatment that calms redness and supports barrier healing without irritation.', tag: 'Spot treatment', link: 'https://www.amazon.in/s?k=COSRX+Centella+Blemish+Cream' },
    { icon: '🌙', brand: 'Dr. Jart+', name: 'Cicapair Tiger Grass Serum', desc: 'Centella-rich calming serum that visibly reduces redness and soothes reactive skin overnight.', tag: 'PM serum', link: 'https://www.amazon.in/s?k=Dr+Jart+Cicapair+Tiger+Grass+Serum' },
    { icon: '🌤️', brand: 'EltaMD', name: 'UV Clear SPF 46', desc: 'Mineral-chemical hybrid SPF loved by dermatologists for sensitive and rosacea-prone skin.', tag: 'AM only', link: 'https://www.amazon.in/s?k=EltaMD+UV+Clear+SPF+46' },
  ],
  acne: [
    { icon: '🫧', brand: 'Cetaphil', name: 'Oily Skin Cleanser', desc: 'Mild, non-comedogenic cleanser designed for acne-prone skin. Gentle enough for twice-daily use.', tag: 'AM / PM', link: 'https://www.amazon.in/s?k=Cetaphil+Oily+Skin+Cleanser' },
    { icon: '✨', brand: "Paula's Choice", name: 'Skin Perfecting 2% BHA', desc: 'Salicylic acid serum that dissolves inside the pore lining and clears congestion from the root.', tag: 'PM exfoliant', link: 'https://www.amazon.in/s?k=Paulas+Choice+BHA+2+percent' },
    { icon: '🎯', brand: 'Benzac', name: 'Benzoyl Peroxide 2.5% Gel', desc: 'Kills acne-causing bacteria on contact. Start at 2.5% to minimise dryness and irritation.', tag: 'Spot treatment', link: 'https://www.amazon.in/s?k=Benzac+Benzoyl+Peroxide+2.5' },
    { icon: '🧴', brand: 'Differin', name: 'Adapalene 0.1% Gel', desc: 'OTC retinoid proven to clear acne and prevent future breakouts. Use every other night to start.', tag: 'PM · every other night', link: 'https://www.amazon.in/s?k=Differin+Adapalene+0.1' },
    { icon: '🌤️', brand: 'Neutrogena', name: 'Clear Face SPF 55', desc: 'Non-comedogenic sunscreen formulated specifically for acne-prone skin. Won\'t clog pores.', tag: 'AM only', link: 'https://www.amazon.in/s?k=Neutrogena+Clear+Face+SPF+55' },
  ],
};

function renderGrid(type) {
  const grid = document.getElementById('grid-' + type);
  if (!grid) return;
  grid.innerHTML = '';
  PRODUCTS[type].forEach(p => {
    const card = document.createElement('div');
    card.className = 'rx-product-card';
    card.innerHTML = `
      <div class="rx-card-top">
        <div class="rx-card-icon">${p.icon}</div>
        <div class="rx-card-meta">
          <p class="rx-card-brand">${p.brand}</p>
          <p class="rx-card-name">${p.name}</p>
        </div>
      </div>
      <p class="rx-card-desc">${p.desc}</p>
      <div class="rx-card-footer">
        <span class="rx-card-tag">${p.tag}</span>
        <a href="${p.link}" class="rx-shop-btn" target="_blank" rel="noopener noreferrer">Shop →</a>
      </div>
    `;
    grid.appendChild(card);
  });
}

Object.keys(PRODUCTS).forEach(type => renderGrid(type));

const buttons = document.querySelectorAll('.rx-skin-btn');
const panels = document.querySelectorAll('.rx-panel');

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const type = btn.dataset.type;

    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    panels.forEach(p => p.classList.remove('active'));
    const target = document.getElementById('panel-' + type);
    if (target) target.classList.add('active');
  });
});

const saved = localStorage.getItem('skinType');
if (saved) {
  const map = { Oily: 'oily', Dry: 'dry', Combination: 'combination', Sensitive: 'sensitive', Balanced: 'oily' };
  const type = map[saved];
  if (type) {
    const btn = document.querySelector(`.rx-skin-btn[data-type="${type}"]`);
    if (btn) btn.click();
  }
}
