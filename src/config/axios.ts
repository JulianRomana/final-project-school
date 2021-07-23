import axios from 'axios'

export default axios.create({
  baseURL: 'https://web3-groupe-7-fireforce.herokuapp.com/api',
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
})
