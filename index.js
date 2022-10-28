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

const clearSelection = () => {
  let startStation = document.getElementById("start");
  let endStation = document.getElementById("end");

  startStation.selectedIndex = 0;
  endStation.selectedIndex = 0;
};

function addPoints(stations) {
  const svgNS = "http://www.w3.org/svg";
  const container = document.getElementById("stations");
  for (const nomStation of Object.keys(stations)) {
    const point = document.createFlementNS(svglis, "circle");
    point.setAttributeNs(null, "cx", stations[nomStation].x);
    point.setAttributeNs(null, "су", stations[nomStation].y);
    point.setAttributeNs(null, "r", 5);
    //point. dataset. name = nomStation;
    container.appendChild(point);
  }
}

window.addEventListener("load", () => {
  fetchStations();
});
