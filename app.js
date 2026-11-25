const recordForm = document.getElementById('record-form');
const historyList = document.getElementById('history-list');

document.addEventListener('DOMContentLoaded', loadRecords);

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