const GENERIC_ERROR_MESSAGE =
  "We could not process your request at the moment. Our dedicated team of engineers are looking into this issue. For further information contact the administrator on <a href='mailto:info@game-champions.com'>info@game-champions.com</a>";

export const transformApiMessages = (apiErrorResponse, customMessagesShema) => {
  if (apiErrorResponse && apiErrorResponse.status) {
    return (
      customMessagesShema[apiErrorResponse.status] ||
      `${GENERIC_ERROR_MESSAGE}<br />Details: API Error ${
        apiErrorResponse.status
      } ${apiErrorResponse.statusText || ""}`
    );
  }

  return GENERIC_ERROR_MESSAGE;
};
