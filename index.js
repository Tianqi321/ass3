const base = "https://api.themoviedb.org/3/";
const api_key = "7e4d01b54191a693ad054f620d13c8df";



//we need list to store info
var per_list=[];
var mov_list=[first_movie];

//movie
function movieinfoo(movie){
    var url = base + "search/movie?" + `api_key=${api_key}&query="${movie}"`;
    fetch(url).then(function (response) {
        return response.text();
    }).then(function (text) {
        //get info movie
        let outcome = JSON.parse(text);
        var movie_json = outcome.results[0];
        var movies = document.querySelectorAll('[id=movieinfo]');
        //display movie info
        movies[movies.length-1].innerHTML = `<b id="movietitle">${movie_json.title}</b><br> ` +`<b id="moviedate">${movie_json.release_date}</b><br> `+"<img src='https://image.tmdb.org/t/p/original/"+ movie_json.poster_path + "'>";
        var moviediv = document.getElementById("movie");
        moviediv.style.background=`url(https://image.tmdb.org/t/p/original${movie_json.backdrop_path}) no-repeat center`;
       // console.log('123')
        //console.log(movie_json)
    });
}

//people
function printPerson(people_json){
  var people = document.querySelectorAll('[id=peopleinfo]');
  people[people.length-1].innerHTML = `<b id="peopleid" style="visibility:hidden;">${people_json.id}</b><br>`+`<b id="peoplename">${people_json.name}</b>`+"<br>" +"<img src='https://image.tmdb.org/t/p/w780/"+ people_json.profile_path + "'>"; 
}


//the first movie info and img
var first_movie = "Fight Club".toLowerCase();
movieinfoo(first_movie);


function getMovieId(movie){
    var url = base + "search/movie?" + `api_key=${api_key}&query="${movie}"`;
    return fetch(url).then(function (response) {
        return response.text();
    }).then(function (text) {
        let outcome = JSON.parse(text);
        var movie_json = outcome.results[0];
        return movie_json.id;
    });
  }
  

//verifiy director
function is_Director(crew, name){
    let director =null;
    crew.forEach(function(people){
        if(people.job == "Director"){
          if(people.name.toLowerCase()==name.toLowerCase()){
            director = people;
          }
    }});
    return director;
  }
//verifiy actor
  function is_Actor(cast, name){
    let actor=null;
    let i = 0;
    while(i<cast.length && actor==null){
      if(cast[i].name.toLowerCase() == name.toLowerCase()){
        actor=cast[i];
      }
      i = i + 1;
    }
    return actor;
  }
//show people profile
//function printactor(people_json){
    //console.log('correct')
  //  var people = document.querySelectorAll('[id=peopleinfo]');
    //people[people.length-1].innerHTML = `<b id="peopleid" style="visibility:hidden;">${people_json.id}</b><br>`+`<b id="personname">${people_json.name}</b>`+"<br>" +"<img src='https://image.tmdb.org/t/p/w780/"+ person_json.profile_path + "'>";
    //var peopledivs = document.querySelectorAll('[id=people]');
    //var peoplediv = peoledivs[peopledivs.length-1]
   // console.log('correct2')
    //peoplediv.style.backdground=`url(https://image.tmdb.org/t/p/original${movie_json.backdrop_path}) no-repeat center`
    //peoplediv.style.backgroundSize ="cover";
//}
function directed_in(crew, name){
    let movie = null;
    crew.forEach(function(credit){
        if(credit.job == "Director"){
          if(credit.title.toLowerCase()==name.toLowerCase()){
            movie = credit;
          }
    }});
    return movie;
  }

function starring_at(cast, name){
    let movie = null;
    let i = 0;
    while(i<cast.length && movie==null){
      if(cast[i].title.toLowerCase() == name.toLowerCase()){
        movie=cast[i];
      }
      i = i + 1;
    }
    return movie;
  }  

function infomatch_people(movieid,name){
    var url = base + `movie/${movieid}/credits?` + `api_key=${api_key}`
    fetch(url).then(function (response) {
        return response.text();
    }).then(function (text) {
        let people=JSON.parse(text);
        let crew=people.crew;
        let cast=people.cast;
        let answer=document.querySelectorAll('[id=answer]');
        let director = is_Director(crew,name);
        let actor = is_Actor(cast,name);
        if(director)
        {
            console.log(1)
            answer[answer.length-1].innerHTML = "<b id='success'>Congration!You are right</b>";
            var submits = document.querySelectorAll('[id=submitbutton]')
            submits[submits.length-1].disabled = true;
           
        //    document.getElementById("people").style.display=""
           addDivPeople(director)
           printPerson(director)
           //store in the list
           per_list.push(name.toLowerCase());
           submit_and_checked_movie();
            
        }
        else if(actor)
        {
            console.log(2)
            console.log(actor)
            answer[answer.length-1].innerHTML = "<b id='success'>Congration!You are right</b>";
            var submits = document.querySelectorAll('[id=submitbutton]')
            submits[submits.length-1].disabled = true;
        //    document.getElementById("people").style.display=""
            addDivPeople(actor)
            printPerson(actor)
            per_list.push(name.toLowerCase());
            submit_and_checked_movie();
            
            
        }
        else
        {
            console.log(3)
            answer[answer.length-1].innerHTML = "<b id='success' style='color:red;'>Sorry!That is not correct</b>";
        }
})};

function infomatch_movie(peopleid,name){
    console.log(peopleid)
    var url = base + `person/${peopleid}/movie_credits?` + `api_key=${api_key}`
    console.log(url)
    fetch(url).then(function (response) {
        return response.text();
    }).then(function (text) {
        let people=JSON.parse(text);
        let crew=people.crew;
        let cast=people.cast;
        let answer=document.querySelectorAll('[id=answer]');
        let directed = directed_in(crew,name);
        let starring = starring_at(cast,name);
        console.log(1)
    if(directed)
    {
        console.log('right1')
        answer[answer.length-1].innerHTML = "<b id='success'>Congration!You are right</b>";
        mov_list.push(name.toLowerCase());
        var submits = document.querySelectorAll('[id=submitbutton]')
        submits[submits.length-1].disabled = true;
        addDivMovie()
        printPoster(directed)
        submit_and_checked_people();

    }
    else if(starring){
        console.log('righ2')
        answer[answer.length-1].innerHTML = "<b id='success'>Congration!You are right</b>";
        mov_list.push(name.toLowerCase());
        var submits = document.querySelectorAll('[id=submitbutton]')
        submits[submits.length-1].disabled = true;
        addDivMovie()
        printPoster(starring)
        submit_and_checked_people();
        
    }
    else{
        console.log('wrong')
        answer[answer.length-1].innerHTML = "<b id='success' style='color:red;'>Sorry!That is not correct</b>";

    }
});
}




var buttons = document.querySelectorAll('[id=submitbutton]');
var button = buttons[buttons.length-1];
button.addEventListener('click',function(){
  var forms = document.querySelectorAll('[id=formActor]');
  var formActor = forms[forms.length-1];
  var name = formActor.elements.actorname.value;//get the input
 // console.log(name)
  if(name != ""){
    var moviesnames = document.querySelectorAll('[id=movietitle]');
    var movie= moviesnames[moviesnames.length-1].innerText;
    //Get the movie id and check the credits
    getMovieId(movie).then(function(movieid){
   //   console.log(movieid);
      infomatch_people(movieid,name);
    });
  }
});

function submit_and_checked_movie(){
  var buttons = document.querySelectorAll('[id=submitbutton]');
  var button = buttons[buttons.length-1];
  button.addEventListener('click',function(){
    var forms_m = document.querySelectorAll('[id=formMovie]')
    var formMovie = forms_m[forms_m.length-1];
    var name = formMovie.elements.moviename.value;
    console.log(name)
    //metionned check
    if(mov_list.includes(name.toLowerCase())){
      var answer = document.querySelectorAll('[id=answer]');
      answer[answer.length-1].innerHTML = "<b id='answer' style='color:red;'>Already Mentionned moive!</b>";
    }
    else if(name != ""){
      var personsids = document.querySelectorAll('[id=peopleid]')
      var personid= personsids[personsids.length-1].innerHTML;
      console.log(personid)
      infomatch_movie(personid,name);
    }});
}

function submit_and_checked_people(){
  var buttons = document.querySelectorAll('[id=submitbutton]');
  var button = buttons[buttons.length-1];
  button.addEventListener('click',function(event){
    event.preventDefault();
    var forms_a = document.querySelectorAll('[id=formActor]')
    var formActorDirector = forms_a[forms_a.length-1];
    var name = formActorDirector.elements.actorname.value;
    console.log(name)
    console.log(per_list)
    //Check if the person has already been mentionned
    if(per_list.includes(name.toLowerCase())){
      var answer = document.querySelectorAll('[id=answer]');
      answer[answer.length-1].innerHTML = "<b id='answer' style:color='red'>Already Mentionned people!</b>";
    }
    else if(name != ""){
    var moviesids = document.querySelectorAll('[id=movieid]')
    var movieid= moviesids[moviesids.length-1].innerHTML;
    infomatch_people(movieid,name);
  }});
}

//var buttons2 = document.querySelectorAll('[id=submitbutton2]');
//var button2 = buttons2[buttons2.length-1];
 // button2.addEventListener('click',function(){
  //  var forms = document.querySelectorAll('[id=formmovie]')
   // var formmovie = forms[forms.length-1];
   // var name = formmovie.elements.moviename.value;
    //Check if the movie has already been mentionned
  //  if(list_movies.includes(name.toLowerCase())){
   //   var answer2 = document.querySelectorAll('[id=answer2]');
   //   answer2[answer2.length-1].innerHTML = "<b id='answer2'>Already Mentionned!</b>";
    //}
    //else if(name != ""){
    //  var personsnames = document.querySelectorAll('[id=personname]')
    //  var person= personsnames[personsnames.length-1].innerText;
    //  console.log(document.querySelectorAll('[id=personid]'));
    //  var personsids = document.querySelectorAll('[id=personid]')
     // var personid= personsids[personsids.length-1].innerHTML;
     // infomatch_people(personid,name);
   // }});






//button.addEventListener('click',function(){
 //   var forms = document.querySelectorAll('[id=formmovie]');
  //  var formmovie = forms[forms.length-1];
   // var name = formmovie.elements.moivename.value;//get the input
   // if(name != ""){
   //   var moviesnames = document.querySelectorAll('[id=movietitle]');
    //  var movie= moviesnames[moviesnames.length-1].innerText;
      //Get the movie id and check the credits
     // getMovieId(movie).then(function(movieid){
       // console.log(movieid);
      //  infomatch_people(movieid,name);
    //  });
   // }
  //});

//document.getElementById('button2').addEventListener

function addDivMovie(){
  var divmovie = document.createElement("div");
  divmovie.setAttribute("id", "movie");
  var divmovieinfo = document.createElement("div");
  divmovieinfo.setAttribute("id", "movieinfo");
  var formactor = document.createElement("form");
  formactor.setAttribute("id","formActor");
  formactor.setAttribute("name","formActor");
  formactor.setAttribute("onsubmit","clickOnSubmitButton();return false;");
  var label = document.createElement("label");
  label.setAttribute("for","actorname");
  label.innerText = "Enter the director name or one of the actor‘s name of this movie :";
  var input_actorname = document.createElement("input");
  input_actorname.setAttribute("type","text");
  input_actorname.setAttribute("id","actorname");
  input_actorname.setAttribute("name","actorname");
  input_actorname.setAttribute("required","true");
  var submitbutton = document.createElement("input");
  submitbutton.setAttribute("id","submitbutton");
  submitbutton.setAttribute("type","button");
  submitbutton.setAttribute("value","Submit");
  var divwrong = document.createElement("div");
  var divquizz = document.getElementById("quizz");
  divquizz.appendChild(document.createElement("br"));
  divquizz.appendChild(divmovie);
  divwrong.setAttribute("id","wrong");
  divmovie.appendChild(divmovieinfo);
  divmovie.appendChild(formactor);
  formactor.appendChild(label);
  formactor.appendChild(document.createElement("br"));
  formactor.appendChild(input_actorname);
  formactor.appendChild(document.createElement("br"));
  formactor.appendChild(submitbutton);
  divmovie.appendChild(divwrong);
}


function addDivPeople(){
    var divperson = document.createElement("div");
    divperson.setAttribute("id", "people");
    divperson.setAttribute('style','background:url(https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/72%2C_Strada_Dionisie_Lupu%2C_Bucharest_%28Romania%29.jpg/800px-72%2C_Strada_Dionisie_Lupu%2C_Bucharest_%28Romania%29.jpg)')
    var divpersoninfo = document.createElement("div");
    divpersoninfo.setAttribute("id", "peopleinfo");
    var formmovie = document.createElement("form");
    formmovie.setAttribute("id","formMovie");
    formmovie.setAttribute("name","formMovie");
    formmovie.setAttribute("onsubmit","clickOnSubmitButton();return false;");
    var label = document.createElement("label");
    label.setAttribute("for","moviename");
    label.innerText = "Enter a movie that this person directed or starring at?";
    var input_moviename = document.createElement("input");
    input_moviename.setAttribute("type","text");
    input_moviename.setAttribute("id","moviename");
    input_moviename.setAttribute("name","moviename");
    input_moviename.setAttribute("required","true");
    var submitbutton = document.createElement("input");
    submitbutton.setAttribute("id","submitbutton");
    submitbutton.setAttribute("type","button");
    submitbutton.setAttribute("value","Submit");
    var divanswer = document.createElement("div");
    var divquizz = document.getElementById("quizz");
    divquizz.appendChild(document.createElement("br"));
    divquizz.appendChild(divperson);
    divanswer.setAttribute("id","answer");
    divperson.appendChild(divpersoninfo);
    divperson.appendChild(formmovie);
    formmovie.appendChild(label);
    formmovie.appendChild(document.createElement("br"));
    formmovie.appendChild(input_moviename);
    formmovie.appendChild(document.createElement("br"));
    formmovie.appendChild(submitbutton);
    divperson.appendChild(divanswer);
  }


function addDivMovie(){
    var divmovie = document.createElement("div");
    divmovie.setAttribute("id", "movie");
    var divmovieinfo = document.createElement("div");
    divmovieinfo.setAttribute("id", "movieinfo");
    var formactor = document.createElement("form");
    formactor.setAttribute("id","formActor");
    formactor.setAttribute("name","formActor");
    formactor.setAttribute("onsubmit","clickOnSubmitButton();return false;");
    var label = document.createElement("label");
    label.setAttribute("for","actorname");
    label.innerText = "Enter the director or one of the actors of this movie :";
    var input_actorname = document.createElement("input");
    input_actorname.setAttribute("type","text");
    input_actorname.setAttribute("id","actorname");
    input_actorname.setAttribute("name","actorname");
    input_actorname.setAttribute("required","true");
    var submitbutton = document.createElement("input");
    submitbutton.setAttribute("id","submitbutton");
    submitbutton.setAttribute("type","button");
    submitbutton.setAttribute("value","Submit");
    var divanswer = document.createElement("div");
    var divquizz = document.getElementById("quizz");
    divquizz.appendChild(document.createElement("br"));
    divquizz.appendChild(divmovie);
    divanswer.setAttribute("id","answer");
    divmovie.appendChild(divmovieinfo);
    divmovie.appendChild(formactor);
    formactor.appendChild(label);
    formactor.appendChild(document.createElement("br"));
    formactor.appendChild(input_actorname);
    formactor.appendChild(document.createElement("br"));
    formactor.appendChild(submitbutton);
    divmovie.appendChild(divanswer);
}

function clickOnSubmitButton(){
  var buttons = document.querySelectorAll('[id=submitbutton]');
  var button = buttons[buttons.length-1];
  button.click();
}

function printPoster(movie_json){
  var movies = document.querySelectorAll('[id=movieinfo]');
  movies[movies.length-1].innerHTML = `<b id="movieid" style="visibility:hidden;">${movie_json.id}</b><br>`+`<b id="movietitle">${movie_json.title}</b><br> `+`<b id="moviedate">${movie_json.release_date}</b><br>`  +"<img src='https://image.tmdb.org/t/p/original/"+ movie_json.poster_path + "'>";
  var moviedivs = document.querySelectorAll('[id=movie]');
  var moviediv = moviedivs[moviedivs.length-1]
  moviediv.style.background=`url(https://image.tmdb.org/t/p/original${movie_json.backdrop_path}) no-repeat center`;
  moviediv.style.backgroundSize ="cover";
}