import View from './View'
import icons from 'url:../../img/icons.svg'
import previewView from './previewView';
class ResultsView extends View {
  _parentelement = document.querySelector('.results');
  _errorMessage = "No recipes found for your query!Please Try Again"
  _message = '';
  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('')
  }

}
export default new ResultsView