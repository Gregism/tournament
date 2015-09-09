var allPhases = [];

var phases = (function(){
  function addDate(date){
    var _date = new Date(date).toDateString(); 
    var index = getIndexByKey(allPhases, "date", _date);
    if (index !== -1) return false;
    
    allPhases.push({"date": _date, "phases": []});
  }

  function addPhase(date, json){
    var dataIndex;
    var clone = $.extend({},json);
    var _date = new Date(date).toDateString();

    //Add Date if it doesn't exist
    addDate(date);
    dateIndex = getIndexByKey(allPhases, "date", _date);
    
    //Add phase data to date's array
    allPhases[dateIndex].phases.push(clone);
    return allPhases
  }

  return {
    addDate: addDate,
    addPhase: addPhase
  }
}());

function getIndexByKey(objs, key, value) {
  var index = -1;
  objs.forEach(function(obj, i){
    if(obj[key] === value){
      index = i;
    }
  });

  return index;
}