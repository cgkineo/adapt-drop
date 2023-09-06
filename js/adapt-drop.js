import DropView from './DropView';
import Adapt from 'core/js/adapt';

class AdaptDrop extends Backbone.Controller {

  initialize() {
    this.listenTo(Adapt, 'app:dataReady', this.onDataReady);
  }

  onDataReady() {
    const views = [ 'menu', 'menuItem', 'page', 'article', 'block', 'component' ];
    const eventList = views.map(view => `${view}View:postRender`).join(' ');
    this.listenTo(Adapt, eventList, this.onEvent);
  }

  onEvent({ model, $el }) {
    const config = model.get('_drop');
    if (!config?._isEnabled) return;
    new DropView({ model, $content: $el.children().first() });
  }

}

export default new AdaptDrop();
