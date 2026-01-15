// Car Data
const cars = [
    { name: 'Tata Punch', image: 'images/punch.webp', fuel: 'Petrol', transmission: 'Manual', seats: 5, price: 150 },
    { name: 'Tata Safari', image: 'images/safari.webp', fuel: 'Diesel', transmission: 'Automatic', seats: 7, price: 350 },
    { name: 'Tata Nexon', image: 'images/nexon.webp', fuel: 'Petrol', transmission: 'Manual', seats: 5, price: 200 },
    { name: 'Fortuner', image: 'images/fortuner.webp', fuel: 'Diesel', transmission: 'Automatic', seats: 7, price: 600 },
    { name: 'Swift', image: 'images/swift.webp', fuel: 'Petrol', transmission: 'Manual', seats: 5, price: 120 },
    { name: 'Defender', image: 'images/defender.webp', fuel: 'Diesel', transmission: 'Automatic', seats: 5, price: 800 },
    { name: 'Hyundai Verna', image: 'images/verna.webp', fuel: 'Petrol', transmission: 'Automatic', seats: 5, price: 250 },
    { name: 'Hyundai Creta', image: 'images/creta.webp', fuel: 'Diesel', transmission: 'Automatic', seats: 5, price: 300 },
    { name: 'Alto 800', image: 'images/alto.webp', fuel: 'Petrol', transmission: 'Manual', seats: 4, price: 80 },
    { name: 'Dzire', image: 'images/dzire.webp', fuel: 'Petrol', transmission: 'Manual', seats: 5, price: 140 }
];

// DOM Elements
const loginBtn = document.getElementById('loginBtn');
const loginModal = document.getElementById('loginModal');
const closeLogin = document.getElementById('closeLogin');
const loginForm = document.getElementById('loginForm');
const navRight = document.getElementById('navRight');

const bookingModal = document.getElementById('bookingModal');
const closeBooking = document.getElementById('closeBooking');
const bookingForm = document.getElementById('bookingForm');

const hostModal = document.getElementById('hostModal');
const closeHost = document.getElementById('closeHost');
const hostForm = document.getElementById('hostForm');
const becomeHostBtn = document.getElementById('becomeHostBtn');

const searchCarsBtn = document.getElementById('searchCarsBtn');
const browseAllBtn = document.getElementById('browseAllBtn');
const carsGrid = document.getElementById('carsGrid');
const notification = document.getElementById('notification');

let currentCarForBooking = null;

// Initialize
function init() {
    checkLoginStatus();
    renderCars();
    setupEventListeners();
    observeCarCards();
}

// Check Login Status
function checkLoginStatus() {
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
        updateNavbarLoggedIn(userEmail);
    }
}

// Update Navbar for Logged In User
function updateNavbarLoggedIn(email) {
    navRight.innerHTML = `
        <span class="user-email">${email}</span>
        <button class="btn-logout" id="logoutBtn">Logout</button>
    `;
    
    document.getElementById('logoutBtn').addEventListener('click', logout);
}

// Logout
function logout() {
    localStorage.removeItem('userEmail');
    navRight.innerHTML = '<button class="btn-login" id="loginBtn">Login / Sign up</button>';
    document.getElementById('loginBtn').addEventListener('click', () => {
        loginModal.style.display = 'block';
    });
    showNotification('Logged out successfully');
}

// Render Cars
function renderCars() {
    carsGrid.innerHTML = '';
    cars.forEach((car, index) => {
        const carCard = document.createElement('div');
        carCard.className = 'car-card';
        carCard.innerHTML = `
            <img src="${car.image}" alt="${car.name}" class="car-image">
            <div class="car-info">
                <h3 class="car-name">${car.name}</h3>
                <p class="car-specs">${car.fuel} • ${car.transmission} • ${car.seats} Seats</p>
                <div class="car-price">₹${car.price} <span>/hour</span></div>
                <button class="btn-book" data-index="${index}">Book Now</button>
            </div>
        `;
        carsGrid.appendChild(carCard);
    });
    
    // Add click listeners to book buttons
    document.querySelectorAll('.btn-book').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = e.target.dataset.index;
            currentCarForBooking = cars[index];
            
            const userEmail = localStorage.getItem('userEmail');
            if (!userEmail) {
                showNotification('Please login to book a car');
                loginModal.style.display = 'block';
                return;
            }
            
            bookingModal.style.display = 'block';
            document.getElementById('bookingEmail').value = userEmail;
        });
    });
}

// Show Notification
function showNotification(message) {
    notification.textContent = message;
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Setup Event Listeners
function setupEventListeners() {
    // Login Modal
    loginBtn.addEventListener('click', () => {
        loginModal.style.display = 'block';
    });
    
    closeLogin.addEventListener('click', () => {
        loginModal.style.display = 'none';
    });
    
    // Booking Modal
    closeBooking.addEventListener('click', () => {
        bookingModal.style.display = 'none';
    });
    
    // Host Modal
    becomeHostBtn.addEventListener('click', () => {
        hostModal.style.display = 'block';
    });
    
    closeHost.addEventListener('click', () => {
        hostModal.style.display = 'none';
    });
    
    // Close modals on outside click
    window.addEventListener('click', (e) => {
        if (e.target === loginModal) loginModal.style.display = 'none';
        if (e.target === bookingModal) bookingModal.style.display = 'none';
        if (e.target === hostModal) hostModal.style.display = 'none';
    });
    
    // Search Cars Button
    searchCarsBtn.addEventListener('click', () => {
        document.getElementById('carsSection').scrollIntoView({ behavior: 'smooth' });
    });
    
    // Browse All Button
    browseAllBtn.addEventListener('click', () => {
        document.getElementById('carsSection').scrollIntoView({ behavior: 'smooth' });
    });
    
    // Login Form
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        if (email && password) {
            localStorage.setItem('userEmail', email);
            updateNavbarLoggedIn(email);
            loginModal.style.display = 'none';
            showNotification('Login successful!');
            loginForm.reset();
        }
    });
    
    // Booking Form
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('bookingName').value;
        const email = document.getElementById('bookingEmail').value;
        const aadhaar = document.getElementById('aadhaarUpload').files[0];
        const photo = document.getElementById('photoUpload').files[0];
        const bookingType = document.getElementById('bookingType').value;
        const duration = document.getElementById('duration').value;
        
        if (name && email && aadhaar && photo && bookingType && duration) {
            bookingModal.style.display = 'none';
            showNotification('Booking Confirmed!');
            bookingForm.reset();
        }
    });
    
    // Host Form
    hostForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const carName = document.getElementById('carName').value;
        const regNumber = document.getElementById('regNumber').value;
        const carPapers = document.getElementById('carPapers').files[0];
        const ownerName = document.getElementById('ownerName').value;
        const ownerAadhaar = document.getElementById('ownerAadhaar').files[0];
        const ownerPhoto = document.getElementById('ownerPhoto').files[0];
        
        if (carName && regNumber && carPapers && ownerName && ownerAadhaar && ownerPhoto) {
            hostModal.style.display = 'none';
            showNotification('Application submitted successfully!');
            hostForm.reset();
        }
    });
}

// Observe Car Cards for Animation
function observeCarCards() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    // Observe initial cards
    document.querySelectorAll('.car-card').forEach(card => {
        observer.observe(card);
    });
    
    // Re-observe when new cards are added
    const gridObserver = new MutationObserver(() => {
        document.querySelectorAll('.car-card:not(.visible)').forEach(card => {
            observer.observe(card);
        });
    });
    
    gridObserver.observe(carsGrid, { childList: true });
}

// Initialize on load
document.addEventListener('DOMContentLoaded', init);
