import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

function OffrePage() {
  
  const { id } = useParams();

  const [offer, setOffer] = useState(null);

  useEffect(() => {
    // Récupérer les détails de l'offre depuis l'API en utilisant l'ID fourni en prop
    fetch(`http://localhost:5000/api/jobs/${id}`)
      .then((response) => response.json())
      .then((data) => setOffer(data))
      .catch((error) => console.error("Erreur lors du chargement de l'offre :", error));
  }, []);

  if (!offer) {
    return <p>Offre n'a pas été trouvé</p>;
  }

  return (
    <div className="flex justify-center items-center mt-20 ">
      <div className="bg-white border border-gray-300 rounded-md p-4 shadow transition-shadow duration-200">
        <h2 className="text-lg font-semibold mb-1 text-blue-700">{offer.titre}</h2>
        <h3 className="text-md text-gray-600 mb-1">{offer.entreprise}</h3>
        <p className="text-sm text-gray-500 mb-1">{offer.location}</p>
        <p className="text-sm text-gray-600">{offer.description}</p>
        <button class="my-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Postuler
        </button>
      </div>
    </div>
  );
}

export default OffrePage;