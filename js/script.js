console.log ('hi')

function navig() {
    // nbbr = document.getElementsByClassName('ham')
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
// script.js

function toggleProfileMenu() {
    const profileMenu = document.getElementById('profile-menu');
    // Toggle the visibility of the profile menu
    if (profileMenu.style.display === 'none' || profileMenu.style.display === '') {
      profileMenu.style.display = 'block';
    } else {
      profileMenu.style.display = 'none';
    }
  }
  
  // Hide dropdown menu when clicking outside
  document.addEventListener('click', (event) => {
    const profileMenu = document.getElementById('profile-menu');
    const profileLogo = document.getElementById('profile-logo');
    if (
      profileMenu.style.display === 'block' &&
      !profileMenu.contains(event.target) &&
      !profileLogo.contains(event.target)
    ) {
      profileMenu.style.display = 'none';
    }
  });
  
  function handleLogout() {
    console.log('Logout clicked');
    // Optional: Add any additional logout logic here
  }
  