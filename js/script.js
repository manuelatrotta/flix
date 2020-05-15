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
//inizio a fare una richiesta generica per vedere come risponde la chiamata
  $('button').click(function () {
  var query = $('#query').val(); // ricerca effettuata dall'utente nell'input
  resetSearch();
  callTelefilm(query);
  callMovie(query); // funzione che richiama azione chiamata ajax
  console.log(query);
//chiamata con paramentri da passare
  });

  $('#input').keypress(function (event) {
    //enter corrisponde al numero 13
    if(event.which == 13) {
      var query = $('#query').val();
      resetSearch();
      callMovie(query);
      callTelefilm(query);
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
//funzione che effettua chiamata ajax

function callMovie(string) {
  $.ajax({
    url:'https://api.themoviedb.org/3/search/movie',
    method: 'GET',
    data: {
      api_key:'535029b12126fd0395272f6e0b4b8764',
      query: string,
      language: 'it-IT'
    },
    //i films sono dati da data.results e uso funzione printFilms per stamparli con handlebars template
    success: function(data) {
      var films = data.results;
      printFilms(films);
    },
    error: function (request,state,errors) {
      console.log(errors);
    }

    });

  }

  function callTelefilm(string) {
    $.ajax({
      url:'https://api.themoviedb.org/3/search/tv',
      method: 'GET',
      data: {
        api_key:'535029b12126fd0395272f6e0b4b8764',
        query: string,
        language: 'it-IT'
      },
      //i films sono dati da data.results e uso funzione printFilms per stamparli con handlebars template
      success: function(data) {
        var teleFilms = data.results;
        printTelefilms(teleFilms);
      },
      error: function (request,state,errors) {
        console.log(errors);
      }

      });

    }

//funzione che stampa il risultato dei films
  function printFilms(films) {
  var source = $('#entry-template').html();
  var template = Handlebars.compile(source);
  for (var i = 0; i < films.length; i++) {
   var thisFilm = films[i];
   console.log(thisFilm);
   var context = {
    poster_path:thisFilm.poster_path,
    title:thisFilm.title,
    vote_average:thisFilm.vote_average,
    overview:thisFilm.overview
  };

   var html = template(context);
   $('.films').append(html);
 }
}


//funzione che stampa il risultato dei films
  function printTelefilms(teleFilms) {
  var source = $('#telefilm-template').html();
  var template = Handlebars.compile(source);
  for (var i = 0; i < teleFilms.length; i++) {
   var thisteleFilms = teleFilms[i];
   console.log(thisteleFilms);
   var context = {
    poster_path:thisteleFilms.poster_path,
    title:thisteleFilms.name,
    vote_average:thisteleFilms.vote_average,
  };

   var html = template(context);
   $('.telefilms').append(html);
 }
}
