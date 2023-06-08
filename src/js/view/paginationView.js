import View from "./View";
import icons from 'url:../../img/icons.svg'
class PaginationView extends View {
  _parentelement = document.querySelector('.pagination')

  addHandlerClick(handler) {
    this._parentelement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline')
      if (!btn) return
      const gotoPage = +btn.dataset.goto
      handler(gotoPage);
    })
  }

  _generateMarkup() {
    const numPages = Math.ceil(this._data.results.length / this._data.resultPerPage)
    const curPage = this._data.page
    if (curPage === 1 && numPages > 1) {
      return `
      <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
      <span>Page ${curPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>`
    }
    if (curPage === numPages) {
      return `    
      <button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${curPage - 1}</span>
    </button> `
    }
    if (curPage < numPages) {
      return `    
      <button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${curPage - 1}</span>
    </button>
    <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
    <span>Page ${curPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button> `
    }
    return ''
  }
}
export default new PaginationView()