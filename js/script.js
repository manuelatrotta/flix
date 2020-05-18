//personal api_key:535029b12126fd0395272f6e0b4b8764
//url =https://api.themoviedb.org/3/search/movie

//su postaman con le due keys richieste api e query esempio di risultato
//{
//    "page": 1,
//    "total_results": 6,
//    "total_pages": 1,
//    "results": [
//      {"title": "Inception",
//        "vote_average":8.7,
//      "overview": "Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life as payment for a task considered to be impossible: \"inception\", the implantation of another person's idea into a target's subconscious.",
//       "release_date": "2010-07-15"
//        },

$(document).ready( function() {
  $('button').click(function () {
  var search = $('#query').val(); // ricerca effettuata dall'utente nell'input
  query();

//chiamata con paramentri da passare
  });

  $('#input').keypress(function (event) {
    //enter corrisponde al numero 13
    if(event.which == 13) {
      var search = $('#query').val();
      query();
      console.log(query);
    }
  })
});

  ////////////////FUNCTIONS


//funzione che svuota il valore nella query e nei template
function resetSearch() {
  $('.films').html('');
  $('.telefilms').html('');
  $('#query').val(" ");
}

//funzione per messaggio di non risultati
function sendMessageNoResult() {
  var source = $("#noresult-template").html();
  var template = Handlebars.compile(source);
  var html = template();
  $('.films').append(html);
}

//funzione ricerca telefilms e films che richiama le due chiamate distintamente
function query() {
  var search = $('#query').val();
  resetSearch();

  var api_key = '535029b12126fd0395272f6e0b4b8764';

  var url_movies = 'https://api.themoviedb.org/3/search/movie';
  var url_telefilms = 'https://api.themoviedb.org/3/search/tv';

  var typeFilms = 'films';
  var typeTelefilms = 'telefilms';

  getData(search, api_key, url_movies, typeFilms, '.films');
  getData(search, api_key, url_telefilms, typeTelefilms, '.telefilms');
}

//funzione chiamata generica richiamata nella funzione query in cui sono esplicitate le variabili
function getData(string, api_key, url, type, container) {

  $.ajax({
    url: url,
    method:'GET',
    data:{
      api_key: api_key,
      query: string,
      language: 'it-IT'
    },
    success: function(data) {
//se  si ha riscontro con la ricerca quindi il total result è > 0 si stampano i risultati richiamando la funzione printResults
        if (data.total_results > 0) {
          var results = data.results;
          printResults(type, results);
//se non si ha riscontro con la ricerca quindi il total result è uguale a 0 si manda un messaggio all'utente
        }else{
          sendMessageNoResult($(container));
      }
    },
    error:function(request, state, errors) {
      console.log(errors);
    }
  });
}


//funzione che stampa il risultato dei films
//funzione che stampa i risultati ottenuti sia dei film che dei telefilm
function printResults (type, results) {
  var source = $("#entry-template").html();
  var template = Handlebars.compile(source);
  var title;
//con un ciclo for vediamo tutte le caratteristiche dei risultati dei films e dei telefilms (i)
  for (var i = 0; i < results.length; i++) {
    var thisResult = results[i];
    console.log(thisResult);
    if(type == 'films') {
      title = thisResult.title;
      var container = $('.films');
    } else if (type == 'telefilms'){
      title = thisResult.name;
        var container = $('.telefilms');
    }


    var context = {
      type: type,
      title: title,
      vote_average: thisResult.vote_average,
      specialChars: printStars(thisResult.vote_average),
      //richiamo la funzione stampa poster
      poster_path:posterPrint(thisResult.poster_path)

    };
    var html = template(context);
    container.append(html);
  }
}

// funzione stampa poster in cui se il risultato del poster_path == null stampa immagine di default
function posterPrint(poster) {
  var url = 'https://image.tmdb.org/t/p/w185';
  if (poster != null) {
    url += poster;
  }else {
    url = 'img/default.jpg';
  }
  return url;
}
//funzione che correla il voto in scala da 1 a 5 con le stelle.
function printStars(vote) {
  //voto arrotondato con .round e diviso 2 per scala ridotta
  //con un comando interativo determinato ciclo su i contatore se i <= del voto allora la stella sarà vuota altrimenti piena
  var vote = Math.round(vote / 2);
  var stars = '';
  for(var i=1; i<=5; i++) {
    if(i <=vote) {
      var singleStar = '<i class="fas fa-star"></i>';
    }else {
      var singleStar = '<i class="far fa-star"></i>';
    }
    stars = stars + singleStar;
  }
  return stars;
}
