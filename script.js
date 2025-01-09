document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      const navbarHeight = document.querySelector(".navbar").offsetHeight;
      const targetPosition =
        target.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = targetPosition - navbarHeight - 20; // 20px extra padding

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Make the "Let's Connect" button scroll to contact section
document.querySelector(".nav-cta").addEventListener("click", function () {
  const contactSection = document.querySelector("#contact");
  const navbarHeight = document.querySelector(".navbar").offsetHeight;
  const targetPosition =
    contactSection.getBoundingClientRect().top + window.pageYOffset;
  const offsetPosition = targetPosition - navbarHeight - 20;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });
});





const form = document.querySelector('.contact-form');
const submitBtn = form.querySelector('.submit-btn');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Change button state
  submitBtn.disabled = true;
  submitBtn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';

  try {
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: json
    });
    
    const result = await response.json();

    if (response.status === 200) {
      // Success
      form.reset();
      submitBtn.innerHTML = 'Sent! <i class="fa-solid fa-check"></i>';
      
      // Optional: Show success message to user
      const successMsg = document.createElement('div');
      successMsg.className = 'success-message';
      successMsg.innerHTML = 'Thanks! I'll get back to you within 24 hours.';
      form.appendChild(successMsg);
      
      setTimeout(() => {
        submitBtn.innerHTML = 'Get Your Quote <i class="fa-solid fa-arrow-right"></i>';
        submitBtn.disabled = false;
        successMsg.remove();
      }, 3000);
    } else {
      throw new Error(result.message || 'Something went wrong!');
    }
  } catch (error) {
    submitBtn.innerHTML = 'Error! Try Again <i class="fa-solid fa-xmark"></i>';
    submitBtn.disabled = false;
    
    // Optional: Show error message to user
    const errorMsg = document.createElement('div');
    errorMsg.className = 'error-message';
    errorMsg.innerHTML = 'Oops! Something went wrong. Please try again.';
    form.appendChild(errorMsg);
    
    setTimeout(() => {
      errorMsg.remove();
    }, 3000);
  }
});