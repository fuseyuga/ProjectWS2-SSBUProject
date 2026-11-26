const recordForm = document.getElementById('record-form');
const historyList = document.getElementById('history-list');
const charGrid = document.getElementById('char-grid');
const charDetailSection = document.getElementById('char-detail-section');
const selectedCharName = document.getElementById('selected-char-name');
const charIssues = document.getElementById('char-issues');
const charSolutions = document.getElementById('char-solutions');
const saveCharNotesBtn = document.getElementById('save-char-notes-btn');
const closeCharDetailBtn = document.getElementById('close-char-detail-btn');

let currentSelectedChar = "";

// 全87キャラクターの定義リスト (名前と画像パスのプレースホルダー)
const characters = [
    { id: 1, name: "マリオ", img: "https://www.smashbros.com/assets_v2/img/fighter/mario/main.png" }, { id: 2, name: "ドンキー", img: "https://www.smashbros.com/assets_v2/img/fighter/donkey_kong/main.png" },
    { id: 3, name: "リンク", img: "https://www.smashbros.com/assets_v2/img/fighter/link/main.png" }, { id: 4, name: "サムス", img: "https://www.smashbros.com/assets_v2/img/fighter/samus/main.png" },
    { id: 5, name: "ダークサムス", img: "https://www.smashbros.com/assets_v2/img/fighter/dark_samus/main.png" }, { id: 6, name: "ヨッシー", img: "https://www.smashbros.com/assets_v2/img/fighter/yoshi/main.png" },
    { id: 7, name: "カービィ", img: "https://www.smashbros.com/assets_v2/img/fighter/kirby/main.png" }, { id: 8, name: "フォックス", img: "https://www.smashbros.com/assets_v2/img/fighter/fox/main.png" },
    { id: 9, name: "ピカチュウ", img: "https://www.smashbros.com/assets_v2/img/fighter/pikachu/main.png" }, { id: 10, name: "ルイージ", img: "https://www.smashbros.com/assets_v2/img/fighter/luigi/main.png" },
    { id: 11, name: "ネス", img: "https://www.smashbros.com/assets_v2/img/fighter/ness/main.png" }, { id: 12, name: "キャプテンファルコン", img: "https://www.smashbros.com/assets_v2/img/fighter/captain_falcon/main.png" },
    { id: 13, name: "プリン", img: "https://www.smashbros.com/assets_v2/img/fighter/jigglypuff/main.png" }, { id: 14, name: "ピーチ", img: "https://www.smashbros.com/assets_v2/img/fighter/peach/main.png" },
    { id: 15, name: "デイジー", img: "https://www.smashbros.com/assets_v2/img/fighter/daisy/main.png" }, { id: 16, name: "クッパ", img: "https://www.smashbros.com/assets_v2/img/fighter/bowser/main.png" },
    { id: 17, name: "アイスクライマー", img: "https://www.smashbros.com/assets_v2/img/fighter/ice_climbers/main.png" }, { id: 18, name: "シーク", img: "https://www.smashbros.com/assets_v2/img/fighter/sheik/main.png" },
    { id: 19, name: "ゼルダ", img: "https://www.smashbros.com/assets_v2/img/fighter/zelda/main.png" }, { id: 20, name: "ドクターマリオ", img: "https://www.smashbros.com/assets_v2/img/fighter/dr_mario/main.png" },
    { id: 21, name: "ピチュー", img: "https://www.smashbros.com/assets_v2/img/fighter/pichu/main.png" }, { id: 22, name: "ファルコ", img: "https://www.smashbros.com/assets_v2/img/fighter/falco/main.png" },
    { id: 23, name: "マルス", img: "https://www.smashbros.com/assets_v2/img/fighter/marth/main.png" }, { id: 24, name: "ルキナ", img: "https://www.smashbros.com/assets_v2/img/fighter/lucina/main.png" },
    { id: 25, name: "こどもリンク", img: "https://www.smashbros.com/assets_v2/img/fighter/young_link/main.png" }, { id: 26, name: "ガノンドロフ", img: "https://www.smashbros.com/assets_v2/img/fighter/ganondorf/main.png" },
    { id: 27, name: "ミュウツー", img: "https://www.smashbros.com/assets_v2/img/fighter/mewtwo/main.png" }, { id: 28, name: "ロイ", img: "https://www.smashbros.com/assets_v2/img/fighter/roy/main.png" },
    { id: 29, name: "クロム", img: "https://www.smashbros.com/assets_v2/img/fighter/chrom/main.png" }, { id: 30, name: "Mr.ゲーム&ウォッチ", img: "https://www.smashbros.com/assets_v2/img/fighter/mr_game_and_watch/main.png" },
    { id: 31, name: "メタナイト", img: "https://www.smashbros.com/assets_v2/img/fighter/meta_knight/main.png" }, { id: 32, name: "ピット", img: "https://www.smashbros.com/assets_v2/img/fighter/pit/main.png" },
    { id: 33, name: "ポケモントレーナー", img: "https://www.smashbros.com/assets_v2/img/fighter/pokemon_trainer/main.png" },{ id: 34, name: "ブラックピット", img: "https://www.smashbros.com/assets_v2/img/fighter/dark_pit/main.png" }, { id: 34, name: "ゼロスーツサムス", img: "https://www.smashbros.com/assets_v2/img/fighter/zero_suit_samus/main.png" },
    { id: 35, name: "ワリオ", img: "https://www.smashbros.com/assets_v2/img/fighter/wario/main.png" }, { id: 36, name: "スネーク", img: "https://www.smashbros.com/assets_v2/img/fighter/snake/main.png" },
    { id: 41, name: "ディディーコング", img: "https://www.smashbros.com/assets_v2/img/fighter/diddy_kong/main.png" }, { id: 42, name: "リュカ", img: "https://www.smashbros.com/assets_v2/img/fighter/lucas/main.png" },
    { id: 43, name: "ソニック", img: "https://www.smashbros.com/assets_v2/img/fighter/sonic/main.png" }, { id: 44, name: "デデデ", img: "https://www.smashbros.com/assets_v2/img/fighter/king_dedede/main.png" },
    { id: 45, name: "ピクミン&オリマー", img: "https://www.smashbros.com/assets_v2/img/fighter/pikmin_and_olimar/main.png" }, { id: 46, name: "ルカリオ", img: "https://www.smashbros.com/assets_v2/img/fighter/lucario/main.png" },
    { id: 47, name: "ロボット", img: "https://www.smashbros.com/assets_v2/img/fighter/rob/main.png" }, { id: 48, name: "Toonリンク", img: "https://www.smashbros.com/assets_v2/img/fighter/toon_link/main.png" },
    { id: 49, name: "ウルフ", img: "https://www.smashbros.com/assets_v2/img/fighter/wolf/main.png" }, { id: 50, name: "むらびと", img: "https://www.smashbros.com/assets_v2/img/fighter/villager/main.png" },
    { id: 51, name: "ロックマン", img: "https://www.smashbros.com/assets_v2/img/fighter/mega_man/main.png" }, { id: 52, name: "Wii Fit トレーナー", img: "https://www.smashbros.com/assets_v2/img/fighter/wii_fit_trainer/main.png" },
    { id: 53, name: "ロゼッタ&チコ", img: "https://www.smashbros.com/assets_v2/img/fighter/rosalina_and_luma/main.png" }, { id: 54, name: "リトル・マック", img: "https://www.smashbros.com/assets_v2/img/fighter/little_mac/main.png" },
    { id: 55, name: "ゲッコウガ", img: "https://www.smashbros.com/assets_v2/img/fighter/greninja/main.png" }, { id: 56, name: "Mii 格闘", img: "https://vignette.wikia.nocookie.net/smashbrossp/images/1/1e/Mii%E3%83%95%E3%82%A1%E3%82%A4%E3%82%BF%E3%83%BC_%E3%82%B9%E3%83%9E%E3%83%96%E3%83%A9SP.png/revision/latest?cb=20180903083438&path-prefix=ja" },
    { id: 57, name: "Mii 剣術", img: "https://ssb.wiki.gallery/images/thumb/f/fa/Mii_Swordfighter_SSBU.png/1200px-Mii_Swordfighter_SSBU.png" }, { id: 58, name: "Mii 射撃", img: "https://pheasantzelda.github.io/img/fighter_all/56.%E5%B0%84%E6%92%83Mii_1p_512x512.png" },
    { id: 59, name: "パルテナ", img: "https://www.smashbros.com/assets_v2/img/fighter/palutena/main.png" }, { id: 60, name: "パックマン", img: "https://www.smashbros.com/assets_v2/img/fighter/pac_man/main.png" },
    { id: 61, name: "ルフレ", img: "https://www.smashbros.com/assets_v2/img/fighter/robin/main.png" }, { id: 62, name: "シュルク", img: "https://www.smashbros.com/assets_v2/img/fighter/shulk/main.png" },
    { id: 63, name: "クッパJr.", img: "https://www.smashbros.com/assets_v2/img/fighter/bowser_jr/main.png" }, { id: 64, name: "ダックハント", img: "https://www.smashbros.com/assets_v2/img/fighter/duck_hunt/main.png" },
    { id: 65, name: "リュウ", img: "https://www.smashbros.com/assets_v2/img/fighter/ryu/main.png" }, { id: 66, name: "ケン", img: "https://www.smashbros.com/assets_v2/img/fighter/ken/main.png" },
    { id: 67, name: "クラウド", img: "https://www.smashbros.com/assets_v2/img/fighter/cloud/main.png" }, { id: 68, name: "カムイ", img: "https://www.smashbros.com/assets_v2/img/fighter/corrin/main.png" },
    { id: 69, name: "ベヨネッタ", img: "https://www.smashbros.com/assets_v2/img/fighter/bayonetta/main.png" }, { id: 70, name: "インクリング", img: "https://www.smashbros.com/assets_v2/img/fighter/inkling/main.png" },
    { id: 71, name: "リドリー", img: "https://www.smashbros.com/assets_v2/img/fighter/ridley/main.png" }, { id: 72, name: "シモン", img: "https://www.smashbros.com/assets_v2/img/fighter/simon/main.png" },
    { id: 73, name: "リヒター", img: "https://www.smashbros.com/assets_v2/img/fighter/richter/main.png" }, { id: 74, name: "キングクルール", img: "https://www.smashbros.com/assets_v2/img/fighter/king_k_rool/main.png" },
    { id: 75, name: "しずえ", img: "https://www.smashbros.com/assets_v2/img/fighter/isabelle/main.png" }, { id: 76, name: "ガオガエン", img: "https://www.smashbros.com/assets_v2/img/fighter/incineroar/main.png" },
    { id: 77, name: "パックンフラワー", img: "https://www.smashbros.com/assets_v2/img/fighter/piranha_plant/main.png" }, { id: 78, name: "ジョーカー", img: "https://www.smashbros.com/assets_v2/img/fighter/joker/main.png" },
    { id: 79, name: "勇者", img: "https://www.smashbros.com/assets_v2/img/fighter/dq_hero/main.png" }, { id: 80, name: "バンジョー&カズーイ", img: "https://www.smashbros.com/assets_v2/img/fighter/banjo_and_kazooie/main.png" },
    { id: 81, name: "テリー", img: "https://www.smashbros.com/assets_v2/img/fighter/terry/main.png" }, { id: 82, name: "ベレト/ベレス", img: "https://www.smashbros.com/assets_v2/img/fighter/byleth/main.png" },
    { id: 83, name: "ミェンミェン", img: "https://www.smashbros.com/assets_v2/img/fighter/minmin/main.png" }, { id: 84, name: "スティーブ", img: "https://www.smashbros.com/assets_v2/img/fighter/steve/main.png" },
    { id: 85, name: "セフィロス", img: "https://www.smashbros.com/assets_v2/img/fighter/sephiroth/main.png" }, { id: 86, name: "ホムラ/ヒカリ", img: "https://www.smashbros.com/assets_v2/img/fighter/homura/main.png" },
    { id: 87, name: "カズヤ", img: "https://www.smashbros.com/assets_v2/img/fighter/kazuya/main.png" }, { id: 88, name: "ソラ", img: "https://www.smashbros.com/assets_v2/img/fighter/sora/main.png" }
];

// 初期化ロード
document.addEventListener('DOMContentLoaded', () => {
    loadRecords();
    renderCharGrid();
});

// キャラクターグリッドの生成
function renderCharGrid() {
    charGrid.innerHTML = '';
    characters.forEach(char => {
        const div = document.createElement('div');
        div.classList.add('char-item');
        div.title = char.name;
        
        // 画像があれば表示、なければ名前の頭文字等を表示（後で画像を追加できる設計）
        if (char.img) {
            div.innerHTML = `<img src="${char.img}" alt="${char.name}" class="char-img">`;
        } else {
            div.innerHTML = `<div class="char-placeholder">${char.name.substring(0, 3)}</div>`;
        }

        div.addEventListener('click', () => selectCharacter(char.name));
        charGrid.appendChild(div);
    });
}

// キャラクター選択時のアクション
function selectCharacter(charName) {
    currentSelectedChar = charName;
    selectedCharName.textContent = `【${charName}】 対策・メモ`;
    
    // 既存の保存データを読み込む
    const charNotes = getCharNotesFromStorage(charName);
    charIssues.value = charNotes.issues || '';
    charSolutions.value = charNotes.solutions || '';
    
    // 対策セクションを表示
    charDetailSection.classList.remove('hidden');
    charDetailSection.scrollIntoView({ behavior: 'smooth' });

    // 対戦記録フォームの「相手キャラ」に自動入力
    document.getElementById('opponent').value = charName;
}

// 対策データの読み込み
function getCharNotesFromStorage(charName) {
    const allNotes = localStorage.getItem('smashCharNotes');
    const parsed = allNotes ? JSON.parse(allNotes) : {};
    return parsed[charName] || { issues: '', solutions: '' };
}

// キャラ対策保存ボタンの動作
saveCharNotesBtn.addEventListener('click', () => {
    if (!currentSelectedChar) return;
    
    const allNotes = localStorage.getItem('smashCharNotes');
    const parsed = allNotes ? JSON.parse(allNotes) : {};
    
    parsed[currentSelectedChar] = {
        issues: charIssues.value,
        solutions: charSolutions.value
    };
    
    localStorage.setItem('smashCharNotes', JSON.stringify(parsed));
    alert(`${currentSelectedChar}の対策メモを保存しました！`);
});

// 一覧に戻る（閉じる）ボタン
closeCharDetailBtn.addEventListener('click', () => {
    charDetailSection.classList.add('hidden');
    currentSelectedChar = "";
});

// 以下は元の対戦履歴管理ロジック
recordForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const opponent = document.getElementById('opponent').value;
    const result = document.querySelector('input[name="result"]:checked').value;
    const details = document.getElementById('details').value;
    const reflection = document.getElementById('reflection').value;
    const date = new Date().toLocaleString();

    const record = { id: Date.now(), opponent, result, details, reflection, date };
    saveRecord(record);
    addRecordToDOM(record);
    recordForm.reset();
});

function saveRecord(record) {
    let records = getRecordsFromStorage();
    records.unshift(record);
    localStorage.setItem('smashRecords', JSON.stringify(records));
}

function getRecordsFromStorage() {
    let records = localStorage.getItem('smashRecords');
    return records ? JSON.parse(records) : [];
}

function loadRecords() {
    const records = getRecordsFromStorage();
    historyList.innerHTML = '';
    records.forEach(record => addRecordToDOM(record));
}

function addRecordToDOM(record) {
    const card = document.createElement('div');
    card.classList.add('card', record.result === 'WIN' ? 'card-win' : 'card-lose');
    card.setAttribute('data-id', record.id);
    card.innerHTML = `
        <div class="card-header">
            <span>vs ${record.opponent} (${record.result})</span>
            <button class="delete-btn" onclick="deleteRecord(${record.id})">削除</button>
        </div>
        <div class="card-body">
            <p><strong>対策・対戦内容:</strong> ${record.details}</p>
            <p><strong>反省点:</strong> ${record.reflection}</p>
            <small style="color: #777;">${record.date}</small>
        </div>
    `;
    historyList.appendChild(card);
}

window.deleteRecord = function(id) {
    if (confirm('削除しますか？')) {
        let records = getRecordsFromStorage();
        records = records.filter(r => r.id !== id);
        localStorage.setItem('smashRecords', JSON.stringify(records));
        document.querySelector(`[data-id="${id}"]`).remove();
    }
};