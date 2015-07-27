var tourny = (function(){
  var json = {};

  function findStages(num){
    return Math.ceil(Math.sqrt(num));
  }

  function createBracket(num){
    var json = [];
    if (!num || num <=1) return false;

    for (var i = 0, len = num; i < len; i++) {
      json.push(createParent(i+1));
    };
    json = groupBrackets(json);
    chart.drawBrackets( createParent("Champion", json));
  }

  function groupBrackets(arr){
    var groups = Math.ceil(arr.length/2),
        newjson = [], first, second;
    for (var i = 0, len = groups; i < len; i++) {
      first = arr[(i*2)];
      second = arr[ 1+ (i*2)]?arr[ 1+ (i*2)]:createParent("bye");
      newjson.push(createParent(i+1, [first, second]));
    }
    if(newjson.length > 2) newjson = groupBrackets(newjson);
    return newjson;
  }

  function createParent(val, children){
    return {
      name: val,
      children: children || []
    };
  }

  return{
    createBracket: createBracket,
    findStages: findStages
  };
}());
