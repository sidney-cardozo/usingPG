
if(process.argv.length === 3){
  const lookupName = process.argv[2];
  const pg = require("pg");
  const settings = require("./settings"); // settings.json

  const client = new pg.Client({
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.port,
    ssl      : settings.ssl
  });

  client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }

  console.log ("Searching...");
  client.query("SELECT * FROM famous_people WHERE first_name LIKE $1 OR last_name LIKE $1;", ['%'+lookupName+'%'], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    };
    console.log(`Found ${result.rowCount} Person(s) with the name ${lookupName}:`)
    result.rows.forEach(function (row,index){
      let dob = row.birthdate.toString().substring(0,15);
      console.log(`-${index+1} :${row.first_name} ${row.last_name}, born '${dob}`);
    })
    client.end();
  });
});


} else {
  console.log("Please enter 1 name!");
}

// WHERE first_name LIKE '%$1%' OR last_name LIKE '%$1%';", [lookupName], (err, result) => {