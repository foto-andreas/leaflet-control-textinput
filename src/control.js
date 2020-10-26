import L from 'leaflet';

export var Textinput = L.Control.extend({
  options: {
    collapsed: true,
    expand: 'touch', // options: touch, click, anythingelse
    position: 'topright',
    placeholder: 'Eingabe',
    iconLabel: 'Eingabe beginnen...'
  },

  includes: L.Evented.prototype || L.Mixin.Events,

  initialize: function(options) {
    L.Util.setOptions(this, options);
  },

  onAdd: function(map) {
    var className = 'leaflet-control-textinput',
      container = L.DomUtil.create('div', className + ' leaflet-bar'),
      icon = L.DomUtil.create('button', className + '-icon', container),
      form = (this._form = L.DomUtil.create('div', className + '-form', container)),
      input;

    this._map = map;
    this._container = container;

    icon.innerHTML = '&nbsp;';
    icon.type = 'button';
    icon.setAttribute('aria-label', this.options.iconLabel);

    input = this._input = L.DomUtil.create('input', '', form);
    input.type = 'text';
    input.value = this.options.query || '';
    input.placeholder = this.options.placeholder;
    L.DomEvent.disableClickPropagation(input);

    L.DomEvent.addListener(input, 'keydown', this._keydown, this);
    L.DomEvent.addListener(
      input,
      'blur',
      function() {
        if (this.options.collapsed && !this._preventBlurCollapse) {
          this._collapse();
        }
        this._preventBlurCollapse = false;
      },
      this
    );

    if (this.options.collapsed) {
      if (this.options.expand === 'click') {
        L.DomEvent.addListener(
          container,
          'click',
          function(e) {
            if (e.button === 0 && e.detail !== 2) {
              this._toggle();
            }
          },
          this
        );
      } else if (this.options.expand === 'touch') {
        L.DomEvent.addListener(
          container,
          L.Browser.touch ? 'touchstart mousedown' : 'mousedown',
          function(e) {
            this._toggle();
            e.preventDefault(); // mobile: clicking focuses the icon, so UI expands and immediately collapses
            e.stopPropagation();
          },
          this
        );
      } else {
        L.DomEvent.addListener(container, 'mouseover', this._expand, this);
        L.DomEvent.addListener(container, 'mouseout', this._collapse, this);
        this._map.on('movestart', this._collapse, this);
      }
    } else {
      this._expand();
      if (L.Browser.touch) {
        L.DomEvent.addListener(
          container,
          'touchstart',
          function() {
            this._textinput();
          },
          this
        );
      } else {
        L.DomEvent.addListener(
          container,
          'click',
          function() {
            this._textinput();
          },
          this
        );
      }
    }

    L.DomEvent.disableClickPropagation(container);

    return container;
  },

  setText: function(string) {
    this._input.value = string;
    return this;
  },

  _textinput: function() {
    this.fire('textinput', { text: this._input.value });
  },

  _toggle: function() {
    if (L.DomUtil.hasClass(this._container, 'leaflet-control-textinput-expanded')) {
      this._collapse();
    } else {
      this._expand();
    }
  },

  _expand: function() {
    L.DomUtil.addClass(this._container, 'leaflet-control-textinput-expanded');
    this._input.select();
    this.fire('expand');
  },

  _collapse: function() {
    L.DomUtil.removeClass(this._container, 'leaflet-control-textinput-expanded');
    L.DomUtil.removeClass(this._container, 'leaflet-control-textinput-options-open');
    this._input.blur(); // mobile: keyboard shouldn't stay expanded
    this.fire('collapse');
  },

  _keydown: function(e) {
    var _this = this;

    switch (e.keyCode) {
      // Escape
      case 27:
        if (this.options.collapsed) {
          this._collapse();
        } else {
          this._clearResults();
        }
        break;
      // Enter
      case 13:
        this._textinput();
        break;
      default:
        return;
    }

    L.DomEvent.preventDefault(e);
  }

});

export function textinput(options) {
  return new Textinput(options);
}
