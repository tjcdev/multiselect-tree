$(document).ready(function() {

    $.getJSON('menu.json', function(data) {
        generateMenuFromJSON(data);
    });

    var generateMenuFromJSON = function(json) {
        var parent_menu = $('#mydropdownmenu');
        var menu_items = json;//$.parseJSON($(json)); //gets list of items in first level of menu
        generateMenu(menu_items, parent_menu); //draws the elements
    };

    var generateMenu = function(menu_items, parent_menu) {
        //loop through json in a depth first search generating the menus and submenus
        for(var i=0; i<menu_items.length; i++) {
            menu_item = menu_items[i];
            if (typeof menu_item.children.length === typeof undefined) { //deciding whether it is the end of a branch or not
                generateMenuItem(menu_item, parent_menu);
            } else {
                generateSubMenuItem(menu_item, parent_menu);
            }
        }
    };

    var generateMenuItem = function(menu_item, parent_menu) { //adds a a menu_item that DOES NOT contain a sub menu
          /*
          Example generated menu item (it has no submenu)
          <li>
              <a href="#" class="small" tabIndex="-1">
                <input type="checkbox" name="1" children='[{"name": "3.1"}, {"name": "3.2"}, {"name":"3.3"}]'> <!-- only has children attribute if it has children -->
                1
              </a>
          </li>
          */
          $(parent_menu)
                .append($('<li>')
                    .append($('<a>', { class: "small", tabIndex : "-1", href : "#" })
                        .append($('<input>', {class: "menu-checkbox", name: menu_item.name, type : "checkbox", onclick : "checkboxChanged(this)"}))
                        .append($('<span>', {text : ' ' + menu_item.name}))));
    };


    var generateSubMenuItem = function(menu_item, parent_menu) { //adds another menu_item that DOES contain a sub menu

        //construct children string
        var children = [];
        for(var i=0; i < menu_item.children.length; i++) {
            children.push('{"name":"' + menu_item.children[i].name + '"}');
        }
        var children_string = '[ ' + children.join(',') + ']';
        /*
        Example Generate HTML
        <li class="dropdown-submenu">
            <li>
                <a href="#" class="small" tabIndex="-1">
                  <input type="checkbox" name="1" children='[{"name": "3.1"}, {"name": "3.2"}, {"name":"3.3"}]'>
                  1
                </a>
            </li>
            <ul class="dropdown-menu">
                <!-- This is the submenu -->
            </ul>
        </li>
        */
        var newElem = $('<li>', {class : "dropdown-submenu"})
                          .append($('<a>', { class: "small", tabIndex : "-1", href : "#" })
                              .append($('<input>', { class: "menu-checkbox", name : menu_item.name, type : "checkbox", "data-children" : children_string, onclick : "checkboxChanged(this)"}))
                              .append($('<span>', {text: ' ' + menu_item.name})))
                          .append($('<ul>', {class : "dropdown-menu"}));

        //Bit of trickery to get the submenus working
        var tempElem = $(newElem).appendTo(parent_menu);
        var submenu = $(tempElem).find('> ul');
        generateMenu(menu_item.children, submenu);  //call the main generate_menu function with menu_items children and new parent_menu (depth first bit)
    };



});
