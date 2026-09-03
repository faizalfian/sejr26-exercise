const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const fileName = 'latihan-praktik-variabel-operator-while.html';
const source = fs.readFileSync(fileName, 'utf8');
const dataMatch = source.match(/const soalData = (\[[\s\S]*?\]);\s*let currentSoal/);
const scriptMatch = source.match(/<script>\s*([\s\S]*?)<\/script>\s*<\/body>/);

assert.ok(dataMatch, 'Data soal harus dapat dibaca sebagai JSON');
assert.ok(scriptMatch, 'Script utama LKS harus ditemukan');

const soalData = JSON.parse(dataMatch[1]);
assert.equal(soalData.length, 27, 'LKS harus memiliki tepat 27 soal');

const expectedPatterns = [
    'fixed-count',
    'sentinel',
    'target',
    'depletion',
    'validation',
    'digits',
    'modulus-search',
    'growth-decay',
    'convergence'
];

for (const stage of [1, 2, 3]) {
    const tahap = soalData.filter((soal) => soal.stage === stage);
    assert.equal(tahap.length, 9, `Tahap ${stage} harus memiliki 9 variasi`);
    assert.deepEqual(tahap.map((soal) => soal.variant), [1, 2, 3, 4, 5, 6, 7, 8, 9]);
    assert.deepEqual(tahap.map((soal) => soal.pattern), expectedPatterns, `Tahap ${stage} harus mencakup sembilan pola while`);
}

for (const soal of soalData) {
    assert.equal(soal.level, 'C3 - Menerapkan');
    assert.ok(soal.cerita.length >= 250, `${soal.id} harus memiliki cerita yang cukup panjang`);
    assert.ok(Array.isArray(soal.panduan) && soal.panduan.length > 0, `${soal.id} harus memiliki ruang perencanaan`);
    assert.doesNotMatch(soal.panduan.join(' '), /while\s*\([^)]/i, `${soal.id} tidak boleh membocorkan kondisi while`);
    assert.ok(soal.output.includes('[hasil'), `${soal.id} harus menampilkan format output tanpa membocorkan jawaban`);
    assert.doesNotMatch(`${soal.cerita} ${soal.panduan.join(' ')}`, /\b(?:if|else)\b/i, `${soal.id} tidak boleh meminta if/else`);
}

const workedExampleMatch = source.match(/<section class="card worked-example" id="worked-example">([\s\S]*?)<\/section>/);
assert.ok(workedExampleMatch, 'Contoh terbimbing harus tersedia sebagai layar ketiga');
const workedExample = workedExampleMatch[1];
assert.match(workedExample, /Misi Daur Ulang GreenTech/);
assert.match(workedExample, /totalSampah &lt; target/);
assert.doesNotMatch(workedExample, /while\s*\(hari\s*&lt;=\s*6\)/);
assert.doesNotMatch(workedExample, /\b(?:if|else)\b/i);
assert.ok(workedExample.indexOf('Penelusuran Perulangan') < workedExample.indexOf('117 kg'), 'Hasil harus muncul setelah proses penelusuran');

assert.ok(soalData.filter((soal) => soal.stage === 1).every((soal) => soal.panduan.length === 6));
assert.ok(soalData.filter((soal) => soal.stage === 2).every((soal) => soal.panduan.length === 3));
assert.ok(soalData.filter((soal) => soal.stage === 3).every((soal) => soal.panduan.length === 1));
assert.match(source, /Dilarang menggunakan AI untuk men-generate jawaban/);
assert.match(source, /Mulai dari Awal/);

const elements = new Map();
const alerts = [];

function makeElement(tagName = 'div') {
    const element = {
        tagName,
        id: '',
        value: '',
        checked: false,
        disabled: false,
        innerText: '',
        className: '',
        style: {},
        children: [],
        classList: { add() {}, remove() {}, toggle() {} },
        setAttribute() {},
        removeAttribute() {},
        appendChild(child) {
            this.children.push(child);
            if (child.id) elements.set(child.id, child);
        },
        removeChild(child) {
            this.children = this.children.filter((item) => item !== child);
        },
        click() {}
    };

    let html = '';
    Object.defineProperty(element, 'innerHTML', {
        get() { return html; },
        set(value) {
            html = value;
            if (value === '') this.children = [];
        }
    });

    return element;
}

function getElement(id) {
    if (!elements.has(id)) elements.set(id, makeElement());
    return elements.get(id);
}

let downloadedBlob;
let downloadedFileName;

const document = {
    getElementById: getElement,
    querySelectorAll(selector) {
        if (selector === '.btn-nav') return getElement('nav-container').children;
        if (selector === '.planning-input') {
            return getElement('planning-container').children.filter((child) => child.className === 'planning-input');
        }
        return [];
    },
    createElement(tagName) {
        const element = makeElement(tagName);
        if (tagName === 'a') {
            element.click = function click() {
                downloadedFileName = this.download;
            };
        }
        return element;
    },
    body: makeElement('body')
};

const storage = new Map();
const localStorage = {
    getItem(key) { return storage.get(key) ?? null; },
    setItem(key, value) { storage.set(key, value); },
    removeItem(key) { storage.delete(key); }
};

let editorValue = '';
const editor = {
    getValue() { return editorValue; },
    setValue(value) { editorValue = value; },
    refresh() {}
};

const context = vm.createContext({
    document,
    localStorage,
    CodeMirror: { fromTextArea() { return editor; } },
    Blob,
    URL: {
        createObjectURL(blob) {
            downloadedBlob = blob;
            return 'blob:laporan-praktik';
        },
        revokeObjectURL() {}
    },
    setTimeout(callback) { callback(); },
    alert(message) { alerts.push(message); }
});

vm.runInContext(scriptMatch[1], context);

const assignments = [];
for (let absen = 1; absen <= 36; absen++) {
    assignments.push(JSON.parse(vm.runInContext(`JSON.stringify(tentukanSoal(${absen}))`, context)));
}

const frequencies = new Map();
for (const assignment of assignments) {
    assert.equal(assignment.length, 3);
    assert.match(assignment[0], /^T1-/);
    assert.match(assignment[1], /^T2-/);
    assert.match(assignment[2], /^T3-/);
    assert.equal(new Set(assignment.map((id) => id.slice(3))).size, 3, 'Siswa tidak boleh mengulang tema');
    assignment.forEach((id) => frequencies.set(id, (frequencies.get(id) ?? 0) + 1));
}

assert.equal(new Set(assignments.map((assignment) => assignment.join('|'))).size, 36, 'Kombinasi setiap siswa harus unik');
assert.ok([...frequencies.values()].every((count) => count === 4), 'Setiap soal harus diberikan kepada tepat 4 siswa');
assert.deepEqual(JSON.parse(vm.runInContext('JSON.stringify(tentukanSoal(0))', context)), []);
assert.deepEqual(JSON.parse(vm.runInContext('JSON.stringify(tentukanSoal(37))', context)), []);

getElement('input-kelompok').value = 'Nadia <script>';
getElement('input-kelas').value = 'X PPLG 1';
getElement('input-anggota').value = 'Nadia';
getElement('input-absen').value = '0';
vm.runInContext('lanjutKeAturan()', context);
assert.equal(alerts.length, 1, 'Nomor absen di luar 1-36 harus ditolak');

getElement('input-absen').value = '10';
vm.runInContext('lanjutKeAturan()', context);
assert.equal(getElement('rules-screen').style.display, 'block', 'Data valid harus membuka layar persiapan');
assert.equal(JSON.parse(storage.get('cppTigaTahapProgressV1:10')).screen, 'rules');

vm.runInContext('lanjutKeContoh()', context);
assert.equal(alerts.length, 2, 'Siswa harus menyetujui aturan sebelum membuka contoh');
getElement('rules-checkbox').checked = true;
vm.runInContext('lanjutKeContoh()', context);
assert.equal(getElement('worked-example').style.display, 'block', 'Persetujuan aturan harus membuka contoh');
assert.equal(JSON.parse(storage.get('cppTigaTahapProgressV1:10')).screen, 'example');

getElement('worked-example').style.display = 'none';
vm.runInContext('restoreProgress()', context);
assert.equal(getElement('worked-example').style.display, 'block', 'Refresh harus memulihkan layar terakhir');

vm.runInContext('mulaiPengerjaan()', context);
assert.equal(getElement('screen-exercise').style.display, 'block', 'Tombol pada contoh harus membuka latihan');
assert.equal(getElement('nav-container').children.length, 3, 'Siswa hanya boleh melihat tiga soal yang ditugaskan');
assert.equal(getElement('onboarding-stepper').style.display, 'none', 'Stepper onboarding tidak boleh bersaing dengan progres soal');
assert.equal(getElement('exercise-progress').style.display, 'block', 'Progres tiga soal harus terlihat saat latihan');
assert.equal(getElement('exercise-progress-count').innerText, 'Soal 1 dari 3');
assert.equal(getElement('primary-action').innerText, 'Simpan & Lanjut ke Tahap 2 →');

vm.runInContext('simpanDanLanjut()', context);
assert.equal(alerts.length, 3, 'Jawaban yang belum lengkap tidak boleh dianggap selesai');
assert.equal(vm.runInContext('currentSoal.id', context), assignments[9][0], 'Validasi gagal harus tetap pada soal aktif');

const assignedForTen = assignments[9];
for (let stageIndex = 0; stageIndex < assignedForTen.length; stageIndex++) {
    const planningInputs = document.querySelectorAll('.planning-input');
    planningInputs.forEach((input, promptIndex) => {
        input.value = `Rencana tahap ${stageIndex + 1} bagian ${promptIndex + 1}`;
    });
    editorValue = `#include <iostream>\nint main() { while (false) {} }\n// Jawaban tahap ${stageIndex + 1}`;
    vm.runInContext('simpanDanLanjut()', context);
    assert.match(getElement('nav-container').children[stageIndex].innerText, /Selesai/, `Tahap ${stageIndex + 1} harus ditandai selesai`);
    if (stageIndex < 2) {
        assert.equal(vm.runInContext('currentSoal.id', context), assignedForTen[stageIndex + 1], 'Tombol utama harus membuka tahap berikutnya');
        assert.equal(getElement('exercise-progress-count').innerText, `Soal ${stageIndex + 2} dari 3`);
    }
}
assert.equal(getElement('hasil-container').style.display, 'block', 'Laporan baru terbuka setelah tiga soal lengkap');
assert.equal(JSON.parse(storage.get('cppTigaTahapProgressV1:10')).currentQuestionId, assignedForTen[2], 'Soal terakhir harus tersimpan');

getElement('screen-exercise').style.display = 'none';
vm.runInContext('restoreProgress()', context);
assert.equal(getElement('screen-exercise').style.display, 'block', 'Refresh harus kembali ke layar latihan');
assert.equal(vm.runInContext('currentSoal.id', context), assignedForTen[2], 'Refresh harus membuka soal terakhir');

vm.runInContext('downloadLaporan()', context);
assert.equal(downloadedFileName, 'Laporan_Praktik_Nadia-script_Absen_10.html');
assert.equal(downloadedBlob.type, 'text/html;charset=utf-8');

getElement('input-kelompok').value = 'Siswa Lain';
getElement('input-absen').value = '19';
vm.runInContext('lanjutKeAturan()', context);
getElement('rules-checkbox').checked = true;
vm.runInContext('mulaiPengerjaan()', context);
assert.match(editorValue, /Tulis kodemu di sini/, 'Siswa lain tidak boleh melihat kode yang tersimpan oleh siswa sebelumnya');
assert.doesNotMatch(editorValue, /Jawaban tahap 1/);

const assignedForNineteen = assignments[18];
vm.runInContext(`renderSoal('${assignedForNineteen[2]}')`, context);
document.querySelectorAll('.planning-input').forEach((input) => { input.value = 'Rencana tahap ketiga'; });
editorValue = '#include <iostream>\nint main() { while (false) {} }';
vm.runInContext('simpanDanLanjut()', context);
assert.equal(vm.runInContext('currentSoal.id', context), assignedForNineteen[0], 'Tahap yang terlewat harus diarahkan kembali ke tahap pertama yang belum lengkap');
assert.notEqual(getElement('hasil-container').style.display, 'block', 'Laporan tidak boleh terbuka jika masih ada tahap yang belum lengkap');

assert.ok(storage.has('cppTigaTahapAnswersV1:10'));
vm.runInContext('mulaiDariAwal()', context);
assert.equal(getElement('reset-dialog').style.display, 'flex', 'Tombol reset harus menampilkan pertanyaan konfirmasi');
vm.runInContext('batalkanMulaiDariAwal()', context);
assert.ok(storage.has('cppTigaTahapProgressV1:19'), 'Batal reset harus mempertahankan progres');

vm.runInContext('mulaiDariAwal()', context);
vm.runInContext('konfirmasiMulaiDariAwal()', context);
assert.equal(storage.has('cppTigaTahapIdentityV1'), false, 'Reset harus menghapus identitas aktif');
assert.equal(storage.has('cppTigaTahapProgressV1:19'), false, 'Reset harus menghapus progres siswa aktif');
assert.equal(storage.has('cppTigaTahapAnswersV1:19'), false, 'Reset harus menghapus jawaban siswa aktif');
assert.equal(storage.has('cppTigaTahapPlansV1:19'), false, 'Reset harus menghapus rencana siswa aktif');
assert.ok(storage.has('cppTigaTahapAnswersV1:10'), 'Reset tidak boleh menghapus data nomor absen lain');
assert.equal(getElement('form-kelompok').style.display, 'block', 'Reset harus kembali ke layar salam');

downloadedBlob.text().then((report) => {
    assert.match(report, /Nadia &lt;script&gt;/);
    assert.doesNotMatch(report, /Nadia <script>/);
    assert.match(report, /Nomor Absen:<\/strong> 10/);
    assert.match(report, new RegExp(assignedForTen[0]));
    assert.match(report, new RegExp(assignedForTen[1]));
    assert.match(report, new RegExp(assignedForTen[2]));
    assert.match(report, /Rencana tahap 1 bagian 1/);
    assert.match(report, /Jawaban tahap 3/);
    console.log('PASS: 27 soal, distribusi tiga tahap, perencanaan, dan laporan HTML valid.');
}).catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
