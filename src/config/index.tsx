const apiUrl =
  process.env.REACT_APP_NODE_ENV === 'development'
    ? process.env.REACT_APP_API_LOCAL
    : process.env.REACT_APP_API_PRODUCTION;

export { apiUrl };
