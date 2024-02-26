// Function to process the "Class" value if it contains multiple classes separated by commas
function processClassValue(classValue) {
  if (classValue.includes(',')) {
    return classValue.split(',').map(cls => cls.trim()).join(', ');
  } else {
    return classValue;
  }
}

// Function to handle the search field change
function handleSearchFieldChange(event) {
  const searchInput = document.getElementById('searchInput');
  const searchInputLabel = document.getElementById('searchInputLabel');
  const searchField = event.target.value;

  if (searchField === 'appNumber') {
    searchInputLabel.textContent = 'Search by Application Number:';
    searchInput.placeholder = 'Search by Application Number';
  } else if (searchField === 'tmName') {
    searchInputLabel.textContent = 'Search by Trademark Name:';
    searchInput.placeholder = 'Search by Trademark Name';
  } else if (searchField === 'applicantName') {
    searchInputLabel.textContent = 'Search by Applicant Name:';
    searchInput.placeholder = 'Search by Applicant Name';
  } else if (searchField === 'allFields') {
    searchInputLabel.textContent = 'Search All Fields:';
    searchInput.placeholder = 'Search by Application Number, Trademark Name, or Applicant Name';
  }
}


document.addEventListener('DOMContentLoaded', function () 
{
  let currentPage = 1;
  const recordsPerPage = 20;
  let data = [];
  let filteredData = [];
  let finalFilteredData = [];

  // Function to fetch JSON data
  async function fetchData() {
    try {
      const response = await fetch('data.json');
      data = await response.json();
      filteredData = data.slice();
      finalFilteredData = data.slice();
      showCurrentPageData(currentPage);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  // Function to populate the table with data for a given page
  function showCurrentPageData(page) {
    const tableBody = document.querySelector('#resultsTable tbody');
    tableBody.innerHTML = '';

    const startIdx = (page - 1) * recordsPerPage;
    const endIdx = startIdx + recordsPerPage;
    const currentPageData = finalFilteredData.slice(startIdx, endIdx);

    currentPageData.forEach((record) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${record['Application Number']}</td>
        <td>${record['Trademark Name']}</td>
        <td>${record['Applicant Name']}</td>
        <td>${processClassValue(record['Class'])}</td>
      `;
      tableBody.appendChild(row);
    });

    updatePaginationInfo(page);
  }

  // Function to update the pagination information
  function updatePaginationInfo(page) {
    const totalRecordsElement = document.getElementById('totalRecords');
    const totalPages = Math.ceil(finalFilteredData.length / recordsPerPage);
    totalRecordsElement.textContent = `Total records: ${finalFilteredData.length}`;

    const currentPageElement = document.getElementById('currentPage');
    currentPageElement.textContent = `Page ${page} of ${totalPages}`;

    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');

    if (page === 1) {
      prevButton.disabled = true;
    } else {
      prevButton.disabled = false;
    }

    if (page === totalPages || totalPages === 0) {
      nextButton.disabled = true;
    } else {
      nextButton.disabled = false;
    }
  }

  // Function to go to the previous page
  function goToPreviousPage() {
    const prevPage = currentPage - 1;
    if (prevPage >= 1) {
      currentPage = prevPage;
      showCurrentPageData(currentPage);
    }
  }

  // Function to go to the next page
  function goToNextPage() {
    const nextPage = currentPage + 1;
    const totalPages = Math.ceil(finalFilteredData.length / recordsPerPage);
    if (nextPage <= totalPages) {
      currentPage = nextPage;
      showCurrentPageData(currentPage);
    }
  }

  // Function to search by Application Number
  function searchByApplicationNumber(query) {
    finalFilteredData = data.filter((record) =>
      typeof record['Application Number'] === 'string' &&
      record['Application Number'].toLowerCase().includes(query.toLowerCase())
    );
    currentPage = 1;
    showCurrentPageData(currentPage);
  }

  // Function to search by Trademark Name
  function searchByTrademarkName(query) {
    finalFilteredData = data.filter((record) =>
      typeof record['Trademark Name'] === 'string' &&
      record['Trademark Name'].toLowerCase().includes(query.toLowerCase())
    );
    currentPage = 1;
    showCurrentPageData(currentPage);
  }

  // Function to search by Applicant Name
  function searchByApplicantName(query) {
    finalFilteredData = data.filter((record) =>
      typeof record['Applicant Name'] === 'string' &&
      record['Applicant Name'].toLowerCase().includes(query.toLowerCase())
    );
    currentPage = 1;
    showCurrentPageData(currentPage);
  }

  // Function to search all fields for a given query
  function searchAllFields(query) {
    finalFilteredData = data.filter((record) => {
      for (const key in record) {
        if (record.hasOwnProperty(key)) {
          const value = record[key].toString().toLowerCase();
          if (value.includes(query.toLowerCase())) {
            return true;
          }
        }
      }
      return false;
    });

    currentPage = 1;
    showCurrentPageData(currentPage);
  }
// Function to process the "Class" value if it contains multiple classes separated by commas
function processClassValue(classValue) {
  if (classValue.includes(',')) {
    return classValue.split(',').map(cls => cls.trim()).join(', ');
  } else {
    return classValue;
  }
}

// Function to add checkboxes for classes
function addClassCheckboxes() {
  const classesContainer = document.getElementById("classesContainer");
  for (let i = 1; i <= 45; i++) {
    const checkboxContainer = document.createElement("div");
    checkboxContainer.classList.add("checkbox-item"); // Add the CSS class to the container

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `class${i}`;
    checkbox.value = i;

    const label = document.createElement("label");
    label.htmlFor = `class${i}`;
    label.textContent = `${i}`;

    checkboxContainer.appendChild(checkbox);
    checkboxContainer.appendChild(label);

    classesContainer.appendChild(checkboxContainer);

    if (i % 5 === 0) {
      classesContainer.appendChild(document.createElement("br"));
    }
  }
}


// Function to get the selected classes
function getSelectedClasses() {
  const selectedClasses = [];
  const checkboxes = document.querySelectorAll("#classesContainer input[type='checkbox']:checked");
  checkboxes.forEach((checkbox) => {
    selectedClasses.push(parseInt(checkbox.value));
  });
  return selectedClasses;
}

// Function to log the selected classes to the console and apply filters to update the table
function logSelectedClasses() {
  applyFilters();
  console.log("Selected Classes:", getSelectedClasses());
}

// Function to add event listeners to checkboxes
function addCheckboxEventListeners() {
  const checkboxes = document.querySelectorAll("#classesContainer input[type='checkbox']");
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", logSelectedClasses);
  });
}

/// Function to handle the search field change
function handleSearchFieldChange(event) {
  const searchInput = document.getElementById('searchInput');
  const searchInputLabel = document.getElementById('searchInputLabel');
  const searchField = event.target.value;

  if (searchField === 'appNumber') {
    searchInputLabel.textContent = 'Search by Application Number:';
    searchInput.placeholder = 'Search by Application Number';
  } else if (searchField === 'tmName') {
    searchInputLabel.textContent = 'Search by Trademark Name:';
    searchInput.placeholder = 'Search by Trademark Name';
  } else if (searchField === 'applicantName') {
    searchInputLabel.textContent = 'Search by Applicant Name:';
    searchInput.placeholder = 'Search by Applicant Name';
  } else if (searchField === 'allFields') {
    searchInputLabel.textContent = 'Search All Fields:';
    searchInput.placeholder = 'Search by Application Number, Trademark Name, or Applicant Name';
  }

  // Update the table with filtered data based on the search field
  applyFilters();
}

function applyFilters() {
  const searchText = document.getElementById('searchInput').value.trim();
  const searchField = document.querySelector('input[name="searchField"]:checked').value;

  // Apply search filter
  if (searchText !== '') {
    if (searchField === 'appNumber') {
      searchByApplicationNumber(searchText);
    } else if (searchField === 'tmName') {
      searchByTrademarkName(searchText);
    } else if (searchField === 'applicantName') {
      searchByApplicantName(searchText);
    } else if (searchField === 'allFields') {
      searchAllFields(searchText);
    }
  } else {
    finalFilteredData = data.slice();
  }

  // Apply class filter based on the finalFilteredData
  const selectedClasses = getSelectedClasses();
  if (selectedClasses.length > 0) {
    finalFilteredData = finalFilteredData.filter((record) => {
      const classes = Array.isArray(record['Class'])
        ? record['Class']
        : record['Class'].toString().split(',').map(cls => cls.trim());

      return selectedClasses.every((selectedClass) => classes.includes(selectedClass.toString()));
    });
  }

  showCurrentPageData(currentPage);
}






// Function to handle the search button click
function handleSearchButtonClick() {
  applyFilters();
}
// Function to handle the checkbox change
function handleCheckboxChange() {
  applyFilters();
}

// Add event listeners to the pagination buttons
document.getElementById('prevButton').addEventListener('click', goToPreviousPage);
document.getElementById('nextButton').addEventListener('click', goToNextPage);

// Add event listener for the search button click
document.getElementById('searchButton').addEventListener('click', handleSearchButtonClick);

// Add event listener for checkbox changes
const checkboxes = document.querySelectorAll("#classesContainer input[type='checkbox']");
checkboxes.forEach(checkbox => checkbox.addEventListener("change", handleCheckboxChange));
  // Load data and populate the table when the page loads
  fetchData();
  // Call the functions to initialize the checkboxes and add event listeners
  addClassCheckboxes();
  addCheckboxEventListeners();
});
