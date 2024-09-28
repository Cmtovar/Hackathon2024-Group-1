document.getElementById('fetchTrainDataBtn').addEventListener('click', getTrainData);

async function getTrainData() {
    const url = 'http://lapi.transitchicago.com/api/1.0/ttarrivals.aspx?key=488eae564056405bacd49daa868c89ea&mapid=40380'; // Replace with the actual API endpoint URL

    try {
        const response = await fetch(url);
        const xmlData = await response.text();

        // Parse the XML data to a DOM object
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlData, "text/xml");

        // Extracting information from the XML structure
        const etas = xmlDoc.getElementsByTagName("eta");
        let trainArrivals = [];

        // Loop through each 'eta' node and extract relevant information
        for (let i = 0; i < etas.length; i++) {
            const etaNode = etas[i];

            const trainData = {
                stationName: etaNode.getElementsByTagName("staNm")[0].textContent,
                route: etaNode.getElementsByTagName("rt")[0].textContent,
                destination: etaNode.getElementsByTagName("destNm")[0].textContent,
                arrivalTime: etaNode.getElementsByTagName("arrT")[0].textContent,
                isApproaching: etaNode.getElementsByTagName("isApp")[0].textContent === "1",
                latitude: etaNode.getElementsByTagName("lat")[0]?.textContent,
                longitude: etaNode.getElementsByTagName("lon")[0]?.textContent,
                heading: etaNode.getElementsByTagName("heading")[0]?.textContent,
            };

            trainArrivals.push(trainData);
        }

        // Display the data in the trainData div
        displayTrainData(trainArrivals);

    } catch (error) {
        console.error('Error fetching or parsing the train data:', error);
    }
}

function displayTrainData(arrivals) {
    const trainDataDiv = document.getElementById('trainData');
    trainDataDiv.innerHTML = ''; // Clear any previous data

    arrivals.forEach(arrival => {
        const trainInfo = `
            <div>
                <p>Station: ${arrival.stationName}</p>
                <p>Route: ${arrival.route}</p>
                <p>Destination: ${arrival.destination}</p>
                <p>Arrival Time: ${arrival.arrivalTime}</p>
                <p>Approaching: ${arrival.isApproaching ? 'Yes' : 'No'}</p>
                <p>Latitude: ${arrival.latitude}</p>
                <p>Longitude: ${arrival.longitude}</p>
                <p>Heading: ${arrival.heading}</p>
                <hr>
            </div>
        `;
        trainDataDiv.innerHTML += trainInfo;
    });
}
