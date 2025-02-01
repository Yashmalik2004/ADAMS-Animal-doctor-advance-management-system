document.addEventListener("DOMContentLoaded", function () {
  loadDataFromStorage(); // Load stored pet data
  loadMedicineFromStorage(); // Load stored medicine data

  // Handle Pet Data Form Submission
  document.getElementById("data-form").addEventListener("submit", function (event) {
      event.preventDefault();
      addDataToTable();
  });

  // Handle Medicine Data Form Submission
  document.getElementById("medicine-form").addEventListener("submit", function (event) {
      event.preventDefault();
      addMedicineToTable();
  });
});

// ✅ **1. Add Pet Data Entry & Save**
function addDataToTable() {
  const formData = new FormData(document.getElementById("data-form"));
  const tableBody = document.querySelector("#data-table tbody");
  const newRow = document.createElement("tr");

  let rowData = {};

  formData.forEach((value, key) => {
      const newCell = document.createElement("td");
      newCell.textContent = value;
      newRow.appendChild(newCell);
      rowData[key] = value;
  });

  tableBody.appendChild(newRow);
  savePetData(rowData);
  document.getElementById("data-form").reset();
}

// ✅ **2. Store Pet Data in Local Storage**
function savePetData(data) {
  let petRecords = JSON.parse(localStorage.getItem("petRecords")) || [];
  petRecords.push(data);
  localStorage.setItem("petRecords", JSON.stringify(petRecords));
}

// ✅ **3. Load Pet Data from Local Storage**
function loadDataFromStorage() {
  let petRecords = JSON.parse(localStorage.getItem("petRecords")) || [];
  let tableBody = document.querySelector("#data-table tbody");

  petRecords.forEach(record => {
      let newRow = document.createElement("tr");
      Object.values(record).forEach(value => {
          let newCell = document.createElement("td");
          newCell.textContent = value;
          newRow.appendChild(newCell);
      });
      tableBody.appendChild(newRow);
  });
}

// ✅ **4. Add Medicine Data Entry & Save**
function addMedicineToTable() {
  const formData = new FormData(document.getElementById("medicine-form"));
  const tableBody = document.querySelector("#medicine-table tbody");
  const newRow = document.createElement("tr");

  let rowData = {};

  formData.forEach((value, key) => {
      const newCell = document.createElement("td");
      newCell.textContent = value;
      newRow.appendChild(newCell);
      rowData[key] = value;
  });

  tableBody.appendChild(newRow);
  saveMedicineData(rowData);
  checkExpiryDate(rowData["expiry-date"]);
  document.getElementById("medicine-form").reset();
}

// ✅ **5. Store Medicine Data in Local Storage**
function saveMedicineData(data) {
  let medicineRecords = JSON.parse(localStorage.getItem("medicineRecords")) || [];
  medicineRecords.push(data);
  localStorage.setItem("medicineRecords", JSON.stringify(medicineRecords));
}

// ✅ **6. Load Medicine Data from Local Storage**
function loadMedicineFromStorage() {
  let medicineRecords = JSON.parse(localStorage.getItem("medicineRecords")) || [];
  let tableBody = document.querySelector("#medicine-table tbody");

  medicineRecords.forEach(record => {
      let newRow = document.createElement("tr");
      Object.values(record).forEach(value => {
          let newCell = document.createElement("td");
          newCell.textContent = value;
          newRow.appendChild(newCell);
      });
      tableBody.appendChild(newRow);
  });
}

// ✅ **7. Upload & Parse Excel Data**
function handleExcelUpload() {
  const file = document.getElementById("excel-upload").files[0];
  if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const json = XLSX.utils.sheet_to_json(worksheet);

          json.forEach(row => {
              const tableBody = document.querySelector("#data-table tbody");
              const newRow = document.createElement("tr");

              Object.values(row).forEach(value => {
                  const newCell = document.createElement("td");
                  newCell.textContent = value;
                  newRow.appendChild(newCell);
              });

              tableBody.appendChild(newRow);
              savePetData(row);
          });
      };
      reader.readAsArrayBuffer(file);
  }
}

// ✅ **8. Check Medicine Expiry & Send Alert**
function checkExpiryDate(expiryDate) {
  const today = new Date();
  const expiry = new Date(expiryDate);

  if (expiry < today) {
      sendEmailNotification(expiryDate);
  }
}
function shut(){
  window.open('index.html','_self');
  window.close();
}
// ✅ **9. Send Expiry Email Alert**
function sendEmailNotification(expiryDate) {
  let email = "yashmalik4832004thirdacc@gmail.com"; // Replace with actual vet's email
  let subject = encodeURIComponent("⚠️ Medicine Expiry Alert");
  let body = encodeURIComponent(`The following medicine has expired on ${expiryDate}. Please restock immediately.`);

  window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
}
document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("data-form")) {
      loadDataFromStorage();
      document.getElementById("data-form").addEventListener("submit", function (event) {
          event.preventDefault();
          addDataToTable();
      });
  }

  if (document.getElementById("medicine-form")) {
      loadMedicineFromStorage();
      document.getElementById("medicine-form").addEventListener("submit", function (event) {
          event.preventDefault();
          addMedicineToTable();
      });
  }
});

// ✅ Other functions remain the same (data storage, retrieval, expiry alerts, etc.)
