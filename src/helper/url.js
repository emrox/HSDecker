export const buildUrl = (basePath, queryObject = {}) => {
  const queryString = Object.keys(queryObject).reduce((params, paramKey) => {
    if (queryObject[paramKey] === undefined || queryObject[paramKey] === null) {
      return params;
    }

    const paramValue = encodeURIComponent(queryObject[paramKey]);
    params.push(`${paramKey}=${paramValue}`);

    return params;
  }, []).join('&');

  if (!queryString || queryString.length <= 2) {
    return basePath;
  }

  return `${basePath}?${queryString}`;
};
