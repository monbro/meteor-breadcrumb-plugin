meteor-breadcrumb-plugin
========================

This package will provide a easy way to add a breadcrumb with enough flexibility to your project.

# Demo: http://meteor-breadcrumb-plugin-basic-example.meteor.com

# Dependencies

* Iron-Router >1.0
* Meteor >1.0

# Compatibility

* works out of the box with bootstrap3
* use the pre existing template or use your own

# Installation

Use `meteor add monbro:iron-router-breadcrumb` to add the package to your meteor app

# Usage

* You need to add two parameters to your iron routes which are `parent` and `title`

## 1. Example Iron Route with multiple levels

### In this example the Breadcrumb would look or the url `/dashboard/analytics/books` like: `Dashboard / Analytics / Category Books`

```
// Level 0
Router.route('/', {
  name: 'dashboard',
  template: 'dashboard',
  title: 'Dashboard'
});

// Level 1
Router.route('/dashboard/analytics', {
  name: 'dashboard.analytics',
  template: 'dashboardAnalytics',
  parent: 'dashboard', // this should be the name variable of the parent route
  title: 'Analytics'
});

// Level 2
Router.route('/dashboard/analytics/books', {
  name: 'dashboard.analytics.books',
  template: 'dashboardAnalyticsBooks',
  parent: 'dashboard.analytics', // this should be the name variable of the parent route
  title: 'Category Books'
});
```

## 2. Example Dynamic Iron Route

### In this example the Breadcrumb would look for the url `/post/hello-world` like: `Home / Blogpost Hello-World`

```
Router.route('/', {
  name: 'home',
  template: 'home',
  title: 'Home'
});

Router.route('/post/:_name', {
  name: 'post',
  template: 'singleBlogPost',
  parent: 'home', // this should be the name variable of the parent route
  title: 'Blogpost :_name' // the variable :_name will be automatically replaced with the value from the url
});
```

## Example custom template for navigation

### Please note, that you dont have to use a custom template with the name `breadcrumb`, you can use the existing one out of the box by simply using `{{> breadcrumb}}` to include the preexisting template (which looks exact like the following example) anywhere in your own templates.

```
<template name="breadcrumb">
    <ol class="breadcrumb">
        {{#each Breadcrumb}}
            <li class="{{cssClasses}}"><a href="{{url}}">{{title}}</a></li>
        {{/each}}
    </ol>
</template>
```

## Example access of the breadcrumb in Javascript

```
if (Meteor.is_client) {
  Template.analytics.rendered = function(){
    console.log(Breadcrumb.getAll()); // you can access the breadcrumb objects in a template helper as well
  }
}
```