
$(document).ready(function () {

    var config = {
        apiKey: "AIzaSyCz1klXTgJ30ADLn2DQSD-oIEyU2BBWaZY",
        authDomain: "current-train-schedule.firebaseapp.com",
        databaseURL: "https://current-train-schedule.firebaseio.com",
        projectId: "current-train-schedule",
        storageBucket: "current-train-schedule.appspot.com",
        messagingSenderId: "603429156588"
      };
      firebase.initializeApp(config);

       database = firebase.database();

       var name ="";
       var destination = "";
       var firstArrival = "";
       var frequency = "";

    $("#submitButton").on("click", function (event) {

        event.preventDefault();

        name = $("#trainNameInput").val().trim();
        destination = $("#destinationInput").val().trim();
        firstArrival = $("#firstTrainTimeInput").val().trim();
        frequency = $("#frequencyInput").val().trim();

        trainFirebaseData = {
            DatatrainName: name,
            Datadest: destination,
            DatafirstArrival: firstArrival,
            Datafrequency: frequency,
            TimeStamp: firebase.database.ServerValue.TIMESTAMP
        };

        database.ref().push(trainFirebaseData);

        clear();

    });

    database.ref().on("child_added", function (childSnapshot) {
        var snapName = childSnapshot.val().DatatrainName;
        var snapDest = childSnapshot.val().Datadest;
        var snapFreq = childSnapshot.val().Datafrequency;
        var snapArrival = childSnapshot.val().DatafirstArrival;

        
        $("#table-info").append("<tr><td>" + snapName +"</td><td>" + snapDest + "</td><td>" + snapFreq + "</td><td>");
    
    });

    function clear() {
        $("#trainNameInput").val("");
        $("#destinationInput").val("");
        $("#firstTrainTimeInput").val("");
        $("#frequencyInput").val("");
    }
  
});

