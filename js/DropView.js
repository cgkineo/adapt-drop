import Adapt from 'core/js/adapt';
import a11y from 'core/js/a11y';
import wait from 'core/js/wait';
import React from 'react';
import ReactDOM from 'react-dom';
import { templates } from 'core/js/reactHelpers';

class DropView extends Backbone.View {

  className() {
    let classes = 'drop is-closed';
    const modelClasses = this.model.get('_drop')._classes;

    if (modelClasses) classes += ` ${modelClasses}`;

    return classes;
  }

  initialize({ $content }) {
    _.bindAll(this, 'onClick');
    this.$content = $content;
    // Kept on the view, not the model: a model change re-renders a JSX element whose content this view has moved
    this.isOpen = false;
    this.isVisited = false;
    this
      .listenTo(Adapt, 'remove', this.remove)
      .render();
  }

  render() {
    this.renderButton();
    this.$el.appendTo(this.$content.parent());
    this.$content
      .addClass('drop__content')
      .appendTo(this.$el)
      .hide();
    this.setChildrenVisibility(false);
  }

  renderButton() {
    const Template = templates[this.constructor.template.replace('.jsx', '')];
    const props = {
      ...this.model.get('_drop'),
      _isOpen: this.isOpen,
      _isVisited: this.isVisited,
      onClick: this.onClick
    };
    ReactDOM.render(<Template {...props} />, this.el);
  }

  onClick(event) {
    event.preventDefault();
    event.stopPropagation();
    this.$el.addClass('is-visited');
    this.toggle();
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

    this.isOpen = shouldOpen;
    this.isVisited = true;
    this.renderButton();

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

  remove() {
    this.stopListening();
    wait.for(end => {
      ReactDOM.unmountComponentAtNode(this.el);
      super.remove();
      end();
    });
    return this;
  }

}

DropView.template = 'drop.jsx';

export default DropView;
