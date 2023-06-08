import View from "./View"

class SearchView extends View {
  _parentelement = document.querySelector('.search')
  _errorMessage = "We could not find the recipe.Please try another one!"
  _message = '';

  getQuery() {
    const query = this._parentelement.querySelector('.search__field').value
    this._clearInput()
    return query
  }
  _clearInput() {
    this._parentelement.querySelector('.search__field').value = ''
  }
  addHandlerSearch(handler) {
    this._parentelement.addEventListener('submit', function (e) {
      e.preventDefault()
      handler()
    })
  }

}

export default new SearchView();