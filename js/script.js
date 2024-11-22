console.log ('hi')

function navig() {
    nbbr = document.querySelector('ul')
    console.log('no')



        nbbr.style.display= 'block'
        hey = document.getElementById('ham1')
        hey.style.display = 'none'

        hi = document.getElementById('cross')
        hi.style.display = 'block'
}

function navig1(){

    console.log('fire')


    nbbr = document.querySelector('ul')
    hey.style.display = 'block'
    nbbr.style.display = "none" 

    hey = document.getElementById('ham1')

    hi = document.getElementById('cross')
    hi.style.display = 'none'

}

// Function to toggle the visibility of the profile menu
function toggleProfileMenu() {
    const profileMenu = document.getElementById('profile-menu');
    if (profileMenu.style.display === 'block') {
        profileMenu.style.display = 'none'; // Hide the menu
    } else {
        profileMenu.style.display = 'block'; // Show the menu
    }
}

// script.js

function handleLogout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    window.location.href = 'login.html'; // Redirect to login page
}
