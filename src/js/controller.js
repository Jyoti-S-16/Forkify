import * as model from './model.js';
import recipeView from './view/recipeView.js';
import searchView from './view/searchView.js';
import resultsView from './view/resultsView.js';
import paginationView from './view/paginationView.js';
import bookmarksView from './view/bookmarksView.js';


// for polifilling everything else async await
import 'core-js/stable';
// for polifilling async await
import 'regenerator-runtime/runtime'
import { async } from 'regenerator-runtime/runtime';


// https://forkify-api.herokuapp.com/v2

//*****************************************************************/

if(module.hot) {
  module.hot.accept();
}


const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if(!id) return;
    recipeView.renderSpinner();

    // 0. Update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());

    // 1.) Update bookmark view
    bookmarksView.update(model.state.bookmarks);

    // 2. Loading recipe
    await model.loadRecipe(id);

    // 3. Rendering recipe
    recipeView.render(model.state.recipe);

  }
  catch (err) {
    recipeView.renderError();
    console.error(err);
  }
};


const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    // console.log(resultsView);

    // 1. get search query
    const query = searchView.getQuery();
    if(!query) return;

    // 2.) load search results
    await model.loadSearchResult(query);

    // 3.) Render results
    resultsView.render(model.getSearchResultsPage(1));

    // 4,) Render initial pagination buttons
    paginationView.render(model.state.search);
  } 
  catch (err) {
    console.log(err);
  }
}

const controlPagination = function (goToPage) {
  // 1.) Render NEW results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 2,) Render NEW pagination buttons
  paginationView.render(model.state.search);
}

const controlServings = function(newServings) {
  // Update the recipe serving (in state)
  model.updateServing(newServings);

  // update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
}

const controlAddBookmark = function () {

  // ADD or remove bookmark
  if(!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } 
  else {
    model.deleteBookmark(model.state.recipe.id);
  }

  // 2.) Update recipe View
  recipeView.update(model.state.recipe);

  // 3.) Render bookmarks
  bookmarksView.render(model.state.bookmarks);
}

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
}


// window.addEventListener('hashchange', controlRecipes);
// window.addEventListener('load', controlRecipes);

// or

// publisher - subscriber pattern
const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
}
init();

