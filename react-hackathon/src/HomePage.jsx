import { Link } from "react-router-dom";

// Data for the CTA lines
const ctaLines = [
  { id: 'blue-line', name: 'Blue Line', color: 'bg-blue-600', description: 'Serves O’Hare and Forest Park' },
  { id: 'green-line', name: 'Green Line', color: 'bg-green-600', description: 'Serves Ashland and 63rd/Cottage Grove' },
  { id: 'red-line', name: 'Red Line', color: 'bg-red-600', description: 'Serves Howard and 95th/Dan Ryan' },
  { id: 'orange-line', name: 'Orange Line', color: 'bg-orange-600', description: 'Serves Midway' },
  { id: 'pink-line', name: 'Pink Line', color: 'bg-pink-500', description: 'Serves 54th/Cermak and the Loop' },
  { id: 'purple-line', name: 'Purple Line', color: 'bg-purple-600', description: 'Serves Linden and Evanston' }
];

function HomePage() {
  return (
    <div className="container mx-auto my-10">
      <h1 className="text-4xl text-center mb-8">Chicago CTA Lines</h1>
      
      {/* Grid Layout for the CTA Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {ctaLines.map((line) => (
          <Link to={`/${line.id}`} key={line.id}>
            <div className={`p-6 rounded-lg shadow-lg ${line.color} text-white`}>
              <h2 className="text-2xl font-semibold mb-2">{line.name}</h2>
              <p>{line.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
