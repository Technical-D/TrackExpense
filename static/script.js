// Add Entry Modal
var modal = document.getElementById("addEntryModal");
var btn = document.querySelector(".add-btn");
var span = document.getElementsByClassName("close-btn")[0];

btn.onclick = function () {
    modal.style.display = "block";
};

span.onclick = function () {
    modal.style.display = "none";
};


// Function to set the max date to today
function setMaxDate() {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();

    if (mm < 10) {
        mm = '0' + mm;
    }

    if (dd < 10) {
        dd = '0' + dd;
    }

    const maxDate = yyyy + '-' + mm + '-' + dd;
    document.getElementById('date').setAttribute('max', maxDate);
}

window.onload = setMaxDate;

// Edit Expense Modal
var editExpenseModal = document.getElementById('editExpenseModal');

function openEditModal(expenseId, date, description, amount, method) {
    let numericAmount = parseFloat(amount);
    if (isNaN(numericAmount)) {
        numericAmount = 0;
    }
    document.getElementById('editExpenseId').value = expenseId;
    document.getElementById('editDate').value = date;
    document.getElementById('editDescription').value = description;
    document.getElementById('editAmount').value = numericAmount;
    document.getElementById('editMethod').value = method;

    editExpenseModal.style.display = 'block';
}

var closeBtns = document.getElementsByClassName('close-btn');
for (let btn of closeBtns) {
    btn.onclick = function () {
        this.parentElement.parentElement.style.display = 'none';
    };
}


// Delete confirmation modal
function confirmDelete() {
    return confirm("Are you sure you want to delete this expense?");
}

// Remove alert after 3 seconds
document.addEventListener('DOMContentLoaded', (event) => {

    const flashMessage = document.getElementById('flash-msg');
    
    if (flashMessage) {
        setTimeout(() => {
            flashMessage.style.opacity = '0';
            flashMessage.remove();
        }, 8000);
    }
});

// Pagination variables
const rowsPerPage = 10;
let currentPage = 1;

function paginateTable() {
    const table = document.getElementById('expenseTable');
    const rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    const totalPages = Math.ceil(rows.length / rowsPerPage);

    for (let i = 0; i < rows.length; i++) {
        rows[i].style.display = 'none';
    }

    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    for (let i = start; i < end && i < rows.length; i++) {
        rows[i].style.display = '';
    }

    document.getElementById('pageInfo').textContent = `Page ${currentPage} of ${totalPages}`;

    document.querySelector('.pagination button:first-child').disabled = currentPage === 1;
    document.querySelector('.pagination button:last-child').disabled = currentPage === totalPages;
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        paginateTable();
    }
}

function nextPage() {
    const table = document.getElementById('expenseTable');
    const rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    const totalPages = Math.ceil(rows.length / rowsPerPage);

    if (currentPage < totalPages) {
        currentPage++;
        paginateTable();
    }
}

window.onload = paginateTable;

// Filter Modal
var filtermodal = document.getElementById('filterExpensesModal');
var filterBtn = document.querySelector('.filter-btn');
var closeBtn = filtermodal.querySelector('.filter-close-btn');

filterBtn.onclick = function () {
    filtermodal.style.display = "block";
};

closeBtn.onclick = function () {
    filtermodal.style.display = "none";
};

// closing modal on clicking outside
window.onclick = function (event) {
    if (event.target == editExpenseModal) {
        editExpenseModal.style.display = 'none';
    }
    if (event.target == modal) {
        modal.style.display = 'none';
    }
    if (event.target === filtermodal) {
        filtermodal.style.display = 'none';
    }
};