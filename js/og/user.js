var users = (function(){
  function addUser(name){
    var data = name;
    tournamentData.child('users').push(data);
  }
  function isUser(name){
    
  }
  function getUsers(){}
  function addGroup(){}
  function getGroups(){}
  return{
    addUser: addUser,
    getUsers: getUsers,
    addGroup: addGroup,
    getGroups: getGroups
  }
}());