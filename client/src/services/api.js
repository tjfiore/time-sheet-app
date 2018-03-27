const url = 'http://localhost:3090';

const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'kcvhbf84up7juxbde'
}

export function postRequest(path, payload) {
  return fetch(`${url}${path}`, {
    method: 'POST',
    headers,
    mode: 'no-cors',
    body: JSON.stringify(payload),
  });
}

export function getRequest(path) {
  return fetch(`${url}${path}`, {
    method: 'GET',
    headers,
    mode: 'no-cors',
  });
}