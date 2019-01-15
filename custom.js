var outText = [];

function readTextFile(file) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                let allText = rawFile.responseText;
                outText = JSON.parse(allText);
                console.log(outText);
            }
        }
    };
    rawFile.send(null);
}
readTextFile("contacts_file.json");

function toogleClass(){
    $('.Right').toggleClass("hidden");
    $(".Left").toggleClass("hidden");

};

var app = angular.module("allContacts", []);
app.controller("myManage", function($scope) {
        $scope.name = outText;
        $scope.editMode = false;
        $scope.closeMode = true;
        $scope.close = function () {
            $scope.closeMode = true;
            toogleClass();
            $scope.selected = -1;
         };
        $scope.setValue = function(item, index){
            $('.editable').attr("readonly", true);
            toogleClass();
            $scope.selected = index;
            $scope.firstName = item["First Name"];
            $scope.lastName = item["Last Name"];
            $scope.disName = item["Display Name"];
            $scope.email = item["E-mail Address"];
            $scope.emailOne = item["E-mail 2 Address"];
            $scope.emailTwo = item["E-mail 3 Address"];
            $scope.number = item["Home Phone"];
            $scope.numberOne = item["Mobile Phone"];
            $scope.notes= item["Notes"];
            $scope.editMode = false;
            $scope.closeMode = false;
        };
        $scope.save = function() {
            $('.editable').attr("readonly", true);
            $scope.editMode = false;
            var contactToEdit = outText.find(x => x["Display Name"] === $scope.disName);
            contactToEdit["First Name"] = $scope.firstName;
            contactToEdit["Last Name"] = $scope.lastName;
            contactToEdit["E-mail Address"] = $scope.email;
            contactToEdit["E-mail 2 Address"] = $scope.emailOne;
            contactToEdit["E-mail 3 Address"] = $scope.emailTwo;
            contactToEdit["Home Phone"] = $scope.number;
            contactToEdit["Mobile Phone"] = $scope.numberOne;
            contactToEdit["Notes"] = $scope.notes;
        };
        $scope.edit = function(){
            $scope.editMode = true;
            $('.editable').attr("readonly", false);
        };

});


