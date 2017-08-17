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
        //loop through json in a depth first way generating content
        for(var i=0; i<menu_items.length; i++) {
            menu_item = menu_items[i];
            if (typeof menu_item.children.length === typeof undefined) { //deciding whether it is the end of a branch or not
                generateMenuItem(menu_item, parent_menu);
            } else {
                generateSubMenuItem(menu_item, parent_menu);
            }
        }
    };

    var generateSubMenuItem = function(menu_item, parent_menu) {

        //construct children string
        if (typeof menu_item.children.length !== typeof undefined) {
            var children = [];
            for(var i=0; i < menu_item.children.length; i++) {
                children.push('{"name":"' + menu_item.children[i].name + '"}');
            }
            var children_string = '[ ' + children.join(',') + ']';

        } else {
          console.log("hit");
        }
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
        $(parent_menu)
            .append($('<li>', {class : "dropdown-submenu"})
                .append($('<a>', { class: "small", tabIndex : "-1", href : "#" })
                    .append($('<input>', { class: "menu-checkbox", name : menu_item.name, type : "checkbox", "data-children" : children_string, onclick : "checkboxChanged(this)"})))
                .append($('<ul>', {id: 'ul_' + menu_item.name.replace(/\s/g, ''), class : "dropdown-menu"})));

        //set new parent to be the sub_menu (using the name attribute)
        // TODO: the issues that were arising was with the selection of the parent element for Sector2 (it was selecting sector1)
        // this was fixed but with a hack in the JSON - I need to replace the var submenu=$(submenu_id) line with something that will work indepenet of json
        // e.g. something saving the <ul> element as it is made above and then putting that through as the sub menu
        if (typeof menu_item.children.length !== typeof undefined) {
            var submenu_id = '#ul_' + menu_item.name.replace(/\s/g, '');
            var submenu = $(submenu_id);
            generateMenu(menu_item.children, submenu);  //call the main generate_menu function  with new menu items and new parent_menu (depth first bit)
        }

    };

    var generateMenuItem = function(menu_item, parent_menu) { //adds a new menu_item to the parent_menu
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
                        .append($('<input>', {class: "menu-checkbox", name: menu_item.name, type : "checkbox", onclick : "checkboxChanged(this)"}))));
    };

});
