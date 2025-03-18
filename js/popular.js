import { BASE_URL, options } from './info.js';

async function showPopularMovies() {
    try {
        const response = await fetch(`${BASE_URL}/popular?language=en-US&page=1`, options);
        const data = await response.json();

        const fragment = document.createDocumentFragment();
        
        data.results.forEach(movie => {
            const card = document.querySelector('#movie-card').content.cloneNode(true);

            card.querySelector('h2').innerText = movie.title;

            const img = card.querySelector('img');
            img.setAttribute('src', `https://image.tmdb.org/t/p/w500${movie.poster_path}`);
            img.setAttribute('alt', movie.title);

            card.querySelector('.description').innerText = movie.overview;
            

            card.querySelector('.pill:first-of-type').innerHTML = `<strong>Original title:</strong> ${movie.original_title}`;
            card.querySelector('.pill:last-of-type').innerHTML = `<strong>Release date:</strong> ${movie.release_date}`;

            fragment.append(card);
        });

        document.querySelector('#movie-list').append(fragment);
    } catch (error) {
        console.error("Error when fetching movie:", error);
    }
}

showPopularMovies();