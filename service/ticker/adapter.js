export const toTickerMatchArray = data => {
  if (data && data.length) {
    return data.map(item => {
      return toTickerMatch(item);
    });
  } else {
    return [];
  }
};

const toTickerMatch = data => {
  if (data) {
    return {
      id: data.id,
      winner: data.winner,
      looser: data.looser,
      bet: data.prize,
      isTie: data.isTie,
      isTournamentMode: data.isTournamentMode,
      tournamentPrize: data.tournamentPrize
    };
  }
};
