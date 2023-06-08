
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import * as model from './model'
import recipeView from './view/recipeView'
import searchView from './view/searchView'
import resultsView from './view/resultsView'
import paginationView from './view/paginationView'
import bookmarksView from './view/bookmarksView'
import addRecipeView from './view/addRecipeView'
import { MODAL_CLOSE_SEC } from './config'

if (module.hot) {
  module.hot.accept()
}
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1)
    if (!id) return;
    recipeView.renderSpinner()

    resultsView.update(model.getSearchResultPage())
    bookmarksView.update(model.state.bookmarks)
    await model.loadRecipe(id)
    ////////////////////
    recipeView.render(model.state.recipe)
  }
  catch (err) {

    recipeView.renderError()
  }
}
const controlSearchResults = async function () {
  try {
    // resultsView.renderSpinner()
    const query = searchView.getQuery()
    if (!query) return;

    await model.loadSearchResults(query)

    resultsView.render(model.getSearchResultPage())

    paginationView.render(model.state.search)

  }
  catch (err) {
    console.log(err)
  }
}
const controlPagination = function (gotoPage) {
  resultsView.render(model.getSearchResultPage(gotoPage))
  paginationView.render(model.state.search)
}
const controlServings = function (newServings) {
  model.updateServings(newServings)
  recipeView.update(model.state.recipe)
}
const controlAddBookmark = function () {
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe)
  }
  else {
    model.deleteBookmark(model.state.recipe.id)
  }
  recipeView.update(model.state.recipe)

  bookmarksView.render(model.state.bookmarks)
}
const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks)
}
const controlAddRecipe = async function (newRecipe) {
  try {
    addRecipeView.renderSpinner()
    await model.uploadRecipe(newRecipe)
    console.log(model.state.recipe)
    recipeView.render(model.state.recipe)
    addRecipeView.renderMessage()
    bookmarksView.render(model.state.bookmarks)

    window.history.pushState(null, '', `#${model.state.recipe.id}`)


    setTimeout(function () {
      addRecipeView.toggleWindow()
    }, MODAL_CLOSE_SEC * 1000)
  }
  catch (err) {
    console.error(err)
    addRecipeView.renderError(err.message)
  }
}
// ['hashchange', 'load'].forEach(element => window.addEventListener(element, controlRecipe));
const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks)
  recipeView.addHandleRender(controlRecipe)
  recipeView.addHandlerUpdateServings(controlServings)
  recipeView.addHandlerBookmark(controlAddBookmark)
  searchView.addHandlerSearch(controlSearchResults)
  paginationView.addHandlerClick(controlPagination)
  addRecipeView.addHandlerUpload(controlAddRecipe)
}
init()

