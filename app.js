const config = {
    api_key: '8f8651655f78c47056460d8762481908',
    api_base_url: 'https://api.themoviedb.org/3/',
    image_base_url: 'https://image.tmdb.org/t/p/w1280'
}

const BASE_URL = config.api_base_url
const API_KEY = config.api_key


const moviesDiv = document.getElementById("movies")
async function getPopularMovies(page = 1) {
    let data = []
    try {
        // const response = await fetch(`${BASE_URL}movie/popular?api_key=${API_KEY}&page=${page}`)
        const response = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=8f8651655f78c47056460d8762481908")

        const responseData = await response.json()
        data = responseData?.results
        console.log(data)
    } catch (error) {
        console.log("ERROR")

    }
    return data
}

const closebtn = document.querySelector(".btn-close");
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');



const closeModal = function () {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
    document.body.style.overflow = "scroll"

};
closebtn.addEventListener("click", closeModal);



async function renderMovies() {
    const movies = await getPopularMovies()
    console.log(movies)
    movies?.map(movie => renderSingleMovie(movie)).join("")
    console.log(moviesDiv)
}

function renderSingleMovie(movie) {
    const item = document.createElement('div');
    item.className = "col-4 col-lg-3 col-xl-2 p-1 open";
    item.addEventListener("click", (event) => {
        const button = event.currentTarget;
        const card = button.closest('.card');

        modal.innerHTML =
            `
        <div class="container">
        <div class="row">
            <div class="col-md-6">
            <img src="${config.image_base_url + movie?.poster_path}" class="img-fluid"/>
            </div>
            <div class="col-md-6">
                <h2 class="movie-title">${movie.original_title}</h2>
                <p class="movie-title">${movie.overview}</p>

            </div>
    
        </div>
    </div>
          `

        modal.classList.remove("hidden");
        overlay.classList.remove("hidden");
        // document.body.style.overflow = "hidden"

    });

    item.innerHTML = `<img src="${config.image_base_url + movie?.poster_path}" class="img-fluid"  >
    <h5 class="py-5 text-center"> ${movie.original_title}</h5>`
    moviesDiv.appendChild(item)
}

renderMovies()








