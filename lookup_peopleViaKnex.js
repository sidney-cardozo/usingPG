if(process.argv.length === 3){
  const lookupName = process.argv[2];
  const settings = require("./settings");
  var knex = require('knex')({
    client: 'pg',
    connection: {
      user     : settings.user,
      password : settings.password,
      database : settings.database,
      host     : settings.hostname,
      port     : settings.port,
      ssl      : settings.ssl
    }
  });
  knex.select().from('famous_people').where('first_name', 'like', '%'+lookupName+'%').orWhere('first_name', 'like', '%'+lookupName+'%').asCallback(function (err, result) {

    console.log(`Found ${result.length} Person(s) with the name ${lookupName}:`)
    result.forEach(function (row,index){
      let dob = row.birthdate.toString().substring(0,15);
      console.log(`-${index+1} :${row.first_name} ${row.last_name}, born '${dob}`);
    });
    knex.destroy();
  })




} else {
  console.log("Please enter 1 name!");
}


