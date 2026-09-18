const API_BASE = "http://127.0.0.1:5000";
const eventList = document.getElementById("event-list");
const form = document.querySelector("form");
const titleInput = document.getElementById("title");

function renderEvents(events) {
  eventList.innerHTML = "";
  events.forEach((event) => {
    const li = document.createElement("li");
    li.textContent = event.title;
    eventList.appendChild(li);
  });
}

async function loadEvents() {
  const response = await fetch(`${API_BASE}/events`);
  const events = await response.json();
  renderEvents(events);
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const title = titleInput.value.trim();
  if (!title) {
    return;
  }

  const response = await fetch(`${API_BASE}/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });

  if (response.ok) {
    titleInput.value = "";
    await loadEvents();
  }
});

loadEvents();
