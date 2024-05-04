import React from "react";
import Carousel from "../carousel/carousel";
import TournamentCard from "../tournamentCard/tournamentCard";

const TournamentCardSlider = ({ title, summary, tournaments = [] }) => {
  return (
    <section className="tournament-card-slides">
      <div className="tournament-card-slides__info">
        <h2>{title}</h2>
        <div dangerouslySetInnerHTML={{ __html: summary }}></div>
      </div>
      <Carousel>
        {tournaments.length &&
          tournaments.map(({ image, prize, summary, link }, tournamentIdx) => (
            <TournamentCard
              key={tournamentIdx + prize}
              image={image}
              prize={prize}
              summary={summary}
              link={link}
            />
          ))}
      </Carousel>
    </section>
  );
};

export default TournamentCardSlider;
