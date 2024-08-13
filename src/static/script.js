// Add Entry Modal
var modal = document.getElementById("addEntryModal");
var btn = document.querySelector(".add-btn");
var span = document.getElementsByClassName("close-btn")[0];

btn.onclick = function () {
    modal.style.display = "block";
};

span.onclick = function () {
    modal.style.display = "none";
    console.log("clicked");
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

window.onclick = function (event) {
    if (event.target == editExpenseModal) {
        editExpenseModal.style.display = 'none';
    }
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};

// Delete confirmation modal
function confirmDelete() {
    return confirm("Are you sure you want to delete this expense?");
}