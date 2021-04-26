import { headers } from "./settings.js";

//TODO - insert right database link
const link = "https://ezone-765c.restdb.io/rest/info";
export function post(data) {
  console.log("Posts data to backend");
  const postData = JSON.stringify(data);
  fetch(link, {
    method: "post",
    headers: headers,
    body: postData,
  }).then((res) => res.json());
}
