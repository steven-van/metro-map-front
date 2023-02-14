const BASE_URL = "http://127.0.0.1:5000";

const fetchStations = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/graphe`);
    const stations = response.data.sommets;
    let startSelect = document.getElementById("start");
    let endSelect = document.getElementById("end");

    for (let i = 0; i < stations.length; i++) {
      let option = document.createElement("option");
      option.text = `${stations[i].nom} (Ligne ${stations[i].numLigne})`;
      option.value = stations[i].num;
      startSelect.appendChild(option);
    }
    for (let i = 0; i < stations.length; i++) {
      let option = document.createElement("option");
      option.text = `${stations[i].nom} (Ligne ${stations[i].numLigne})`;
      option.value = stations[i].num;
      endSelect.appendChild(option);
    }
  } catch (errors) {
    console.log(errors);
  }
};

const fetchPoints = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/points`);
    const points = response.data;
    return points;
  } catch (errors) {
    console.log(errors);
  }
};

const clearSelection = () => {
  let startStation = document.getElementById("start");
  let endStation = document.getElementById("end");

  startStation.selectedIndex = 0;
  endStation.selectedIndex = 0;
};

const addPoints = async () => {
  let stations = await fetchPoints();
  const container = document.getElementById("stations");
  container.innerHTML = stations
    .map(
      (station) =>
        `<circle cx="${station.x}" cy="${station.y}" r="3" style="cursor:pointer; stroke: black; stroke-width: 1; fill: white;"></circle>`
    )
    .join("");
};

const fetchAcpm = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/acpm`);
    const acpm = response.data;
    return acpm;
  } catch (errors) {
    console.log(errors);
  }
};

const toggleAcpm = () => {
  const metroMap = document.getElementById("metro-map");
  const svgPoints = document.getElementById("points");
  if (metroMap.src.includes("imgs/metrof_r.png")) {
    metroMap.src = "imgs/acpm.png";
    svgPoints.style.visibility = "hidden";
  } else {
    metroMap.src = "imgs/metrof_r.png";
    svgPoints.style.visibility = "visible";
  }
};

const getItinerary = async () => {
  try {
    const startSelect = document.getElementById("start");
    const startSelectedValue =
      startSelect.options[startSelect.selectedIndex].value;
    const endSelect = document.getElementById("start");
    const endSelectedValue = endSelect.options[endSelect.selectedIndex].value;

    const response = await axios.get(
      `${BASE_URL}/itinerary/${startSelectedValue}/${endSelectedValue}`
    );

    const itinerary = response.data;
    console.log(itinerary);

    const lines = new Set();
    for (let i = 0; i < itinerary.sommets.length; i++) {
      lines.add(itinerary.sommets[i].numLigne);
    }

    const globalInfos = document.getElementById("global-infos");
    globalInfos.innerHTML =
      `<p class="text-gray-500">Estimated time</p>` +
      `<div class="flex justify-between">
    <p class="text-gray-300 font-bold">${itinerary.temps}</p>
    <p class="text-gray-300 font-bold">${lines.length} line changes</p>
    <p class="text-gray-300 font-bold">${itinerary.sommets.length}</p>
  </div>`;
  } catch (errors) {
    console.log(errors);
  }
};

window.addEventListener("load", () => {
  fetchStations();
  addPoints();
  document.getElementById("go").addEventListener("click", getItinerary);
  document.getElementById("clear").addEventListener("click", clearSelection);
  document.getElementById("acpm").addEventListener("click", toggleAcpm);
});
