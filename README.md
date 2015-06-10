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
