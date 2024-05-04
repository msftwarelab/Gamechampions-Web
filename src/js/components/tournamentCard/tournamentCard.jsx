import React from "react";

const TournamentCard = ({ image, prize, summary, link }) => {
  return (
    <div className="tournament-card">
      <img
        className="tournament-card_image"
        src={image.imageUrl}
        title={image.title}
        alt={image.alternateText}
      />
      <div className="tournament-card_info-wrapper">
        <h3 className="tournament-card_prize">{prize}</h3>
        <div
          className="tournament-card_text"
          dangerouslySetInnerHTML={{ __html: summary }}
        ></div>
        <a
          className="tournament-card_button"
          href={link.url}
          target={link.isNewWindow ? "_blank" : "_self"}
        >
          {link.title}
        </a>
      </div>
    </div>
  );
};

export default TournamentCard;
