export function post(data) {
  console.log("Posts data to backend");
  const postData = JSON.stringify(data);
  fetch("https://frontenddatabases-cb0a.restdb.io/rest/videogames", {
    method: "post",
    headers: headers,
    body: postData,
  }).then((res) => res.json());
}
