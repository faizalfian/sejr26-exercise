const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const source = fs.readFileSync('LKS_Pilihan_Ganda_Pengumpulan.html', 'utf8');
const script = source.match(/<script>([\s\S]*?)<\/script>/)?.[1];

assert.ok(script, 'Script utama harus ditemukan di dalam dokumen HTML');

const elements = new Map();
const getElement = (id) => {
    if (!elements.has(id)) {
        elements.set(id, {
            id,
            value: '',
            innerHTML: '',
            innerText: '',
            style: {},
            disabled: false
        });
    }
    return elements.get(id);
};

getElement('nama').value = '  Alya <script>  ';
getElement('kelas').value = 'X PPLG 1';

const selectedAnswers = new Map([
    [0, '1'],
    [1, '2']
]);

let downloadedBlob;
let downloadedFileName;
let downloadClicked = false;
let revokedUrl;

const document = {
    getElementById: getElement,
    querySelector(selector) {
        const match = selector.match(/^input\[name="q(\d+)"\]:checked$/);
        if (!match) return null;

        const value = selectedAnswers.get(Number(match[1]));
        return value === undefined ? null : { value };
    },
    querySelectorAll() {
        return [];
    },
    createElement(tagName) {
        assert.equal(tagName, 'a');
        return {
            href: '',
            download: '',
            click() {
                downloadClicked = true;
                downloadedFileName = this.download;
            }
        };
    },
    body: {
        appendChild() {},
        removeChild() {}
    }
};

const context = vm.createContext({
    document,
    Blob,
    URL: {
        createObjectURL(blob) {
            downloadedBlob = blob;
            return 'blob:jawaban-siswa';
        },
        revokeObjectURL(url) {
            revokedUrl = url;
        }
    },
    window: { scrollTo() {}, print() {} },
    alert() {},
    confirm() { return true; }
});

vm.runInContext(script, context);
vm.runInContext('unduhJawabanHtml()', context);

assert.equal(downloadClicked, true, 'Tautan unduhan harus diklik');
assert.equal(downloadedFileName, 'jawaban-alya-script-x-pplg-1.html');
assert.equal(downloadedBlob.type, 'text/html;charset=utf-8');
assert.equal(revokedUrl, 'blob:jawaban-siswa');

downloadedBlob.text().then((downloadedHtml) => {
    assert.match(downloadedHtml, /<!DOCTYPE html>/i);
    assert.match(downloadedHtml, /Alya &lt;script&gt;/);
    assert.doesNotMatch(downloadedHtml, /Alya <script>/);
    assert.match(downloadedHtml, /X PPLG 1/);
    assert.match(downloadedHtml, /Soal 1<\/span><strong>B<\/strong>/);
    assert.match(downloadedHtml, /Soal 2<\/span><strong>C<\/strong>/);
    assert.match(downloadedHtml, /Soal 40<\/span><strong>-<\/strong>/);
    assert.doesNotMatch(downloadedHtml, /Apa yang dimaksud dengan variabel/);
    console.log('PASS: HTML unduhan memuat identitas dan jawaban siswa dengan aman.');
}).catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
