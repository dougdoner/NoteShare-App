$(".itemAdd").on("submit", function(e) {
    var $this = $(this);
    var input = $this.find("input");
    var listId = input.data("id");
    $.ajax({
        url:  "/note/" + input.data("id") + "/create",
        type: "POST",
        data: {
            itemName: input.val(),
            id: listId
        }
    })
    .done(function(data) {
        console.log(data);
    })
    .fail(function() {
        console.log("failure!");
    });
    e.preventDefault();
});

var item = new ItemModel({
    name: "Do laundry",
    contents: "bring detergent",
    noteId: 2
});

item.create(function(err) {
    if (err) {
        return console.log(err);
    }
    console.log("item created");
});
