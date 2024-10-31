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
    <div>
      <h2>{offer.titre}</h2>
      <p><strong>Entreprise :</strong> {offer.entreprise}</p>
      <p><strong>Description :</strong> {offer.description}</p>
      <p><strong>Lieu :</strong> {offer.location}</p>
    </div>
  );
}

export default OffrePage;