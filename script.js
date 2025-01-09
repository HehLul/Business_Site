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
