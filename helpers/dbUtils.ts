import oracledb from 'oracledb'

const oracleDbConfig = {
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    connectString: process.env.DB_HOST
}

async function runQuery(query: string) {
    let connection;

    try {

      // Establish connection to Oracle Database
      connection = await oracledb.getConnection(oracleDbConfig)
      
      // This is where we execute the query and return its result
      const result = await connection.execute(query)
      return result.rows
    } catch(err) {
      throw new Error(err)
    } finally {
      if(connection) {
        // After we want to ensure the connection is closed after execution
        await connection.close()
      }
    }
  }

  export default runQuery