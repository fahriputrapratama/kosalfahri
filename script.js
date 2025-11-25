document.addEventListener("DOMContentLoaded", function () {
  // Inisialisasi Filter Lokasi
  initFilter();
});

// === DATA TEMPAT ===
const data = {
  "Mall": [
    { nama: "Rita Supermall Tegal", lokasi: "± 800 m", alamat: "https://www.google.com/maps/dir/?api=1&origin=-6.8713594,109.1246016&destination=-6.8691677,109.119969", icon: "fa-bag-shopping" },
    { nama: "Tegal Plaza", lokasi: "± 500 m", alamat: "https://www.google.com/maps/dir/?api=1&origin=-6.8713594,109.1246016&destination=-6.872701,109.1273032", icon: "fa-bag-shopping" },
    { nama: "Transmart Tegal", lokasi: "± 500 m", alamat: "https://www.google.com/maps/dir/?api=1&origin=-6.8713594,109.1246016&destination=-6.8684052,109.1230385", icon: "fa-cart-shopping" },
    { nama: "Pacific Mall", lokasi: "± 600 m", alamat: "https://www.google.com/maps/dir/?api=1&origin=-6.8713594,109.1246016&destination=-6.8696644,109.1286614", icon: "fa-building" }
  ],
  "Kampus": [
    { nama: "Univ. Harkat Negeri", lokasi: "± 1.6 km", alamat: "https://www.google.com/maps/dir/?api=1&origin=-6.8713594,109.1246016&destination=-6.8693094,109.1146826", icon: "fa-graduation-cap" },
    { nama: "Univ. BSI Tegal", lokasi: "± 1.8 km", alamat: "https://www.google.com/maps/dir/?api=1&origin=-6.8713594,109.1246016&destination=-6.8642861,109.1210049", icon: "fa-graduation-cap" },
    { nama: "Poltekkes Smg", lokasi: "± 2 km", alamat: "https://www.google.com/maps/dir/?api=1&origin=-6.8713594,109.1246016&destination=-6.8785952,109.1165896", icon: "fa-school" }
  ],
  "Rumah Sakit": [
    { nama: "RSUD Kardinah", lokasi: "± 2.5 km", alamat: "https://www.google.com/maps/dir/?api=1&origin=-6.8713594,109.1246016&destination=-6.885217,109.1348453", icon: "fa-hospital" },
    { nama: "RSI Harapan Anda", lokasi: "± 900 m", alamat: "https://www.google.com/maps/dir/?api=1&origin=-6.8713594,109.1246016&destination=-6.8763637,109.1283044", icon: "fa-user-doctor" }
  ],
  "Kuliner": [
    { nama: "Mie Gacoan Tegal", lokasi: "± 750 m", alamat: "https://www.google.com/maps/dir/?api=1&origin=-6.8713594,109.1246016&destination=-6.8749365,109.1272209", icon: "fa-utensils" },
    { nama: "Wizzmie Tegal", lokasi: "± 1 km", alamat: "https://www.google.com/maps/dir/?api=1&origin=-6.8713594,109.1246016&destination=-6.8758168,d109.1274826", icon: "fa-bowl-food" }
  ]
};

// === LOGIKA FILTER ===
function initFilter() {
    const filterContainer = document.getElementById('filterContainer');
    // Cek element ada atau tidak (untuk mencegah error)
    if (!filterContainer) return; 

    const categories = ['Semua', ...Object.keys(data)];

    // 1. Render Tombol Filter
    filterContainer.innerHTML = '';
    categories.forEach((cat, index) => {
        const btn = document.createElement('button');
        btn.className = `filter-btn ${index === 0 ? 'active' : ''}`; // Tombol pertama aktif default
        btn.textContent = cat;
        btn.onclick = () => handleFilterClick(btn, cat);
        filterContainer.appendChild(btn);
    });

    // 2. Render List Awal (Semua)
    renderList('Semua');
}

function handleFilterClick(clickedBtn, category) {
    // Hapus class active dari semua tombol filter
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    // Tambah class active ke tombol yang diklik
    clickedBtn.classList.add('active');
    
    // Render ulang list
    renderList(category);
}

function renderList(category) {
    const listContainer = document.getElementById('nearbyList');
    if (!listContainer) return;

    listContainer.innerHTML = ''; // Bersihkan list

    let itemsToRender = [];

    if (category === 'Semua') {
        Object.keys(data).forEach(key => {
            itemsToRender = itemsToRender.concat(data[key]);
        });
    } else {
        itemsToRender = data[category];
    }

    // Render Items
    itemsToRender.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = "d-flex align-items-center shadow-sm animate-item"; 
        li.style.animationDelay = `${index * 0.05}s`; // Stagger animation

        const iconClass = item.icon || "fa-map-pin";
        
        li.innerHTML = `
            <div class="icon-box">
                <i class="fa ${iconClass}"></i>
            </div>
            <div class="flex-grow-1">
                <strong>${item.nama}</strong>
                <span class="distance"><i class="fa fa-location-arrow me-1" style="font-size:0.7rem"></i> ${item.lokasi}</span>
            </div>
            <div class="text-secondary ms-2">
                 <i class="fa fa-chevron-right" style="font-size:0.8rem"></i>
            </div>
        `;

        li.addEventListener('click', () => {
            window.open(item.alamat, '_blank');
        });

        listContainer.appendChild(li);
    });
}