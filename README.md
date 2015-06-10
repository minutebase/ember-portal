# Ember-portal

Render stuff here, put it over there.

[Demo](http://minutebase.github.io/ember-portal)

## Installation

```
ember install ember-portal
```

## Basic Usage

Setup some portals in your application template, or wherever:

```hbs
{{! app/templates/application.hbs }}

<div class="header">
  {{portal-for name="header"}}
</div>

<div class="content">
  {{outlet}}
</div>

<div class="footer">
  {{portal-for name="footer"}}
</div>
```

These will be empty until you give them some content from some other template:

```hbs
{{! app/templates/foo.hbs }}

{{#portal-content for="header"}}
  This will appear in the header
{{/portal-content}}
```

If you render to the same portal in a deeper template, it will replace the
previous content:

```hbs
{{! app/templates/foo/bar/baz.hbs }}

{{#portal-content for="header"}}
  This will replace the header content
{{/portal-content}}
```

## DOM Layout

ember-portal uses [ember-wormhole](https://github.com/yapplabs/ember-wormhole) and manages the DOM element it needs to render the child elements into.

Given the following template:

```hbs
<div class="header">
  {{portal-for name="header"}}
</div>

{{portal-content for="header"}}
  <div class="content">the content</div>
{{/portal-content}}
```

It will result in the following HTML:

```html
<div class="header">
  <div class="ember-view"> <!-- {{portal-for component}} -->
    <div id="ember-portal--header"> <!-- ember-wormhole container -->
      <div class="content">the content</div> <!-- the content -->
    </div>
  </div>
</div>
```

The `{{portal-for}}` component takes `class` and `portal-class` attributes to add class names for styling, for example:

```hbs
<div class="header">
  {{portal-for name="header" class="header-outer" portal-class="header-inner"}}
</div>

{{portal-content for="header"}}
  <div class="content">the content</div>
{{/portal-content}}
```

It will result in the following HTML:

```html
<div class="header">
  <div class="ember-view header-outer"> <!-- {{portal-for component}} -->
    <div id="ember-portal--header" class="header-inner"> <!-- ember-wormhole container -->
      <div class="content">the content</div> <!-- the content -->
    </div>
  </div>
</div>
```

## Developing

### Installation

* `git clone` this repository
* `npm install`
* `bower install`

### Running

* `ember server`
* Visit your app at http://localhost:4200.

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
