const autoCompleteConfig = {
   renderOption(movie){      
      const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
      return `
         <img src="${imgSrc}" />
         ${movie.Title} (${movie.Year})
      `;
   },   
   inputValue(movie){
      return movie.Title;
   },
   async fetchData (searchTerm) {
      const response = await axios.get('http://www.omdbapi.com/', {
         params: {
            apikey: 'd9835cc5',
            s: searchTerm
         }
      });
   
      if (response.data.Error) {
         return [];
      }
   
      return response.data.Search;
   }
}

createAutoComplete({
   ...autoCompleteConfig,
   root : document.querySelector('#left-autocomplete'),   
   onOptionSelect(movie) {
      document.querySelector('.tutorial').classList.add('is-hidden');
      onMovieSelect(movie, document.querySelector('#left-summary'), 'left');
   }
});

createAutoComplete({
   ...autoCompleteConfig,
   root : document.querySelector('#right-autocomplete'),   
   onOptionSelect(movie) {
      document.querySelector('.tutorial').classList.add('is-hidden');
      onMovieSelect(movie, document.querySelector('#right-summary'), 'right');
   }
});

let leftMovie;
let rightMovie;
const onMovieSelect = async (movie, summaryElement, side) => {
   const response = await axios.get('http://www.omdbapi.com/', {
      params: {
         apikey: 'd9835cc5',
         i: movie.imdbID
      }
    });
   //  console.log(response.data);
   //  console.log(document.querySelector("#summary"));
   summaryElement.innerHTML = movieTemplate(response.data);
   movieTemplate(movie);

   if(side === 'left')
      leftMovie = response.data;
   else if(side === 'right')
      rightMovie = response.data;

   if(leftMovie && rightMovie){
      runComparison(leftMovie, rightMovie);
   }
}

const runComparison = (leftMovie, rightMovie) => {
   /*
    find the first article element for each movie
    Run a comparison on the box office
    then apply some styling to that 'article' element

    find the first article element for each movie
    Run a comparison on the # of awards
    then apply some styling to that 'article' element
   */
   console.log('Can compare!')
}

const movieTemplate = (movieDetail) => {
   const aux = movieDetail.BoxOffice.replace(/\$/g, '');
   console.log(aux);
   const dollars = parseInt(aux.replace(/,/g, ''));
   const metaScore = parseInt(movieDetail.Metascore);
   const imdbRating = parseFloat (movieDetail.imdbRating);
   const imdbVotes = parseInt (movieDetail.imdbVotes.replace(/,/g, ''));
   let awardsCount = 0;
   const awards = movieDetail.Awards.split(' ').forEach(element => {
      let value = parseInt(element);
      if (!isNaN(value))
         awardsCount += value;
   });
   console.log(dollars, metaScore, imdbRating, imdbVotes, awardsCount);

   return `
   <article class="media">
      <figure class="media-left">
         <p class="image">
            <img src="${movieDetail.Poster}" />
         </p>
      </figure>
      <div class="media-content">
         <div class="content">
         <h1>${movieDetail.Title}</h1>
         <h4>${movieDetail.Genre}</h4>
         <p>${movieDetail.Plot}</p>
         </div>
      </div>
   </article>
   <article data-value=${awardsCount} class="notification is-primary">
      <p class="title">${movieDetail.Awards}</p>      
      <p class="subtitle">Awards</p>
   </article>
   <article data-value=${dollars} class="notification is-primary">
      <p class="title">${movieDetail.BoxOffice}</p>
      <p class="subtitle">Box Office</p>
   </article>
   <article data-value=${metaScore} class="notification is-primary">
      <p class="title">${movieDetail.Metascore}</p>
      <p class="subtitle">Metascore</p>
   </article>
   <article data-value=${imdbRating} class="notification is-primary">
      <p class="title">${movieDetail.imdbRating}</p>
      <p class="subtitle">imdb Rating</p>
   </article>
   <article data-value=${imdbVotes} class="notification is-primary">
      <p class="title">${movieDetail.imdbVotes}</p>
      <p class="subtitle">imdb Votes</p>
   </article>
   `;
}