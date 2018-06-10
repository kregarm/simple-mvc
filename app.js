var collection = [
    {
        name: "cat 1",
        imageUrl: "https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&h=350",
        clickCount: 0,
        id: 5
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
        if (collection.length !== 0){
            view.renderList(collection)
            view.renderCat(0)
        } else {
            view.showAlert("There are no cats in the collection")
        }
    },
    countAddOne: function(catId){
        cat = controller.catInCollection(catId)
        cat["clickCount"] ++
        view.updateCount(catId)
    },
    updateCat: function(catId){
        cat = controller.catInCollection(catId)
        if (controller.catInCollection(catId) === true) {
            collection[catId]["name"] = $("#newName").val()
            collection[catId]["imageUrl"] = $("#newImageUrl").val()
            collection[catId]["clickCount"] = $("#newNumberOfClicks").val()
            
            view.closeAdmin()
            view.renderCat(catId)
        }
    },
    catInCollection: function(catId){
        for (cat in collection){
            if (catId == collection[cat]["id"]){
                return collection[cat]
            }
        }
        view.showAlert("Cat doesn't exist!")
    }
}

var view = {
    renderList: function(collection){
        for (cat in collection){
            $(".collection").append('<a href="#!" class="collection-item" onClick="view.renderCat(' + collection[cat]["id"] + ')">' + collection[cat]["name"] + '</a>')
        }
    },
    renderCat: function(catNumber){

        if ($("#catContent").children().length != 0) {
            $("#catContent").children().remove()
        }

        $("#catContent").append(`
        <div class="card">
            <div class="card-image" onclick="controller.countAddOne(`+ collection[catNumber]["id"] +`)">
                <img src=` + collection[catNumber]["imageUrl"] + `>
                <span class="card-title">` + collection[catNumber]["name"] + `</span>
            </div>
            <div class="card-content">
                <p>`+ "number of clicks is " + `<span id="count"> ` + collection[catNumber]["clickCount"] + `</span></p>
            </div>
            <div class="card-action">
                <a href="#" id="editButton" onClick="view.displayAdmin(` + collection[catNumber]["id"] + `)">Edit</a>
            </div>
        </div>`)

    },
    displayAdmin: function(catId){

        $("#editButton").remove()
        
        $(".card-content").append(`
        <div class=adminArea>
            </br>
            <label for="newName"> Cat's name </label>
            <input type="text" id="newName" value=` + collection[catId]["name"] + `>
            <label for="newImageUrl"> Image url </label>
            <input type="text" id="newImageUrl" value=` + collection[catId]["imageUrl"] + `>
            <label for="newNumberOfClicks"> Clicks </label>
            <input type="text" id="newNumberOfClicks" value=` + collection[catId]["clickCount"] + `>
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
        $("#count").text(collection[catId]["clickCount"])
    },
    showAlert: function(message){
        alert(message)
    }
}
controller.init()
