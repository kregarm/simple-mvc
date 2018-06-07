var model = [
    {
        name: "cat 1",
        imageUrl: "https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&h=350",
        clickCount: 0,
        id: 0
    },
    {
        name: "cat 2",
        imageUrl: "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
        clickCount: 0,
        id: 1
    }
];

var controller = {
    countAddOne: function(catId){
        for (cat in model){
            if(catId == model[cat]["id"]){
                model[cat]["clickCount"] ++
                view.updateCount(catId)
            }
        }
    }
}

var view = {
    renderList: function(model){
        for (cat in model){
            $(".collection").append('<a href="#!" class="collection-item" onclick="view.renderCat(' + model[cat]["id"] + ')">' + model[cat]["name"] + '</a>')
        }
    },
    renderCat: function(catId){

        if ($("#catContent").children().length != 0) {
            $("#catContent").children().remove()
        }

        for (cat in model){
            if(catId == model[cat]["id"]){
                $("#catContent").append(`
                <div class="card">
                    <div class="card-image" onclick="controller.countAddOne(`+model[cat]["id"]+`)">
                        <img src=` + model[cat]["imageUrl"] + `>
                        <span class="card-title">` + model[cat]["name"] + `</span>
                    </div>
                    <div class="card-content">
                        <p>`+ "number of clicks is " + `<span id="count"> ` + model[cat]["clickCount"] + `</span></p>
                    </div>
                </div>`)
            }
        }
    },
    updateCount: function(catId){
        $("#count").text(model[catId]["clickCount"])
    }
}

view.renderList(model)
