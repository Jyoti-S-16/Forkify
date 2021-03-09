import View from './view.js';
import previewView from './previewView.js'
import icons from 'url:../../img/icons.svg';

class BookmarksView extends View {
    _parentEl = document.querySelector('.bookmarks__list');
    _errorMessage = 'No boookmarks yet. FInd a nice recipe and bookmark it :)'
    _message = '';


    addHandlerRender (handler) {
        window.addEventListener('load', handler);
    }

    _generateMarkup () {
        //this gives an array and we want to print/render all the elements in the array
        // console.log(this._data);
        return this._data.map(bookmark => previewView.render(bookmark, false)).join('');
    }

}
export default new BookmarksView();