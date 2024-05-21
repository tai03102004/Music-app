// Function to fetch and display the list of countries


var countryInput = document.getElementById('sid-input');

if (countryInput && countryInput.classList.contains('country')) {
    fetchCountries();
}

async function fetchCountries() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const countries = await response.json();
    
        const countryNames = countries.map(country => country.name.common);
    
        countryInput.placeholder = 'Select a country'; 
        countryInput.autocomplete = 'off';

        const dataList = document.createElement('datalist'); // Tạo thêm 1 thẻ mới dataList
        dataList.id = 'countriesList'; 

        countryNames.forEach(country => {
            const option = document.createElement('option');
            option.value = country;
            dataList.appendChild(option);
        });

        document.body.appendChild(dataList);

        countryInput.setAttribute('list', 'countriesList');


    } catch (error) {
        console.error('Error fetching countries:', error);
    }
}

var inputElementCollege = document.querySelector('.sid-field.sid-college #sid-input');
var divElementCollege = document.querySelector('.sid-field.sid-college');


if (inputElementCollege) {

    inputElementCollege.addEventListener("click", function (){
        fetchCollege();
    })

}


async function fetchCollege() {
    try {
        const response = await fetch("../../daihoc.json");
        
        const college = await response.json();

        const collegeName = college.dai_hoc.map( daihoc => daihoc.ten);

        inputElementCollege.placeholder = 'Select a college'; 
        inputElementCollege.autocomplete = 'off';

        const dataList = document.createElement('datalist'); // Tạo thêm 1 thẻ mới dataList
        dataList.id = 'collegeList'; 

        collegeName.forEach(country => {
            const option = document.createElement('option');
            option.value = country;
            dataList.appendChild(option);
        });

        document.body.appendChild(dataList);

        inputElementCollege.setAttribute('list', 'collegeList');

        
    } catch (error) {
        console.error("Error fetching or processing college data:", error.message);
    }
}


