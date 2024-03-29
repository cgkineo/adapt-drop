import Adapt from 'core/js/adapt';
import a11y from 'core/js/a11y';

export default class DropView extends Backbone.View {

  className() {
    let classes = 'drop is-closed';
    const modelClasses = this.model.get('_drop')._classes;

    if (modelClasses) classes += ` ${modelClasses}`;

    return classes;
  }

  initialize({ $content }) {
    this.$content = $content;
    this
      .listenTo(Adapt, 'remove', this.remove)
      .render();
  }

  events() {
    return { 'click .js-toggle-view': 'onClick' };
  }

  render() {
    const template = Handlebars.templates.drop;
    const data = this.model.get('_drop');

    this.$el
      .html(template(data))
      .appendTo(this.$content.parent());
    this.$content
      .addClass('drop__content')
      .appendTo(this.$el)
      .hide();
    this.setChildrenVisibility(false);
  }

  onClick() {
    this.$el.addClass('is-visited');
    this.toggle();

    return false;
  }

  setChildrenVisibility(isVisible) {
    this.model.getChildren().each(child => {
      if (!child.setOnChildren) return;
      child.setOnChildren('_isVisible', isVisible, { pluginName: '_drop' });
    });
  }

  toggle() {
    const shouldOpen = !this.$el.hasClass('is-open');

    this.$el.toggleClass('is-open is-closed');

    this.$('.drop__btn').first()
      .addClass('is-visited')
      .attr('aria-expanded', shouldOpen);

    this.$content
      .stop()
      .slideToggle({
        start: (shouldOpen ? this.onOpen : this.onClose).bind(this),
        done: (shouldOpen ? this.onOpened : this.onClosed).bind(this)
      });
  }

  onOpen() {
    $(window).trigger('resize');
    Adapt.trigger('device:resize');
    this.setChildrenVisibility(true);
  }

  onOpened() {
    a11y.focus(this.$content);
  }

  onClose() {}

  onClosed() {
    this.setChildrenVisibility(false);
  }

}
