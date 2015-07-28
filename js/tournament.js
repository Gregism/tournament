var tourny = (function(){
  var json = {};
  var competitors = [];

  $(document).on('ready', function(){
    $('#add-comp').on('click', addCompetitor);
    $('#create-bracket').on('click', createBracket);
    $(document).on('click', 'text', advanceCompetitor);
  });

  function advanceCompetitor(e){
    console.log($(e.target).text());
  }

  function addCompetitor(e){
    var html = "",
        competitor = $('#new-competitor').val();
    html = '<li>' + competitor + '</li>';

    competitors.push(competitor);
    $('#new-competitor').val('');
    $('#competitor-list').append(html);
    if(competitors.length > 2){
      $('#create-bracket').removeClass('disabled');
    }
  }


  function findStages(num){
    return Math.ceil(Math.sqrt(num));
  }

  function createBracket(){
    var json = [],
    num = competitors.length;

    if (!num || num <=1) return false;

    for (var i = 0, len = num; i < len; i++) {
      json.push(createParent(competitors[i]));
    }

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
