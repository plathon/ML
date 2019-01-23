import Neo4j from 'seraph'
export default Neo4j({
  server: process.env.NOE4J_SERVER,
  user: process.env.NOE4J_USER,
  pass: process.env.NOE4J_PASSWORD
})
