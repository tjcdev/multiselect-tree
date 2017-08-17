$(document).ready(function() {

    $.getJSON('menu.json', function(data) {
        generateMenuFromJSON(data);
    });

    var generateMenuFromJSON = function(json) {
        var parent_menu = $('#mydropdownmenu'); //sets starting point for menu

        var menu_items = json;//$.parseJSON($(json)); //gets list of items in first level of menu

        generateMenu(menu_items, parent_menu); //draws the elements
    };

    var generateMenu = function(menu_items, parent_menu) {
        //loop through json in a depth first way generating content depth first
        for(var i=0; i<menu_items.length; i++) {
            menu_item = menu_items[i];
            if (typeof menu_item.children.length === typeof undefined) {
                generateMenuItem(menu_item, parent_menu);
            } else {
                generateSubMenuItem(menu_item, parent_menu);
            }
        }
    };

    var generateSubMenuItem = function(menu_item, parent_menu) {
        console.log(menu_item.name);
        $(parent_menu)
            .append($('<li>')
                .append($('<a>')
                    .append('<input>', {"name" : menu_item.name}))
                  .append($('<ul>')));

        //call the main generate_menu function  with new menu items and new parent_menu (depth first bit)
        //set new parent to be the sub_menu (using the name attribute)
        var submenu = $(parent_menu).find('> li > ul');

        generateMenu(menu_item.children, submenu);
    };

    var generateMenuItem = function(menu_item, parent_menu) { //adds a new menu_item to the parent_menu
        console.log(menu_item.name);
          $(parent_menu)
                .append($('<li>')
                    .append($('<a>')
                        .append('<input>', {"name" : menu_item.name})));
    };

});
