import _fetch from "isomorphic-unfetch";

// class FetchError extends Error {
//   constructor(statusText, response, ...params) {
//     super(params);

//     if (Error.captureStackTrace) {
//       Error.captureStackTrace(this, FetchError);
//     }

//     this.name = "FetchError";
//     // Custom debugging information
//     this.statusText = statusText;
//     this.date = new Date();
//   }
// }

const fetch = (url, options = {}) =>
  _fetch(url, {
    credentials: "include",
    ...options,
  })
    .then(checkStatus)
    .then((r) => r.json()); // When response if ok we will have a json format

export function checkStatus(response) {
  console.log("the response");
  console.log(response);
  if (response.ok) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  return Promise.reject(error);
}

export default fetch;
