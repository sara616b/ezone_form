import { headers } from "./settings.js";

//TODO - insert right database link
const link = "";
export function post(data) {
  console.log("Posts data to backend");
  const postData = JSON.stringify(data);
  fetch(link, {
    method: "post",
    headers: headers,
    body: postData,
  }).then((res) => res.json());
}
