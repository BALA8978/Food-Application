function openModal(title, description) {
  document.getElementById("modalTitle").innerText = title;
  document.getElementById("modalDescription").innerText = description;
  document.getElementById("foodModal").style.display = "block";
}

function closeModal() {
  document.getElementById("foodModal").style.display = "none";
}

// Optional: Handle review submission
document.getElementById("reviewForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const review = document.getElementById("review").value;
  alert("Thank you for your feedback: " + review);
  document.getElementById("review").value = "";
  closeModal();
});
