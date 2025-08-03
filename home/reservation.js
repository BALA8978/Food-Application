const bookedTables = [
  "2025-08-01_19:00_15",
  "2025-08-01_20:00_62"
];

function isTableBooked(date, time, table) {
  return bookedTables.includes(`${date}_${time}_${table}`);
}

function handleTableChange() {
  const date = document.getElementById("date").value;
  const time = document.getElementById("start-time").value;
  const table = document.getElementById("table").value;
  if (date && time && table && isTableBooked(date, time, table)) {
    alert(`Table ${table} is already booked at ${time} on ${date}. Please choose another.`);
    document.getElementById("table").value = "";
  }
}

function handleReservationSubmit(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const date = document.getElementById("date").value;
  const time = document.getElementById("start-time").value;
  const table = document.getElementById("table").value;

  if (isTableBooked(date, time, table)) {
    alert(`Sorry! Table ${table} is already booked at ${time} on ${date}.`);
    return;
  }

  const popup = document.getElementById("popup");
  const popupMessage = document.getElementById("popup-message");
  popupMessage.textContent = `Please confirm your booking for Table ${table} on ${date} at ${time}.`;
  popup.classList.remove("hidden");
}

function confirmBooking() {
  document.getElementById("popup").classList.add("hidden");
  document.getElementById("confirmation").classList.remove("hidden");

  setTimeout(() => {
    document.getElementById("confirmation").classList.add("hidden");
    document.querySelector("form").reset();
  }, 2500);
}
