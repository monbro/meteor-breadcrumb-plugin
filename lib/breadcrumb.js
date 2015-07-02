/* Package-scope variables */
var privateVar;

String.prototype.capitalize = function() {
    return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};

var enrichRouteObject = function(path, isCurrent) {
    // replace all parameters in the title
    var title = Router.routes[path].options.title || Router.options.title;
    if ('function' === typeof title)
    	title = title();
    var params = Router.current().params;
    if (title) {
        for (var i in params) {
            title = title && title.replace(
                new RegExp((':'+i).replace(/\+/g, "\\+"), "g"), params[i]);
        }
        if (!Router.routes[path].options.noCaps)
			title = title && title.capitalize();
    } else {
        title = null;

    }

    if(isCurrent) {
        cssClasses = 'active';
    } else {
        cssClasses = '';
    }

    if (title) return {
        'path': path,
        'params': params,
        'title': title,
        'cssClasses': cssClasses,
        'url': Router.routes[path].path(Router.current().params),
        'route': Router.routes[path]
    }
}

var getAllParents = function() {
    if(Router.current().route) {
      var current = Router.current().route.getName();
      var parent = Router.current().route.options.parent || Router.options.parent;
      if(parent) {
          return getParentParent([enrichRouteObject(current,true),enrichRouteObject(parent)]);
      } else {
          return [enrichRouteObject(current)];
      }
    } else {
      // no routes have been specified
      return [];
    }

}

// parents must be always an array
var getParentParent = function(parents) {
    if(newParent = Router.routes[parents[parents.length-1].path].options.parent) {
        parents.push(enrichRouteObject(newParent))
        return getParentParent(parents);
    } else {
        return parents;
    }
}

Breadcrumb = {
  getAll: function() {
    return _.compact(getAllParents()).reverse();
  }
};

UI.registerHelper('Breadcrumb', function(template) {
  return Breadcrumb.getAll();
});
