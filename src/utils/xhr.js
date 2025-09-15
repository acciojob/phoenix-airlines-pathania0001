const get = (url, options) => {
    return fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => {
      switch (response.status) {
        case 200:
          return response.json();
        default:
          throw new Error(
            JSON.stringify({
              statusCode: response.status,
              errorMessage: "Unable to fetch data"
            })
          );
      }
    });
  };
  
  export { get };
  