var elasticsearch = require('elasticsearch')
var client = new elasticsearch.Client({ host: process.env.ELASTIC_SEARCH_HOST })
export default client
