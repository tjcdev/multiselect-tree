$(".dropbtn").click(function() {
  $(this).siblings(".dropdown-content").first().toggle("show"); //this is just here for testing purposes
  //Perform Depth First Search of All Children

  //Construct List of Selected Menu Items (that have no children)
});

//selecting and highlighting clicked element and all it's submenu elements
$("input[type='checkbox']").click(function() {
    SelectChildrenOfItem(this);
    ConstructSelectList();
});

//Performs depth first search of children of menu_item
var SelectChildrenOfItem = function(menu_item) {
      //Set menu_item to be highlighted
      $(menu_item).attr('checked', true);

      var siblings = $(menu_item).siblings(".dropdown-menu");

      if($(menu_item).siblings().length > 0) { //if this has a submenu as a sibling

        var submenu = $(menu_item).siblings(".dropdown-menu").first();
        //get submenu options
        var submenus = $(submenu).find("> .checkbox > .checkbox_box");
        submenus.push($(submenu).find("> .dropdown-submenu > .checkbox_box"));
      }


      if (typeof submenus !== typeof undefined) {
        //run through all submenus and highlight them and their children (this is the depth first search bit)
        for(var i=0; i < submenus.length; i++) {
            var submenu = submenus[i];
            SelectChildrenOfItem(submenu);
        }
      }


}

var ConstructSelectList = function() {
      //array of selected Items
      var items = [];

      //Gets all menu elements that are selected AND have no children
      var selectedMenuItems = $("#multiselect-tree").find(".highlighted").toArray();
      for(i=0; i<selectedMenuItems.length; i++) {
          var menu_item = $(selectedMenuItems[i])
          if (menu_item.children().length < 1) { //if the current menu item has no submenus
              items.push($(selectedMenuItems[i]).text());
          }
      }

      console.log(items);
}
