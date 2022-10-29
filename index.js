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
    points = response.data;
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
  console.log(stations);
  const container = document.getElementById("stations");
  container.innerHTML = stations
    .map(
      (station) =>
        `<circle cx="${station.x}" cy="${station.y}" r="3" style="cursor:pointer; stroke: black; stroke-width: 1; fill: white;"></circle>`
    )
    .join("");
};

window.addEventListener("load", () => {
  fetchStations();
  addPoints();
});
