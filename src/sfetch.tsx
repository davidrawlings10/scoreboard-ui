import config from "./config";

export function sfetchList(path: string) {
  return fetch(config.baseUrl + path)
    .then((res) => res.json())
    .then((json) => json.list);
}
