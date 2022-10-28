const BASE_URL = "http://127.0.0.1:5000";

const fetchStations = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/graphe`);
    const stations = response.data.sommets;
    console.log(stations);
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
    console.log(points);
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
  const svgNS = "http://www.w3.org/svg";
  const container = document.getElementById("stations");
  for (let i = 0; i < stations.length; i++) {
    const point = document.createElementNS(svgNS, "circle");
    point.setAttributeNS(null, "cx", stations[i].x);
    point.setAttributeNS(null, "су", stations[i].y);
    point.setAttributeNS(null, "r", 3);
    point.setAttributeNS(null, "style", "cursor:pointer;");
    point.setAttributeNS(null, "stroke", "black");
    point.setAttributeNS(null, "stroke-width", 1);
    point.setAttributeNS(null, "fill", "white");

    container.appendChild(point);
  }
};

window.addEventListener("load", () => {
  fetchStations();
  addPoints();
});
