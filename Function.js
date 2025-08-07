// Data for the web application
const appData = {
    services: {
        hotels: [
            { id: 'h1', name: 'Hotel Green View', contact: '+8801234567890', distance: '3km' },
            { id: 'h2', name: 'Grand Royal Inn', contact: '+8801234567891', distance: '5km' },
            { id: 'h3', name: 'Lakeside Resort', contact: '+8801234567892', distance: '10km' },
            { id: 'h4', name: 'City Center Hotel', contact: '+8801234567893', distance: '1km' }
        ],
        hospitals: [
            { id: 'hp1', name: 'Central Hospital', contact: '+8801234567894', distance: '2km' },
            { id: 'hp2', name: 'Medica Care', contact: '+8801234567895', distance: '4km' },
            { id: 'hp3', name: 'Unity Clinic', contact: '+8801234567896', distance: '7km' }
        ],
        fuelPumps: [
            { id: 'f1', name: 'Ena Filling Station', contact: '+8801234567897', distance: '1km' },
            { id: 'f2', name: 'Shell Petrol Pump', contact: '+8801234567898', distance: '6km' }
        ],
        restaurants: [
            { id: 'r1', name: 'Taste of Bengal', contact: '+8801234567899', distance: '2km' },
            { id: 'r2', name: 'Italiano Pizza', contact: '+8801234567900', distance: '4km' },
            { id: 'r3', name: 'The Kebab House', contact: '+8801234567901', distance: '8km' }
        ],
        atms: [
            { id: 'a1', name: 'Brac Bank ATM', contact: 'N/A', distance: '1km' },
            { id: 'a2', name: 'Dutch Bangla Bank ATM', contact: 'N/A', distance: '3km' },
            { id: 'a3', name: 'City Bank ATM', contact: 'N/A', distance: '5km' }
        ]
    },
    user: {
        name: 'John Doe',
        mobile: '+880 1712 345678',
        joiningDate: 'January 1, 2024'
    }
};

// Function to generate and display cards for a given category
function displayCards(containerId, categoryData) {
    const container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear previous cards

    if (categoryData.length === 0) {
        container.innerHTML = '<p>No results found.</p>';
        return;
    }

    categoryData.forEach(item => {
        const cardHtml = `
            <div class="card">
                <div class="card-content">
                    <h3>${item.name}</h3>
                    <p>Contact: ${item.contact}</p>
                    <p>Distance: ${item.distance}</p>
                </div>
            </div>
        `;
        container.innerHTML += cardHtml;
    });
}

// Function to filter cards based on search query
function filterCards(query) {
    const allContainers = document.querySelectorAll('.card-container');
    const allTitles = document.querySelectorAll('.section-title');
    const lowerCaseQuery = query.toLowerCase();

    // Loop through each service category
    for (const service in appData.services) {
        const container = document.getElementById(`${service}-container`);
        const title = container.previousElementSibling;

        // Filter the items in the current category
        const filteredItems = appData.services[service].filter(item => {
            return item.name.toLowerCase().includes(lowerCaseQuery) ||
                   service.toLowerCase().includes(lowerCaseQuery);
        });

        // Display the filtered results
        if (filteredItems.length > 0) {
            title.style.display = 'block';
            container.style.display = 'flex';
            displayCards(`${service}-container`, filteredItems);
        } else {
            title.style.display = 'none';
            container.style.display = 'none';
        }
    }
}

// Function to switch between Home and Profile pages
function showSection(event, sectionId) {
    // Get all content sections
    const sections = document.querySelectorAll('main section');
    sections.forEach(section => {
        if (section.id === sectionId) {
            section.classList.add('active-section');
            section.classList.remove('inactive-section');
        } else {
            section.classList.add('inactive-section');
            section.classList.remove('active-section');
        }
    });

    // Update active class on navigation links
    document.querySelectorAll('nav a').forEach(navItem => {
        navItem.classList.remove('active');
    });
    if (event && event.target) {
        event.target.classList.add('active');
    }
}

// Initial data loading on page load
document.addEventListener('DOMContentLoaded', () => {
    // Display all cards initially
    displayCards('hotels-container', appData.services.hotels);
    displayCards('hospitals-container', appData.services.hospitals);
    displayCards('fuel-pumps-container', appData.services.fuelPumps);
    displayCards('restaurants-container', appData.services.restaurants);
    displayCards('atms-container', appData.services.atms);

    // Populate profile page data
    document.getElementById('profile-name').textContent = appData.user.name;
    document.getElementById('profile-mobile').textContent = appData.user.mobile;
    document.getElementById('profile-joining-date').textContent = appData.user.joiningDate;

    // Initially hide the profile page
    document.getElementById('profile-page').classList.add('inactive-section');

    // Attach search event listener
    document.getElementById('search-bar').addEventListener('input', (event) => {
        filterCards(event.target.value);
    });
});