var tourny = (function(){
  var json = {};
  var competitors = ['Greg','James','Tyler', 'Oliver', 'Jpeg'];

  $(document).on('ready', function(){
    $('#add-comp').on('click', addCompetitor);
    $('#create-bracket').removeClass('disabled').on('click', createBracket);
    $('#save-bracket').on('click', saveBracket);
    $('#bracket-name').on('change', hasName);
    $(document).on('click', 'text', advanceCompetitor);
  });

  function hasName(e){
    if($(e.target).val() && json){
      $('#save-bracket').removeClass('disabled');
    } else {
      $('#save-bracket').addClass('disabled');
    }
  }

  function saveBracket(e){
    file.saveBracket(json);
  }

  function advanceCompetitor(e){
    var name = $(e.target).text();

    if(name === 'bye') return false;
    findName($(e.target).text(), json);
    chart.drawBrackets(json);
  }

  function findName(name, list){
    $.each(list.children, function(i, child){
      if (child.name == name) {
        list.name = name;
        return true;
      } else if(child.name !== name && child.children){
        findName(name, child);
      }
    });
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
    var arr = [],
    num = competitors.length;

    if (!num || num <=1) return false;

    for (var i = 0, len = num; i < len; i++) {
      arr.push(createParent(competitors[i]));
    }

    arr = groupBrackets(arr);
    json = createParent("Champion", arr);
    chart.drawBrackets(json);
    $('#bracket-name').attr('disabled', false);
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
      "name": val,
      "children": children || []
    };
  }

  return{
    createBracket: createBracket,
    findStages: findStages
  };
}());
