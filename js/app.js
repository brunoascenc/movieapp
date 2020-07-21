const searchButton = document.getElementById('search')
const inputElement = document.getElementById('searchInput')
const movieSearch = document.getElementById('movies-search')
const moviesContainer = document.getElementById('movie-container')
const detailsContainer = document.getElementById('movie-detail')


//movie items
const movieSection = movie => {
    const section = document.createElement('section')
    section.classList = 'section'

     movie.map((movie) =>{
      if(movie.poster_path){
          const img = document.createElement('img')
          img.src = IMAGE_URL + movie.poster_path
          img.setAttribute('data-movie-id', movie.id)
          img.addEventListener('click', function() {
              movieDetails(movie.id)
          })

          section.appendChild(img)
      }
    })

    return section
}

//create movie container
const movieContaier = (movies, title = '') => {
    const movieElement = document.createElement('div')
    movieElement.setAttribute('class', 'movie')

    const header = document.createElement('div')
    header.innerHTML = title

    const content = document.createElement('div')
    content.classList = 'content'

    const contentClose = `<p id ="content-close">X</p>`
    content.innerHTML = contentClose

    const section = movieSection(movies)

    movieElement.appendChild(header)
    movieElement.appendChild(section)
    movieElement.appendChild(content)
    return movieElement
}

//searchMovies
const renderSearchMovies = data => {
    movieSearch.innerHTML = '';
    const movies = data.results
    const movieBlock = movieContaier(movies)
    movieSearch.appendChild(movieBlock)
}

function renderMovies(data) {
    const movies = data.results
    const movieBlock = movieContaier(movies, this.title)
    moviesContainer.appendChild(movieBlock)
}

const handleError = error => {
    console.log(error)
}

//call data
searchButton.addEventListener('click', e =>{
    e.preventDefault()
    const value = inputElement.value
    searchMovie(value)

    inputElement.value = '';
}) 

function movieDetails(id){
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html'
    return false
}

function getMovies(){
    let movieId = sessionStorage.getItem('movieId');
    const path = `/movie/${movieId}`
    const url = dinamicUrl(path)

    fetch(url)
        .then((res) => res.json())
        .then((data) =>{
            const movie = data
            console.log(data)
            let output = `
            <h1>${movie.title}</h1>
            <img src = "${IMAGE_URL + movie.poster_path}"/>
            <p>${movie.overview}</p>
            <a href = "index.html">Back to home</a>
            `
            document.getElementById("movie-detail").innerHTML = output;
        })
}

getMovies()
getUpcomingMovies()
getPopularMovies()
getTopRated()
