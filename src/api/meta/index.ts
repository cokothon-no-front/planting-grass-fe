const config = {
  baseURL: 'https://dongholab.com',
  timeout: 2500,
  headers: { 'Content-Type': 'application/json' }
}

const devConfig = {
  baseURL: 'https://dev.dongholab.com',
  timeout: 2500,
  headers: { 'Content-Type': 'application/json' }
}

const localConfig = {
  baseURL: 'http://localhost:5000',
  timeout: 2500,
  headers: { 'Content-Type': 'application/json' }
}

export default localConfig