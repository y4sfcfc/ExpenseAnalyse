const expenses = {
    1: Array(7).fill(0),
    2: Array(7).fill(0),
    3: Array(7).fill(0),
    4: Array(7).fill(0),
    5: Array(7).fill(0),
    6: Array(7).fill(0),
};

document.getElementById('expenseForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const day = parseInt(document.getElementById('day').value) - 1;
    const category = parseInt(document.getElementById('category').value);
    const amount = parseFloat(document.getElementById('amount').value);
    expenses[category][day] += amount;
    alert('Xərc əlavə edildi');
    document.getElementById('expenseForm').reset();
});

function showAnalysis() {
    const totalExpenses = Array(7).fill(0);
    const categoryTotals = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
    let overallTotal = 0;

    for (let category in expenses) {
        for (let day = 0; day < 7; day++) {
            categoryTotals[category] += expenses[category][day];
            totalExpenses[day] += expenses[category][day];
            overallTotal += expenses[category][day];
        }
    }

    const avgDailyExpense = overallTotal / 7;

    const maxCategory = Object.keys(categoryTotals).reduce((a, b) => categoryTotals[a] > categoryTotals[b] ? a : b);
    const minCategory = Object.keys(categoryTotals).reduce((a, b) => categoryTotals[a] < categoryTotals[b] ? a : b);

    const maxDay = totalExpenses.indexOf(Math.max(...totalExpenses)) + 1;
    const minDay = totalExpenses.indexOf(Math.min(...totalExpenses)) + 1;

    const analysisHtml = `
        <p>Həftə ərzində toplam xərc: ${overallTotal.toFixed(2)}</p>
        <p>Ən çox hansı növ üçün xərc çəkilib və miqdarı: ${getCategoryName(maxCategory)} - ${categoryTotals[maxCategory].toFixed(2)}</p>
        <p>Ən az hansı növ üçün xərc çəkilib və miqdarı: ${getCategoryName(minCategory)} - ${categoryTotals[minCategory].toFixed(2)}</p>
        <p>Günlük ortalama xərc nə qədərdir: ${avgDailyExpense.toFixed(2)}</p>
        <p>Ən çox hansı gün xərc edilib və miqdarı: Gün ${maxDay} - ${totalExpenses[maxDay - 1].toFixed(2)}</p>
        <p>Ən az hansı gün xərc edilib və miqdarı: Gün ${minDay} - ${totalExpenses[minDay - 1].toFixed(2)}</p>
        <h5>7 günə aid xərclər tablosu:</h5>
        <table class="table">
            <thead>
                <tr>
                    <th>Gün</th>
                    <th>Qida</th>
                    <th>Nəqliyyat</th>
                    <th>Təhsil</th>
                    <th>Kommunikasiya</th>
                    <th>Geyim</th>
                    <th>Digər</th>
                </tr>
            </thead>
            <tbody>
                ${generateTable()}
            </tbody>
        </table>
    `;
    document.getElementById('analysisResult').innerHTML = analysisHtml;
}

function getCategoryName(categoryId) {
    switch (parseInt(categoryId)) {
        case 1: return 'Qida';
        case 2: return 'Nəqliyyat';
        case 3: return 'Təhsil';
        case 4: return 'Kommunikasiya';
        case 5: return 'Geyim';
        case 6: return 'Digər';
        default: return '';
    }
}

function generateTable() {
    let tableRows = '';
    for (let day = 0; day < 7; day++) {
        tableRows += `<tr>
            <td>Gün ${day + 1}</td>
            <td>${expenses[1][day].toFixed(2)}</td>
            <td>${expenses[2][day].toFixed(2)}</td>
            <td>${expenses[3][day].toFixed(2)}</td>
            <td>${expenses[4][day].toFixed(2)}</td>
            <td>${expenses[5][day].toFixed(2)}</td>
            <td>${expenses[6][day].toFixed(2)}</td>
        </tr>`;
    }
    return tableRows;
}
