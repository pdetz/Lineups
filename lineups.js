$(document).ready(function(){

/*   
    let tests = ["div", "div#test1.check", "div.check#test2", "div#test3.check1.check2", "div.check1.check2#test4", "div.check1.test5.check2"];

    tests.forEach(t =>{
        //console.log(t + " : " + parseClasses(t));
        parseClasses2(t);

        $("#lineups").append(make(t).html(t));
    });
*//*
    loadTables();
*/
    $("#tools").div(".toolbox",
        new DynamicUpload(loadRoster, "Team Roster", "#rosterButton", "#rosterInput", "First, upload your Team Roster:"), 
        new DynamicUpload(loadEntries, "Meet Entries", "#entriesButton.blocked", "#entriesInput", "Then, Upload your Meet Entries"),
        new DynamicInput("#meetTitle", "#titleInput"),
        new DynamicPallete("header", "th", COLORS, 5, "Choose your table header color:"),
        new DynamicPallete("row", "tr:nth-child(odd)", COLORS, 13, "Choose your row color:"),
        //new DynamicTool(dynamicButton, PRINT + " Print Lineups", "#printButton", window.print)
        );


});