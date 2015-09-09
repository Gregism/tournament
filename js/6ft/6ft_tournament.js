var tourny = (function(){
  var pools = [];
  $(document).on('ready', function(){
    $('.btn-game').on('click', win).addClass('disabled');
    loadPlayers();
    $('#loader').on('click', loadPools);
    loadPools(false)
  });

  function loadPools(fresh){
    var file = '/tournament/data/pools_filled.json';
    if(!fresh){
      file = '/tournament/data/pools.json';
    }

    $.getJSON(file)
      .done(function(data){
        showPools(data);
      });
  }

  function showPools(data){
    pools.length = 0;

    pools = [].concat(data.pools);
    
    pools.forEach(function(pool, index){
      var $poolDiv = $('[data-pool='+ index+']'),
          winClass;
      for(obj in pool){
        if(pool[obj]){
          $poolDiv.find('.'+obj).text(pool[obj]);
          if($poolDiv.find('.'+obj).hasClass('finalist')){
            $poolDiv.find('.'+obj).addClass('btn-success').removeClass('disabled');
          };
        }
      }
    });
    showWinners(data);
  }

  function showWinners(){
    pools.forEach(function(pool, index){
      var $poolDiv = $('[data-pool='+ index+']'),
          winClass;
      for(obj in pool){
        if(pool[obj]){
          if(obj.split('-')[1]==='winner')showWinner(index, obj.split('-')[0], pool[obj]);
        }
      }
    });
  }

  function showWinner(pool, round, winner){
    //var winClass = obj.split('-')[1]==='winner'?'btn-success':'btn-danger';
    var $poolDiv = $('[data-pool='+ pool+']');

    $poolDiv.find('.'+round).each(function(index, player){
      var $player = $(player);
      $player.removeClass('disabled')
      if(winner === $player.text()){
        $player.addClass('btn-success');
      }else{
        $player.addClass('btn-danger');
      }
    })
  }

  function savePool(pool){
    //Replace Pool with new Pool data
  }

  function loadPlayers(){
    $.getJSON('/tournament/data/players.json')
      .done(function(data){
        showPlayers(data);
      });
  }

  function showPlayers(data){
    data.players.forEach(function(player, index){
      $('[data-pos-'+ (index+1) + ']').text(player).removeClass('disabled');
      $('.player-list').append('<li>'+player+'</li>');
    })
  }

  function updatePool(pool, result, match, player){
    console.log(pools[pool]);
    pools[pool][match + '-' + result] = player;
  }

  function win(e){
    var $btn = $(e.target);
    var $pool = $btn.closest('.pool');
    var round = $btn.attr('id').substr(0, 1).toLowerCase();
    var winner;

    $pool.find('.' + round).addClass('btn-danger').each(function(index, player){
      var loser;
      if($btn.attr('id') === player.id) {
        winner = $(player).text();

        updatePool($pool.data('pool'), 'winner', round, winner);
        $pool.find('.' + round + '-winner').text(winner).removeClass('disabled');
      }else{
        loser = $(player).text();
        updatePool($pool.data('pool'), 'loser', round, loser);
        $pool.find('.' + round + '-loser').text(loser).removeClass('disabled');
      }
    });
    if(round === 'f' || ($pool.data('pool') === 'final' && round === 'c')){
      $pool.find('.' + round + '-winner').addClass('btn-success');
      $('.pool-'+ ($pool.data('pool')+1)+ '-winner').text(winner).removeClass('disabled');
      $pool.addClass('completed');
      
      //$pool.find('h2').append(' Complete')
    }

    $btn.removeClass('btn-danger').addClass('btn-success');
  }

  return{
    
  };
}());
