import React, { useState, useEffect } from "react";


const Gallery = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch("https://www.course-api.com/react-tours-project");
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        setTours(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTours();
  }, []);

  const removeTour = (id) => {
    setTours(tours.filter((tour) => tour.id !== id));
  };

  const toggleReadMore = (id) => {
    setTours(
      tours.map((tour) =>
        tour.id === id ? { ...tour, showMore: !tour.showMore } : tour
      )
    );
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="gallery">
      {tours.map((tour) => (
        <div key={tour.id} className="tour-card">
          <img src={tour.image} alt={tour.name} />
          <div className="tour-info">
            <h2>{tour.name}</h2>
            <h4>${tour.price}</h4>
            <p>
              {tour.showMore ? tour.info : `${tour.info.substring(0, 200)}...`}
              <button onClick={() => toggleReadMore(tour.id)}>
                {tour.showMore ? "Show Less" : "Read More"}
              </button>
            </p>
            <button onClick={() => removeTour(tour.id)}>Not Interested</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Gallery;
