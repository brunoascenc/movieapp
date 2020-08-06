// Getting elements from the dom
const inputElement = document.getElementById("searchInput");
const movieFilter = document.querySelector(".movies-filter");
const moviesContainer = document.getElementById("upcoming-movies");
const similarMovies = document.getElementById("similar-movies");
const selectBtn = document.getElementById("select-genre");
const popularSelect = document.getElementById("filter-movie");
const displayPopular = document.getElementById('popular-container')
const popularContainer = document.getElementById('popular-movies')
const filterSelect = document.getElementById('filter-movie')

//searchMovies/filter
const renderFilteredMovie = (data) => {
  movieFilter.innerHTML = "";
  const movies = data.results;
  console.log(movies)
  let output = ``
  for (let i in movies){
    if (movies[i].poster_path){
      output += `
      <div class="movie-item">
      <div class ="img-container">
         <img src ="${IMAGE_URL + movies[i].poster_path}" data-movie-id="${movies[i].id}"/>
      <div class="details-btn">
         <button>Details</button>
       </div>
      </div>
       
        
        <span class="movie-title">${movies[i].title}</span>
          
       <div class ="movie-rating">
         <i class="far fa-star"></i><p>${movies[i].vote_average}</p>
       </div>
     </div>  
    `
    document.querySelector(".movies-filter").innerHTML = output;

    }
  }


  document.querySelector('.filter-btn').addEventListener('click', e => {
    e.preventDefault();
    const genreValue = selectBtn.value
    const popularValue = popularSelect.value
    const genreTxt = selectBtn.options[selectBtn.selectedIndex].text;
    const filterTxt = filterSelect.options[filterSelect.selectedIndex].text;

    filterMovie(genreValue,popularValue)

    document.querySelector('.name-value').style.display = "none"
    document.querySelector('.item-searched').style.display = "flex"
    document.getElementById("genre").innerHTML = genreTxt;
    document.getElementById("filter").innerHTML = filterTxt;

    document.querySelector('.pagination-btn').classList.add('show', 'pagination')
    displayPopular.classList.add('hide')
  })
  
};


//render movies
function renderUpcoming(data) {
  const movies = data.results;
  let output = ``
  for (let i in movies){
    if(movies[i].poster_path){
      output += `
      <div class ="swiper-slide">
         <img src ="${IMAGE_URL + movies[i].poster_path}" data-movie-id="${movies[i].id}"/>
         <span class="movie-date">${movies[i].release_date}</span>
      </div>
   `
    document.querySelector(".swiper-wrapper").innerHTML = output;
    }
  }
}

//Movie Details
document.addEventListener('click', e => {
  if(e.target.tagName === "IMG"){
    let movieId = e.target.getAttribute("data-movie-id")
    movieDetails(movieId)
  }
})

function renderPopular(data) {
  const movies = data.results;
  // console.log(movies)
  let output = ``
  for (let i in movies){
    if(movies[i].poster_path){
      output += `
        <div class="movie-item">
         <div class ="img-container">
            <img src ="${IMAGE_URL + movies[i].poster_path}" data-movie-id="${movies[i].id}"/>
         <div class="details-btn">
            <button>Details</button>
          </div>
         </div>
          
           
           <span class="movie-title">${movies[i].title}</span>
             
          <div class ="movie-rating">
            <i class="far fa-star"></i><p>${movies[i].vote_average}</p>
          </div>
        </div>  
     `
     document.getElementById("popular-movies").innerHTML = output;
    }
  }
}

//Error
const handleError = (error) => {
  console.log(error);
};

//search button
document.getElementById('search').addEventListener("click", (e) => {
  e.preventDefault();

  if(inputElement.value){
    const value = inputElement.value;
    searchMovie(value);
  
    document.querySelector('.item-searched').style.display = 'none'
    document.querySelector('.name-value').style.display = "flex"
    document.getElementById("movie-name").innerHTML = value;
    displayPopular.classList.add('hide')
  
    inputElement.value = "";
  }
});

//get movies id
function movieDetails(id) {
  sessionStorage.setItem("movieId", id);
  window.location = "movie.html";
  return false;
}

function getImages(data) {
  const img = data.backdrops
  document.getElementById('movie-banner').style.backgroundImage = `
                linear-gradient(rgba(34, 33, 33, 0.425),
                rgba(30, 18, 37, 0.329)),
                url('${'https://image.tmdb.org/t/p/original' + img[0].file_path}')`
}

//Movie Details output
const getDetails = (data) => {
  const movie = data;
  console.log(movie)
  const genre = data.genres;
  const genreName = genre.map(e => `<span>${e.name}</span>`).join(", ")


    let output = `
        <div class = "poster-movie">
        <img src = "${IMAGE_URL + movie.poster_path}"/>
        <div class="bgimg"></div>
        </div>
        <div class= "details-container">
        <div class = "overview">
            <h1>Movie overview</h1>
            <p>${movie.overview}</p>
        </div>
        <div class = "detail-info">
           <h1>Details</h1>
           <ul>
             <li><span class="contrast">Title:</span> ${movie.title}</li>
             <li><span class="contrast">Release Date:</span> ${movie.release_date}</li>
             <li><span class="contrast">Genre:</span> ${genreName}</li>
             <li><span class="contrast">Duration:</span> ${movie.runtime} min</li>
             <li><span class="contrast">Rating</span> ${movie.vote_average}</li>
           </ul>
           <button class= "trailerBtn">Trailer</button>
        </div>

        <h1>Similar Movies</h1>
        <div class="similar-movies">
        </div>

        </div>



    `
  document.getElementById("movie-detail").innerHTML = output;
};

// Display movie trailer
const getTrailer = (data) => {
  const movie = data.results;
  document.addEventListener("click", e => {
    if (e.target.className === "trailerBtn") {
      let output = `
          <iframe src = "https://www.youtube.com/embed/${movie[0].key}" width="250" height="300"></iframe>
      `;
      document.querySelector(".movie-trailer").innerHTML = output;
    }
  });
}

//Movie Reviews
function getReviews(data) {
  const movie = data.results;
  movie.length = 4;
  let output = ``;
  for (let i in movie) {
    if(movie[i].content){
      output += `
      <div>
          <h3>By: ${movie[i].author}</h3>
          <p>${movie[i].content}</p>
          <a href = "${movie[i].url}">See the post</a>
      </div>
      `;
      document.querySelector(".movie-reviews").innerHTML = output;
    }
  }
}

//Similar movies
async function getSimilarMovies(data) {
  const movies = data.results;
  movies.length = 4;
  let output = ``
  for (let i in movies){
    if(movies[i].poster_path){
      output += `
        <div>
           <img src ="${IMAGE_URL + movies[i].poster_path}" data-movie-id="${movies[i].id}"/> 
        </div>
      `
    document.querySelector(".similar-movies").innerHTML=output
    }
  }
}

//Filter genre
function selectGenres(data){
  const genreOptions = data.genres
  let output = `<option value = "" selected="true">All</option>`
  for (let i in genreOptions) {
    output += `
         <option value="${genreOptions[i].id}">${genreOptions[i].name}</option> 
    `;
    document.querySelector("#select-genre").innerHTML = output;
  }
}

//Pagination of popular Movies
function pagination(){
  var value = 1
  document.addEventListener('click', e =>{
    e.preventDefault()
    if(e.target.className==='next-page'){
      if(value < 1000){
        value++
        getPopularMovies(value)
        popularContainer.innerHTML = ""
      }

    } else if (e.target.className === 'previous-page'){
      if(value !== 1 ){
        value--
        getPopularMovies(value)
        popularContainer.innerHTML = ""
      }

    } else if (e.target.className === 'filter-next'){
      if(value < 1000){
        value++
        const genreValue = selectBtn.value
        const popularValue = popularSelect.value
        filterMovie(genreValue,popularValue, value)
        popularContainer.innerHTML = ""
      }

    }else if (e.target.className === 'filter-prev'){
      if(value !== 1 ){
        value--
        const genreValue = selectBtn.value
        const popularValue = popularSelect.value
        filterMovie(genreValue,popularValue, value)
        popularContainer.innerHTML = ""
      }
    }
  })
}
