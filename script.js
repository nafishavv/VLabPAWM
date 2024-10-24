let bola1 = document.getElementById("bola1");
let bola2 = document.getElementById("bola2");
const kotak = document.getElementById("kotak");
const distanceElement = document.getElementById("distance");
let currentBola = null;

function goBack() {
    window.history.back();
}

function startDrag(event, bola) {
    currentBola = document.getElementById(bola);
    document.addEventListener("mousemove", moveBola);
    document.addEventListener("mouseup", stopDrag);
}

function moveBola(event) {
    if (!currentBola) return;

    const kotakRect = kotak.getBoundingClientRect();
    const bolaRect = currentBola.getBoundingClientRect();

    // Hitung posisi baru
    let newLeft = event.clientX - kotakRect.left - bolaRect.width / 2;
    let newTop = event.clientY - kotakRect.top - bolaRect.height / 2;

    // Batas gerakan di dalam kotak
    newLeft = Math.max(0, Math.min(newLeft, kotakRect.width - bolaRect.width));
    newTop = Math.max(0, Math.min(newTop, kotakRect.height - bolaRect.height));

    // Update posisi bola
    currentBola.style.left = newLeft + "px";
    currentBola.style.top = newTop + "px";
    updateDistance();
}

function stopDrag() {
    currentBola = null;
    document.removeEventListener("mousemove", moveBola);
    document.removeEventListener("mouseup", stopDrag);
}

function updateDistance() {
    const rect1 = bola1.getBoundingClientRect();
    const rect2 = bola2.getBoundingClientRect();

    const r =
        Math.sqrt(
            Math.pow(rect1.left - rect2.left, 2) +
            Math.pow(rect1.top - rect2.top, 2)
        ) / 100; // Konversi ke meter
    distanceElement.textContent = r.toFixed(2); // Tampilkan jarak
}

function hitungGaya() {
    const q1 = parseFloat(document.getElementById("q1").value) * 1e-6; // Mikro Coulomb ke Coulomb
    const q2 = parseFloat(document.getElementById("q2").value) * 1e-6; // Mikro Coulomb ke Coulomb
    const r = parseFloat(distanceElement.textContent); // Jarak dalam meter

    // Validasi input
    if (isNaN(q1) || isNaN(q2) || r <= 0) {
        alert("Error: Please ensure both Q1 and Q2 are filled and the balls are moved!");
        document.getElementById("hasil").style.display = "none"; // Sembunyikan hasil
        return;
    }

    const k = 8.99e9; // Konstanta Coulomb dalam N m²/C²
    const gaya = (k * Math.abs(q1 * q2)) / Math.pow(r, 2);
    const hasilElement = document.getElementById("hasil");
    hasilElement.textContent = `Force Result: ${gaya.toFixed(2)} N`;
    hasilElement.style.display = "block"; // Tampilkan hasil
}
