async function getData() {
    const url = "https://data.gov.bh/api/explore/v2.1/catalog/datasets/01-statistics-of-students-nationalities_updated/records?where=colleges%20like%20%22IT%22%20AND%20the_programs%20like%20%22bachelor%22&limit=100";

    try {
        const response = await fetch(url); // Fetch data
        const data = await response.json(); // Parse JSON
        console.log(data); 

        const records = data.results; // Access the results

        populateTable(records); // Populate table
    } catch (error) {
        console.error('Error fetching data:', error); // Log any error
    }
}

function populateTable(records) {
    const tbody = document.querySelector('#student-data tbody');
    tbody.innerHTML = ''; 

    if (!records || records.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6">No data available</td></tr>'; 
        return;
    }

    records.forEach(d => {
        const tr = document.createElement('tr');
        
        const year = document.createElement('td');
        const semester = document.createElement('td');
        const programs = document.createElement('td');
        const nationality = document.createElement('td');
        const colleges = document.createElement('td');
        const number_of_students = document.createElement('td');

        year.textContent = d.year || 'N/A';
        semester.textContent = d.semester || 'N/A';
        programs.textContent = d.the_programs || 'N/A'; 
        nationality.textContent = d.nationality || 'N/A';
        colleges.textContent = d.colleges || 'N/A'; 
        number_of_students.textContent = d.number_of_students || 'N/A';

        tr.appendChild(year);
        tr.appendChild(semester);
        tr.appendChild(programs);
        tr.appendChild(nationality);
        tr.appendChild(colleges);
        tr.appendChild(number_of_students);

        tbody.appendChild(tr); 
    });
}

// get Data 
window.onload = getData;