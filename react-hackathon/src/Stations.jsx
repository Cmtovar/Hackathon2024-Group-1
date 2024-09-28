import { useState } from "react";
import { Select, Option, Button, Alert } from "@material-tailwind/react";
import { useParams } from "react-router-dom";

function Stations() {
  const { line } = useParams();

  const [showAlert, setShowAlert] = useState(false);

  const lineNames = {
    "blue-line": "Blue Line",
    "green-line": "Green Line",
    "red-line": "Red Line",
    "orange-line": "Orange Line",
    "pink-line": "Pink Line",
    "purple-line": "Purple Line",
  };

  const blueLineStops = [
    "O'Hare",
    "Rosemont",
    "Cumberland",
    "Harlem (O'Hare)",
    "Jefferson Park",
    "Montrose",
    "Irving Park",
    "Addison",
    "Belmont",
    "Logan Square",
    "California",
    "Western",
    "Damen",
    "Division",
    "Chicago",
    "Grand",
    "Clark/Lake",
    "Washington",
    "Monroe",
    "Jackson",
    "LaSalle",
    "Clinton",
    "UIC-Halsted",
    "Racine",
    "Illinois Medical District",
    "Western (Forest Park)",
    "Kedzie-Homan",
    "Pulaski",
    "Cicero",
    "Austin",
    "Oak Park",
    "Harlem (Forest Park)",
    "Forest Park",
  ];

  const greenLineStops = [
    "Harlem/Lake",
    "Oak Park",
    "Ridgeland",
    "Austin",
    "Central",
    "Laramie",
    "Cicero",
    "Pulaski",
    "Conservatory-Central Park Drive",
    "Kedzie",
    "California",
    "Ashland",
    "Morgan",
    "Clinton",
    "Clark/Lake",
    "State/Lake",
    "Washington/Wabash",
    "Adams/Wabash",
    "Roosevelt",
    "Cermak-McCormick Place",
    "35th-Bronzeville-IIT",
    "Indiana",
    "43rd",
    "47th",
    "51st",
    "Garfield",
    "King Drive",
    "Cottage Grove",
    "Halsted",
    "Ashland/63rd",
  ];

  const redLineStops = [
    "Howard",
    "Jarvis",
    "Morse",
    "Loyola",
    "Granville",
    "Thorndale",
    "Bryn Mawr",
    "Berwyn",
    "Argyle",
    "Lawrence",
    "Wilson",
    "Sheridan",
    "Addison",
    "Belmont",
    "Fullerton",
    "North/Clybourn",
    "Clark/Division",
    "Chicago",
    "Grand",
    "Lake",
    "Monroe",
    "Jackson",
    "Harrison",
    "Roosevelt",
    "Cermak-Chinatown",
    "Sox-35th",
    "47th",
    "Garfield",
    "63rd",
    "69th",
    "79th",
    "87th",
    "95th/Dan Ryan",
  ];

  const orangeLineStops = [
    "Midway",
    "Pulaski",
    "Kedzie",
    "Western",
    "35th/Archer",
    "Ashland",
    "Halsted",
    "Roosevelt",
    "Harold Washington Library-State/Van Buren",
    "LaSalle/Van Buren",
    "Quincy",
    "Washington/Wells",
    "Clark/Lake",
  ];

  const pinkLineStops = [
    "54th/Cermak",
    "Cicero",
    "Kostner",
    "Pulaski",
    "Central Park",
    "Kedzie",
    "California",
    "Western",
    "Damen",
    "18th",
    "Polk",
    "Ashland",
    "Morgan",
    "Clinton",
    "Clark/Lake",
  ];

  const purpleLineStops = [
    "Linden",
    "Central",
    "Noyes",
    "Foster",
    "Davis",
    "Dempster",
    "Main",
    "South Blvd",
    "Howard",
    "Wilson",
    "Sheridan",
    "Belmont",
    "Fullerton",
    "Merchandise Mart",
    "Clark/Lake",
  ];

  // Determine the stops based on the selected line
  let stops = [];
  if (line === "blue-line") stops = blueLineStops;
  if (line === "green-line") stops = greenLineStops;
  if (line === "red-line") stops = redLineStops;
  if (line === "orange-line") stops = orangeLineStops;
  if (line === "pink-line") stops = pinkLineStops;
  if (line === "purple-line") stops = purpleLineStops;

  const handleSubmit = () => {
    // Show the alert when the submit button is clicked
    setShowAlert(true);

    // Hide the alert after 3 seconds
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  return (
    <div className="mx-auto mt-20 w-full max-w-3xl p-4">
      <h1 className="text-center text-4xl mb-10">
        {lineNames[line] || "Unknown Line"}
      </h1>

      {/* Show alert on submit */}
      {showAlert && (
        <Alert color="green" className="mb-6">
          Form submitted successfully!
        </Alert>
      )}

      <div className="flex justify-center gap-10 mb-6">
        <div className="w-1/3">
          <h3 className="text-lg mb-2">Departure Station</h3>
          <Select className="w-full">
            {stops.map((stop, index) => (
              <Option key={index} value={stop}>
                {stop}
              </Option>
            ))}
          </Select>
        </div>

        <div className="w-1/3">
          <h3 className="text-lg mb-2">Arrival Station</h3>
          <Select className="w-full">
            {stops.map((stop, index) => (
              <Option key={index} value={stop}>
                {stop}
              </Option>
            ))}
          </Select>
        </div>
      </div>

      <div className="w-full flex justify-center mt-10">
        <Button className="w-1/2" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
}

export default Stations;
