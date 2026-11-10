
const places = {
  "grosse-halle": {
    title: "Die Grosse Halle",
    description: "Hier treffen sich die Schülerinnen und Schüler zum Essen und zu besonderen Festen. Die Decke zeigt einen verzauberten Himmel. Über den langen Tischen schweben Kerzen."
  },
  "bibliothek": {
    title: "Die Bibliothek",
    description: "Ein riesiger Raum voller Bücher, Zaubersprüche und geheimnisvoller Schriften. In der verbotenen Abteilung stehen Bücher, die nur mit Erlaubnis gelesen werden dürfen."
  },
  "eulerei": {
    title: "Die Eulerei",
    description: "Hoch oben im Schloss leben die Eulen von Hogwarts. Von hier aus bringen sie Briefe und Nachrichten in die ganze Zaubererwelt."
  },
  "kerker": {
    title: "Die Kerker",
    description: "Tief unter dem Schloss liegen dunkle Räume und Klassenzimmer. Hier befindet sich unter anderem der Unterrichtsraum für Zaubertränke."
  },
  "turm": {
    title: "Der Astronomieturm",
    description: "Von diesem hohen Turm aus beobachten die Schülerinnen und Schüler die Sterne und lernen die Geheimnisse des Nachthimmels kennen."
  },
  "krankenfluegel": {
    title: "Der Krankenflügel",
    description: "Hier werden Schülerinnen und Schüler versorgt, wenn sie sich verletzt haben oder krank sind. Madam Pomfrey kümmert sich um die Gäste."
  },
  "treppenhalle": {
    title: "Die Treppenhalle",
    description: "Die Treppen von Hogwarts bewegen sich manchmal von selbst. Wer nicht aufpasst, landet plötzlich auf einem ganz anderen Stockwerk."
  },
  "gewächshaus": {
    title: "Die Gewächshäuser",
    description: "Hier wachsen magische Pflanzen. Manche sind nützlich, andere ziemlich eigenwillig. Im Kräuterkundeunterricht gibt es viel zu entdecken."
  }
};

const intro = document.getElementById("intro");
const infoTitle = document.getElementById("place-title");
const infoDescription = document.getElementById("place-description");
const toast = document.getElementById("toast");

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2800);
}

function selectPlace(id) {
  const place = places[id];

  if (!place) return;

  document.querySelectorAll(".building").forEach(building => {
    building.classList.remove("selected");
  });

  const building = document.querySelector(
    `.building[data-place="${id}"]`
  );

  if (building) {
    building.classList.add("selected");
  }

  infoTitle.textContent = place.title;
  infoDescription.textContent = place.description;

  document.getElementById("place-info").scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
}

document.getElementById("open-map").addEventListener("click", () => {
  intro.classList.add("hidden");
  showToast("Die Karte ist geöffnet. ✦");
});

document.querySelectorAll(".building").forEach(building => {
  building.addEventListener("click", () => {
    selectPlace(building.dataset.place);
  });

  building.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      selectPlace(building.dataset.place);
    }
  });
});

document.querySelectorAll(".discover-card").forEach(card => {
  card.addEventListener("click", () => {
    selectPlace(card.dataset.place);
  });
});

document.getElementById("secret-paths").addEventListener("click", () => {
  const paths = document.getElementById("secret-path-group");
  paths.classList.toggle("visible");

  if (paths.classList.contains("visible")) {
    showToast("Geheimgänge wurden entdeckt! ✧");
  } else {
    showToast("Die Geheimgänge verschwinden wieder ...");
  }
});

let footstepsRunning = false;

document.getElementById("footsteps-button").addEventListener("click", () => {
  footstepsRunning = !footstepsRunning;

  document.querySelectorAll(".footprint").forEach(foot => {
    foot.classList.toggle("moving", footstepsRunning);
  });

  showToast(
    footstepsRunning
      ? "Jemand bewegt sich durch Hogwarts ... 👣"
      : "Die Fussspuren sind verschwunden."
  );
});

document.getElementById("search-button").addEventListener("click", searchPlace);

document.getElementById("search-place").addEventListener("keydown", event => {
  if (event.key === "Enter") searchPlace();
});

function searchPlace() {
  const query = document
    .getElementById("search-place")
    .value
    .trim()
    .toLowerCase();

  const match = Object.entries(places).find(([id, place]) => {
    return place.title.toLowerCase().includes(query) ||
      id.includes(query);
  });

  if (!query) {
    showToast("Gib zuerst einen Ort ein.");
    return;
  }

  if (match) {
    selectPlace(match[0]);
    showToast("Ort gefunden! ✦");
  } else {
    showToast("Diesen Ort finde ich auf der Karte nicht.");
  }
}

document.getElementById("secret-submit").addEventListener("click", () => {
  const word = document.getElementById("secret-word")
    .value.trim().toLowerCase();

  const answer = document.getElementById("secret-answer");

  if (word === "missetat" || word === "tunichtgut") {
    answer.textContent = "✨ Geheimnis gelüftet! Die Karte gehört nun dir.";
    showToast("Du hast das Geheimnis entdeckt!");
  } else if (word === "harry" || word === "hogwarts") {
    answer.textContent = "Fast! Aber die Karte hat noch ein anderes Passwort ...";
  } else {
    answer.textContent = "Die Karte bleibt verschlossen. Versuche es noch einmal.";
  }
});

document.getElementById("secret-word").addEventListener("keydown", event => {
  if (event.key === "Enter") {
    document.getElementById("secret-submit").click();
  }
});

// Kleines Easter Egg: fünf Klicks auf den Kartentitel
let titleClicks = 0;

document.querySelector(".map-topline").addEventListener("click", () => {
  titleClicks++;

  if (titleClicks >= 5) {
    titleClicks = 0;
    showToast("Die Karte flüstert: 'Die vier Rumtreiber grüssen dich!' ✨");
  }
});
