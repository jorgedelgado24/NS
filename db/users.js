// *****************************************************************************
// Users.js - This file holds our example users data.
// !!!MUST CREATE A MORE SECURE SOLUTION SOON!!!
// ******************************************************************************

//Example user data
var records = [
    { id: 1, username: 'iron@yahoo.com', password: 'people', displayName: 'Jack', emails: [ { value: 'iron@example.com' } ] }
  , { id: 2, username: 'people@yahoo.com', password: 'iron', displayName: 'Jill', emails: [ { value: 'people@example.com' } ] }
];

//To allow this data to be exported
exports.findById = function(id, done) {
  process.nextTick(function() {
    var idx = id - 1;
    if (records[idx]) {
      done(null, records[idx]);
    } else {
      done(new Error('User ' + id + ' does not exist'));
    }
  });
}

//To allow this data to be exported
exports.findByUsername = function(username, done) {
  process.nextTick(function() {
    for (var i = 0, len = records.length; i < len; i++) {
      var record = records[i];
      if (record.username === username) {
        console.log(username);
        return done(null, record);
      }
    }
    return done(null, null);
  });
}