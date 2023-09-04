import DropView from './DropView';
import Adapt from 'core/js/adapt';

Adapt.once('app:dataReady', () => {
  const views = [ 'menu', 'menuItem', 'page', 'article', 'block', 'component' ];
  const eventList = views.map(view => `${view}View:postRender`).join(' ');

  Adapt.on(eventList, ({ model, $el }) => {
    const config = model.get('_drop');

    if (config && config._isEnabled) {
      new DropView({ model, $content: $el.children().first() });
    }
  });
});
