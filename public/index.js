async function fetchLoginStatus() {
    try {
      const response = await fetch('/loginStatus'); // Send a request to the server to check login status
      const data = await response.json();
      return data.loggedIn;
    } catch (error) {
      console.error('Error fetching login status:', error);
      return false;
    }
}

async function logout() {
    try {
      const response = await fetch('/logout'); // Send a request to the server to logout
      if (response.ok) {
        window.location.reload(); // Reload the page after logout
      } else {
        console.error('Logout failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }

async function updateUI() {
    const isLoggedIn = await fetchLoginStatus();
  
    const loginButton = document.getElementById('loginButton');
    const loginStatus = document.getElementById('loginStatus');
  
    if (isLoggedIn) {
      loginButton.textContent = 'Logout'; // Change button text to 'Logout'
      loginButton.onclick = logout; // Set logout function as the button click event handler
      loginStatus.textContent = 'You are logged in';
    } else {
      loginButton.textContent = 'Login'; // Change button text to 'Login'
      loginButton.onclick = () => window.location = '/login'; // Redirect to login page
      loginStatus.textContent = 'You are not logged in';
    }
}

window.onload = updateUI;