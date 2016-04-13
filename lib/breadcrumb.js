var privateVar;

String.prototype.capitalize = function() {
    return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};

var enrichRouteObject = function(path, isCurrent) {

    // Replace all parameters in the itemName
    var routeOptions = Router.routes[path] && Router.routes[path].options;
    var itemName = (routeOptions && routeOptions.hasOwnProperty('itemName')) ? routeOptions.itemName : Router.options.defaultBreadcrumbTitle;

    if ('function' === typeof itemName)
        itemName = _.bind(itemName, Router.current())();

    var params = Router.current().params;

    if (itemName) {

        for (var i in params) {
            itemName = itemName && itemName.replace(
                new RegExp((':'+i).replace(/\+/g, "\\+"), "g"), params[i]);
        }

        if (!Router.routes[path].options.noCaps)
            itemName = itemName && itemName.capitalize();

    } else {

        itemName = null;

    }

    if (isCurrent) {

        cssClasses = 'is-active';

    } else {

        cssClasses = '';

    }



    // Handle showlink attribute
    // 1) if set, by route,
    // 2) fallback to global flag,
    // 3) fallback to default value which is true
    var showLink = true;

    if (typeof Router.routes[path].options.showLink !== 'undefined') {

        showLink = Router.routes[path].options.showLink;

    } else if(typeof Router.options.defaultBreadcrumbLastLink !== 'undefined' && isCurrent) {

        showLink = Router.options.defaultBreadcrumbLastLink;

    }

    if (itemName) return {
        'path': path,
        'params': params,
        'itemName': itemName,
        'showLink': showLink,
        'cssClasses': cssClasses,
        'url': Router.routes[path].path(Router.current().params),
        'route': Router.routes[path]
    };

}

var getAllParents = function() {

    if(Router.current().route) {

        var current = Router.current().route.getName();
        var parent = Router.current().route.options.hasOwnProperty('parent') ? Router.current().route.options.parent : Router.options.parent;

        if ('function' === typeof parent)
            parent = _.bind(parent, Router.current())()

            if (parent) {

                return getParentParent([enrichRouteObject(current,true),enrichRouteObject(parent)]);

            } else {

                return [enrichRouteObject(current)];

            }

    } else {

        // No routes have been specified
        return [];

    }

}

// Parents must be always an array
var getParentParent = function(parents) {

    var lastParent = parents[parents.length-1];

    if (newParent = (lastParent && Router.routes[lastParent.path].options.parent)) {

        if ('function' === typeof newParent)
            newParent = _.bind(newParent, Router.current())()
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