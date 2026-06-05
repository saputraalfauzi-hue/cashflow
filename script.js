let transactions = [];
let editingId = null;
let pieChart, barDateChart, barMonthChart;

const STORAGE_KEY = 'cashflow_app';

function loadData() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        transactions = JSON.parse(stored);
    } else {
        transactions = [];
    }
}

function saveData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
}

function formatRupiah(angka) {
    let number = Number(angka);
    if (isNaN(number)) return 'Rp 0';
    return 'Rp ' + number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function formatNumberWithDots(value) {
    let cleaned = value.toString().replace(/\./g, '').replace(/[^0-9]/g, '');
    if (cleaned === '') return '';
    let num = parseInt(cleaned, 10);
    return num.toLocaleString('id-ID');
}

function getCurrentDateTime() {
    const now = new Date();
    const hari = now.toLocaleDateString('id-ID', { weekday: 'long' });
    const tgl = now.getDate();
    const bulan = now.toLocaleDateString('id-ID', { month: 'long' });
    const tahun = now.getFullYear();
    const jam = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    return {
        full: `${hari}, ${tgl} ${bulan} ${tahun} ${jam}`,
        dateOnly: `${tahun}-${String(now.getMonth()+1).padStart(2,'0')}-${String(tgl).padStart(2,'0')}`,
        monthOnly: `${tahun}-${String(now.getMonth()+1).padStart(2,'0')}`,
        timestamp: now.toISOString()
    };
}

function updateSaldo() {
    let total = 0;
    transactions.forEach(t => {
        if (t.jenis === 'pemasukan') total += t.jumlah;
        else total -= t.jumlah;
    });
    const saldoElem = document.getElementById('saldoValue');
    saldoElem.innerText = formatRupiah(total);
    if (total >= 0) {
        saldoElem.classList.add('positif');
        saldoElem.classList.remove('negatif');
    } else {
        saldoElem.classList.add('negatif');
        saldoElem.classList.remove('positif');
    }
    return total;
}

function renderHistory() {
    const filter = document.getElementById('filterJenis').value;
    let filtered = [...transactions];
    if (filter !== 'semua') {
        filtered = filtered.filter(t => t.jenis === filter);
    }
    filtered.sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp));
    const tbody = document.querySelector('#historyTable tbody');
    tbody.innerHTML = '';
    filtered.forEach(t => {
        const row = tbody.insertRow();
        row.insertCell(0).innerText = t.jenis === 'pemasukan' ? '📈 Pemasukan' : '📉 Pengeluaran';
        row.insertCell(1).innerText = t.keterangan;
        row.insertCell(2).innerText = formatRupiah(t.jumlah);
        row.insertCell(3).innerText = t.waktuFull;
        const actionCell = row.insertCell(4);
        const editBtn = document.createElement('button');
        editBtn.innerHTML = '<i class="fas fa-edit"></i>';
        editBtn.className = 'btn-edit';
        editBtn.onclick = () => startEdit(t.id);
        const delBtn = document.createElement('button');
        delBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
        delBtn.className = 'btn-delete';
        delBtn.onclick = () => { if(confirm('Hapus transaksi ini?')) deleteTransaction(t.id); };
        actionCell.appendChild(editBtn);
        actionCell.appendChild(delBtn);
    });
}

function deleteTransaction(id) {
    transactions = transactions.filter(t => t.id !== id);
    saveData();
    renderAll();
}

function startEdit(id) {
    const trans = transactions.find(t => t.id === id);
    if (!trans) return;
    editingId = id;
    document.getElementById('jenis').value = trans.jenis;
    document.getElementById('keterangan').value = trans.keterangan;
    const jumlahInput = document.getElementById('jumlah');
    jumlahInput.value = formatNumberWithDots(trans.jumlah.toString());
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.innerText = 'Update Transaksi';
    submitBtn.classList.add('editing-mode');
}

function resetForm() {
    editingId = null;
    document.getElementById('jenis').value = 'pemasukan';
    document.getElementById('keterangan').value = '';
    document.getElementById('jumlah').value = '';
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.innerText = 'Tambah Transaksi';
    submitBtn.classList.remove('editing-mode');
}

function addOrUpdate() {
    const jenis = document.getElementById('jenis').value;
    const keterangan = document.getElementById('keterangan').value.trim();
    let jumlahRaw = document.getElementById('jumlah').value.replace(/\./g, '');
    const jumlah = parseInt(jumlahRaw, 10);

    if (!keterangan) {
        alert('Keterangan harus diisi');
        return;
    }
    if (isNaN(jumlah) || jumlah <= 0 || !Number.isInteger(jumlah)) {
        alert('Jumlah harus berupa angka bulat positif (contoh: 50000)');
        return;
    }

    const now = getCurrentDateTime();
    if (editingId !== null) {
        const index = transactions.findIndex(t => t.id === editingId);
        if (index !== -1) {
            transactions[index] = {
                ...transactions[index],
                jenis, keterangan, jumlah,
                waktuFull: now.full,
                dateOnly: now.dateOnly,
                monthOnly: now.monthOnly,
                timestamp: now.timestamp
            };
        }
        editingId = null;
    } else {
        const newId = Date.now() + Math.random();
        transactions.push({
            id: newId,
            jenis, keterangan, jumlah,
            waktuFull: now.full,
            dateOnly: now.dateOnly,
            monthOnly: now.monthOnly,
            timestamp: now.timestamp
        });
    }
    saveData();
    resetForm();
    renderAll();
}

function renderCharts() {
    const totalPemasukan = transactions.filter(t => t.jenis === 'pemasukan').reduce((s, t) => s + t.jumlah, 0);
    const totalPengeluaran = transactions.filter(t => t.jenis === 'pengeluaran').reduce((s, t) => s + t.jumlah, 0);

    if (pieChart) pieChart.destroy();
    const ctxPie = document.getElementById('pieChart').getContext('2d');
    pieChart = new Chart(ctxPie, {
        type: 'pie',
        data: {
            labels: ['Pemasukan', 'Pengeluaran'],
            datasets: [{
                data: [totalPemasukan, totalPengeluaran],
                backgroundColor: ['#42a5f5', '#ef5350'],
                borderWidth: 0
            }]
        },
        options: { responsive: true, maintainAspectRatio: true, plugins: { legend: { position: 'bottom' } } }
    });
    const totalAll = totalPemasukan + totalPengeluaran;
    const persenPemasukan = totalAll === 0 ? 0 : ((totalPemasukan / totalAll) * 100).toFixed(1);
    const persenPengeluaran = totalAll === 0 ? 0 : ((totalPengeluaran / totalAll) * 100).toFixed(1);
    document.getElementById('piePersen').innerHTML = `📊 Pemasukan: ${persenPemasukan}% &nbsp;&nbsp; 📉 Pengeluaran: ${persenPengeluaran}%`;

    const groupByDate = new Map();
    transactions.forEach(t => {
        const key = t.dateOnly;
        if (!groupByDate.has(key)) groupByDate.set(key, { pemasukan: 0, pengeluaran: 0 });
        const group = groupByDate.get(key);
        if (t.jenis === 'pemasukan') group.pemasukan += t.jumlah;
        else group.pengeluaran += t.jumlah;
    });
    const sortedDates = Array.from(groupByDate.keys()).sort();
    const pemasukanData = sortedDates.map(d => groupByDate.get(d).pemasukan);
    const pengeluaranData = sortedDates.map(d => groupByDate.get(d).pengeluaran);
    if (barDateChart) barDateChart.destroy();
    const ctxBarDate = document.getElementById('barDateChart').getContext('2d');
    barDateChart = new Chart(ctxBarDate, {
        type: 'bar',
        data: {
            labels: sortedDates,
            datasets: [
                { label: 'Pemasukan', data: pemasukanData, backgroundColor: '#42a5f5' },
                { label: 'Pengeluaran', data: pengeluaranData, backgroundColor: '#ef5350' }
            ]
        },
        options: { responsive: true, maintainAspectRatio: true, scales: { y: { beginAtZero: true } }, plugins: { tooltip: { callbacks: { label: (ctx) => `Rp ${ctx.raw.toLocaleString('id-ID')}` } } } }
    });

    const groupByMonth = new Map();
    transactions.forEach(t => {
        const key = t.monthOnly;
        if (!groupByMonth.has(key)) groupByMonth.set(key, { pemasukan: 0, pengeluaran: 0 });
        const group = groupByMonth.get(key);
        if (t.jenis === 'pemasukan') group.pemasukan += t.jumlah;
        else group.pengeluaran += t.jumlah;
    });
    const sortedMonths = Array.from(groupByMonth.keys()).sort();
    const pemasukanMonth = sortedMonths.map(m => groupByMonth.get(m).pemasukan);
    const pengeluaranMonth = sortedMonths.map(m => groupByMonth.get(m).pengeluaran);
    if (barMonthChart) barMonthChart.destroy();
    const ctxBarMonth = document.getElementById('barMonthChart').getContext('2d');
    barMonthChart = new Chart(ctxBarMonth, {
        type: 'bar',
        data: {
            labels: sortedMonths,
            datasets: [
                { label: 'Pemasukan', data: pemasukanMonth, backgroundColor: '#42a5f5' },
                { label: 'Pengeluaran', data: pengeluaranMonth, backgroundColor: '#ef5350' }
            ]
        },
        options: { responsive: true, maintainAspectRatio: true, scales: { y: { beginAtZero: true } }, plugins: { tooltip: { callbacks: { label: (ctx) => `Rp ${ctx.raw.toLocaleString('id-ID')}` } } } }
    });
}

function switchDiagram(type) {
    document.getElementById('pieContainer').classList.remove('active');
    document.getElementById('barDateContainer').classList.remove('active');
    document.getElementById('barMonthContainer').classList.remove('active');
    if (type === 'pie') document.getElementById('pieContainer').classList.add('active');
    else if (type === 'barDate') document.getElementById('barDateContainer').classList.add('active');
    else if (type === 'barMonth') document.getElementById('barMonthContainer').classList.add('active');
    const btns = document.querySelectorAll('.chart-switch-btn');
    btns.forEach(btn => btn.classList.remove('active'));
    if (type === 'pie') document.getElementById('btnPie').classList.add('active');
    else if (type === 'barDate') document.getElementById('btnBarDate').classList.add('active');
    else if (type === 'barMonth') document.getElementById('btnBarMonth').classList.add('active');
}

function renderAll() {
    updateSaldo();
    renderHistory();
    renderCharts();
}

function initEventListeners() {
    document.getElementById('submitBtn').addEventListener('click', addOrUpdate);
    document.getElementById('filterJenis').addEventListener('change', () => renderHistory());
    const jumlahInput = document.getElementById('jumlah');
    jumlahInput.addEventListener('input', function(e) {
        let raw = this.value.replace(/\./g, '').replace(/[^0-9]/g, '');
        if (raw === '') this.value = '';
        else this.value = parseInt(raw, 10).toLocaleString('id-ID');
    });
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        const isDark = document.body.classList.contains('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') document.body.classList.add('dark');
    document.getElementById('btnPie').addEventListener('click', () => switchDiagram('pie'));
    document.getElementById('btnBarDate').addEventListener('click', () => switchDiagram('barDate'));
    document.getElementById('btnBarMonth').addEventListener('click', () => switchDiagram('barMonth'));
}

function init() {
    loadData();
    initEventListeners();
    renderAll();
    switchDiagram('pie');
}

init();