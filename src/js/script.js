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
        var lastId = Number($(".notes").find("li:last").attr("class"));
        lastId += 1;
        $(".notes").append("<li class=" + lastId + ">" + data.item.name + "</li>");
    })
    .fail(function() {
        console.log("failure!");
    });
    e.preventDefault();
});
