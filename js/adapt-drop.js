define([ "core/js/adapt" ], function(Adapt) {

  var DropView = Backbone.View.extend({

    $content: null,

    className: function() {
      var classes = "drop";
      var modelClasses = this.model.get("_drop")._classes;

      if (modelClasses) classes += " " + modelClasses;

      return classes;
    },

    initialize: function(options) {
      this.$content = options.$content;
      this.listenTo(Adapt, "remove", this.remove).render();
    },

    events: {
      "click .js-toggle-view": "onClick"
    },

    render: function() {
      var template = Handlebars.templates.drop;
      var data = this.model.get("_drop");

      this.$el.html(template(data)).appendTo(this.$content.parent());
      this.$content.addClass("drop__content").appendTo(this.$el).hide();
      this.setChildrenVisibility(false);
    },

    onClick: function() {
      this.$el.addClass("is-visited");
      this.toggle();

      return false;
    },

    setChildrenVisibility: function(isVisible) {
      this.model.getChildren().each(function(child) {
        child.setOnChildren("_isVisible", isVisible, { pluginName: "_drop" });
      });
    },

    toggle: function() {
      var shouldOpen = !this.$el.hasClass("is-open");

      this.$el.toggleClass("is-open", shouldOpen);
      this.$(".drop__btn").first().attr("aria-expanded", shouldOpen);

      this.$content.stop().slideToggle({
        start: (shouldOpen ? this.onOpen : this.onClose).bind(this),
        done: (shouldOpen ? this.onOpened : this.onClosed).bind(this)
      });
    },

    onOpen: function() {
      $(window).trigger("resize");
      Adapt.trigger("device:resize");
      this.setChildrenVisibility(true);
    },

    onOpened: function() {
      this.$content.a11y_focus();
    },

    onClose: function() {},

    onClosed: function() {
      this.setChildrenVisibility(false);
    }

  });

  Adapt.once("app:dataReady", function() {
    var views = [ "menu", "page", "article", "block", "component" ];
    var eventList = views.map(function(view) { return view + "View:postRender"; });

    Adapt.on(eventList.join(" "), function(view) {
      var model = view.model;
      var config = model.get("_drop");

      if (config && config._isEnabled) {
        new DropView({ model: model, $content: view.$el.children().first() });
      }
    });
  });

});
