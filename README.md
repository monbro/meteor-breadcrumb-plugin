iron-router-breadcrumb package
==============================

This [meteor package](http://atmospherejs.com/monbro/iron-router-breadcrumb) will provide an easy way to add a breadcrumb with some flexibility

# Demo and Examples

* Simple Example [demo](http://meteor-breadcrumb-plugin-simple-example.meteor.com), on [github](https://github.com/monbro/meteor-breadcrumb-plugin/tree/master/examples/simple)
* Advanced Example [demo](http://meteor-breadcrumb-plugin-advanced-example.meteor.com), on [github](https://github.com/monbro/meteor-breadcrumb-plugin/tree/master/examples/advanced)

# Dependencies

* Iron-Router >1.0
* Meteor >1.0

# Compatibility

* works out of the box with bootstrap3
* use the pre existing breadcrumb template or use your own easily

# Installation

Use `meteor add monbro:iron-router-breadcrumb` to add the package to your meteor app

# Usage

* You need to add two parameters to your iron routes which are `parent` and `title`
* Set `noCaps = true` to disable title capitalization

### 1. Example iron route with multiple levels

In this example the Breadcrumb would look or the url `/dashboard/analytics/books` like: `Dashboard / Analytics / Category Books`

```
// Configure a default flags
// * title (optional)
// * show last item with link
Router.configure({
  defaultBreadcrumbTitle: 'My Default Title',
  defaultBreadcrumbLastLink: true
});

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
  title: 'Analytics',
  showLink: false // will not link this item in the breadcrumb ever
});

// Level 2
Router.route('/dashboard/analytics/books', {
  name: 'dashboard.analytics.books',
  template: 'dashboardAnalyticsBooks',
  parent: 'dashboard.analytics', // this should be the name variable of the parent route
  title: 'Category Books'
});
```

### 2. Example dynamic iron route

In this example the Breadcrumb would look for the url `/post/hello-world` like: `Home / Blogpost Hello-World`

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

### 3. Example using a function for the title

In this example the Breadcrumb would look for the url `/post/hello-world` like: `Home / Blogpost Hello-World`

```
Router.route('/', {
  name: 'home',
  template: 'home',
  title: 'Home'
});

Router.route('/post/:_name', {
  name: 'post',
  parent: 'home', // this should be the name variable of the parent route
  template: 'singleBlogPost',
  data: {
    firstname: 'Gandalf',
    lastname: 'the Grey'
  },
  title: function() {
    // using a function to generate the title dynamically
    var data = this.data();
    console.log('Our data object for this route:');
    console.log(data);
    console.log('');
    console.log('all given parameters for this route:');
    console.log(this.params);
    return 'Dynamic Title for '+data.firstname+' for post: '+this.params['_name'];
  }
});

// a more simple example
Router.route('/function-title', {
  name: 'function.title',
  parent: 'home',
  template: 'functiontitle',
  title: function() {
    return 'By-Function-Retuned';
  }
});
```

### 4. Example using a custom template for the breadcrumb

Please note, that you dont have to use a custom template with the name `breadcrumb`, you can use the existing one out of the box by simply using `{{> breadcrumb}}` to include the preexisting template (which looks exact like the following example) anywhere in your own templates.

```
<template name="breadcrumb">
    <ol class="breadcrumb">
        {{#each Breadcrumb}}
            <li class="{{cssClasses}}">
            {{#if showLink}}
                <a href="{{url}}">{{title}}</a>
            {{else}}
                {{title}}
            {{/if}}
            </li>
        {{/each}}
    </ol>
</template>
```

### 5. Example on how to access the breadcrumb object on the client

```
if (Meteor.is_client) {
  Template.analytics.rendered = function(){
    console.log(Breadcrumb.getAll()); // you can access the breadcrumb objects in a template helper as well
  }
}
```
