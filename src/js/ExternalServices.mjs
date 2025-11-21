// src/js/ExternalServices.mjs

const baseURL = import.meta.env.VITE_SERVER_URL;

async function convertToJson(res) {
  const jsonResponse = await res.json();
  if (res.ok) {
    return jsonResponse;
  } else {
   class ServicesError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ServicesError';
  }
}

throw new ServicesError(JSON.stringify(jsonResponse));

  }
}

export default class ExternalServices {
  constructor() {}

  async getData(category) {
    const url = `${baseURL}/products/search/${category}`; // ← This prevents double slash
    const response = await fetch(url);
    const data = await convertToJson(response);
    return data.Result;
  }

  async findProductById(id) {
    const url = `${baseURL}/product/${id}`; // ← This prevents double slash
    const response = await fetch(url);
    const data = await convertToJson(response);
    return data.Result;
  }

  async checkout(payload) {
    const url = `${baseURL}/checkout`; // ← This prevents double slash
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    };
    const response = await fetch(url, options);
    return await convertToJson(response);
  }
}