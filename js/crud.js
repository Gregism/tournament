var crud = (function(){
  var existingBrackets = [];

  function bracketListItem(item){
    return{
      timestamp: item.timestamp,
      name: item.name
    }
  }

  function saveBracket(json, id){
    var data = {};
    data.timestamp = Date.now();
    data.name = $('#bracket-name').val();
    data.bracket = json;
    tournamentData.child('brackets').push(data);
  }

  function loadBracket(id){
    //Load Bracket by ID
  }

  function updateBracket(id){

  }

  function loadBracketList(){
    existingBrackets.length = 0;
    tournamentData.on("value", function(snapshot) {
      var brackets = snapshot.val();
      $.each(brackets, function(i, item){
        console.log(item);
        existingBrackets.push(bracketListItem(item));
      });
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
  }

  function deleteBracket(id){
    //Delete bracket by ID
  }

  return{
    saveBracket: saveBracket,
    loadBracketList: loadBracketList,
    existingBrackets: existingBrackets
  }
}());