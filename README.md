
# Usage

[Download latest release](https://github.com/foto-andreas/leaflet-control-textinput/releases).

Add the control to a map instance:

```javascript
var map = L.map('map').setView([0, 0], 2);
L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
L.Control.textinput().addTo(map);
```

# Customizing

By default, when a textinput is done, the control's `textinput`
event is emitted.

For example:

```javascript
var textinput = L.Control.textinput({
})
  .on('textinput', function(e) {
    console.log(e.text);
  })
  .addTo(map);
```

# API

## L.Control.Textinput

This is the textinput control. It works like any other Leaflet control, and is added to the map.

### Constructor

This plugin supports the standard JavaScript constructor (to be invoked using `new`) as well as the [class factory methods](https://leafletjs.com/reference.html#class-class-factories) known from Leaflet:

```js
new L.Control.Textinput(options);
// or
L.Control.textinput(options);
```

### Options

| Option             | Type      | Default                              | Description                                                                                                   |
| ------------------ | --------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| `collapsed`        | Boolean   | `true`                               | Collapse control unless hovered/clicked                                                                       |
| `expand`           | String    | `"touch"`                            | How to expand a collapsed control: `touch` or `click` or `hover`                                              |
| `position`         | String    | `"topright"`                         | Control [position](https://leafletjs.com/reference.html#control-positions)                                    |
| `placeholder`      | String    | `"URL..."`                        | Placeholder text for text input                                                                               |
| `text`            | String    | `""`                                 | Initial query string for text input                                                                           |

### Methods

| Method                                  | Returns | Description                             |
| --------------------------------------- | ------- | --------------------------------------- |
| `setText(<String> text)`              | `this`  | Sets the text on the input |

