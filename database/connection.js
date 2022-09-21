const mysql = require('mysql')


const DB = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'blog'
})
//connect to database
DB.connect((err) => {
  if (!err) {
    DB.query("SELECT 1 from blogs",(err,result)=>{
      if(err)
      {
        DB.query(`CREATE TABLE blogs(
          id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
          title VARCHAR(60) NOT NULL,
          img_url TEXT NOT NULL,
          description VARCHAR(100) NOT NULL,
          created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`)
      }
      else
      {
        console.log("Table already exits");
      }
    })
  }
  console.log("Connection done");
});

module.exports = DB;



