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

      if (typeof $(menu_item).attr('children') !== typeof undefined && $(menu_item).attr('children') !== false) {  //if this checkbox has children

          var children_names = $.parseJSON($(menu_item).attr('children')); //get list of childrens names
          var children = []; //the array that will hold the children dom elements

          //get actual children dom elements
          for (var i=0; i < children_names.length; i++) {
              var child_elem = $('#mydropdown').find('[name="' + children_names[i].name + '"]');
              children.push(child_elem);
          }
      }

      if (typeof children !== typeof undefined) {
          for(var i=0; i < children.length; i++) {
              var child = children[i];
              SelectChildrenOfItem(child); //gooes one level deeper to see if this dom element also has children
          }
      }
}

var ConstructSelectList = function() { //constructs list of all selected elements that DO NOT have children (because we don't want to inclue elements with children in the list)
      var selectItems = [];

      //Gets all menu elements that are selected AND have no children
      var selectedMenuItems = $("#mydropdown").find(":highlighted").toArray();
      for(i=0; i<selectedMenuItems.length; i++) {
          var menu_item = $(selectedMenuItems[i])
          if (menu_item.children().length < 1) { //if the current menu item has no submenus
              selectItems.push($(selectedMenuItems[i]).text());
          }
      }

      console.log(selectItems);
}
