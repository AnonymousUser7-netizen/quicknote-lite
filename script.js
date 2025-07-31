const noteText = document.getElementById("noteText");
const addNoteBtn = document.getElementById("addNote");
const notesContainer = document.getElementById("notesContainer");
const toggleTheme = document.getElementById("toggleTheme");

let notes = JSON.parse(localStorage.getItem("quick_notes")) || [];

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

// Load existing notes
notes.forEach(note => createNote(note));

// Add note
addNoteBtn.addEventListener("click", () => {
  const text = noteText.value.trim();
  if (text === "") return;
  notes.push(text);
  localStorage.setItem("quick_notes", JSON.stringify(notes));
  createNote(text);
  noteText.value = "";
});

// Create and display a note
function createNote(text) {
  const note = document.createElement("div");
  note.className = "note";

  const p = document.createElement("p");
  p.textContent = text;

  const del = document.createElement("button");
  del.textContent = "✕";
  del.className = "delete";
  del.onclick = () => {
    notes = notes.filter(n => n !== text);
    localStorage.setItem("quick_notes", JSON.stringify(notes));
    notesContainer.removeChild(note);
  };

  note.appendChild(p);
  note.appendChild(del);
  notesContainer.appendChild(note);
}

// Toggle Theme
toggleTheme.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
});
