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
    init: function(){
        view.renderList(model)
        view.renderCat(0)
    },
    countAddOne: function(catId){
        for (cat in model){
            if(catId == model[cat]["id"]){
                model[cat]["clickCount"] ++
                view.updateCount(catId)
            }
        }
    },
    updateCat: function(catId){
        model[catId]["name"] = $("#newName").val()
        model[catId]["imageUrl"] = $("#newImageUrl").val()
        model[catId]["clickCount"] = $("#newNumberOfClicks").val()
        
        view.closeAdmin()
        view.renderCat(catId)
    }
}

var view = {
    renderList: function(model){
        for (cat in model){
            $(".collection").append('<a href="#!" class="collection-item" onClick="view.renderCat(' + model[cat]["id"] + ')">' + model[cat]["name"] + '</a>')
        }
    },
    renderCat: function(catId){

        if ($("#catContent").children().length != 0) {
            $("#catContent").children().remove()
        }

        $("#catContent").append(`
        <div class="card">
            <div class="card-image" onclick="controller.countAddOne(`+ catId +`)">
                <img src=` + model[catId]["imageUrl"] + `>
                <span class="card-title">` + model[catId]["name"] + `</span>
            </div>
            <div class="card-content">
                <p>`+ "number of clicks is " + `<span id="count"> ` + model[catId]["clickCount"] + `</span></p>
            </div>
            <div class="card-action">
                <a href="#" id="editButton" onClick="view.displayAdmin(` + model[catId]["id"] + `)">Edit</a>
            </div>
        </div>`)

    },
    displayAdmin: function(catId){

        $("#editButton").remove()
        
        $(".card-content").append(`
        <div class=adminArea>
            </br>
            <label for="newName"> Cat's name </label>
            <input type="text" id="newName" value=` + model[catId]["name"] + `>
            <label for="newImageUrl"> Image url </label>
            <input type="text" id="newImageUrl" value=` + model[catId]["imageUrl"] + `>
            <label for="newNumberOfClicks"> Clicks </label>
            <input type="text" id="newNumberOfClicks" value=` + model[catId]["clickCount"] + `>
        </div> `)

        $(".card-action").append(`<a id="save" onClick="controller.updateCat(` + catId + `)" href="#">Save</a>`)
        $(".card-action").append(`<a id="close" onClick="view.closeAdmin(` + catId + `)" href="#">Close</a>`)
    },
    closeAdmin: function(catId){
        $(".adminArea").remove()
        $("#save").remove()
        $("#close").remove()
        $(".card-action").append(`
            <a href="#" id="editButton" onClick="view.displayAdmin(` + catId + `)">Edit</a>
        `)
    },
    updateCount: function(catId){
        $("#count").text(model[catId]["clickCount"])
    }
}
controller.init()