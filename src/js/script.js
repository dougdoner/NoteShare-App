$(".itemAdd").on("submit", function(e) {
    var $this = $(this);
    var input = $this.find("input");
    $.ajax({
        url: input.data("noteId"),
        data: {itemName: input.val()}
    })
    .done(function(data) {
        console.log(data);
    })
    .fail(function() {
        console.log("failure!");
    });
    e.preventDefault();
});
