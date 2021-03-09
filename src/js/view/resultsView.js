import View from './view.js';
import previewView from './previewView.js'
import icons from 'url:../../img/icons.svg';

class ResultsView extends View {
    _parentEl = document.querySelector('.results');
    _errorMessage = 'No recipes found for your query! Please try again :)'
    _message = '';

    _generateMarkup () {
        //this gives an array and we want to print/render all the elements in the array
        // console.log(this._data);
        return this._data.map(result => previewView.render(result, false)).join('');
    }
}

export default new ResultsView();