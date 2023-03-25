$(document).ready(function(){
    loadTables();
    $("#tools").append(

            uploadFile(UPLOAD + " Team Roster", loadRoster, "#roster"),
            uploadFile(UPLOAD + " Meet Entries", loadEntries, "#entries").hide(),
div(".b",   colorPicker("#th", "th", 5, HEADERS),
            colorPicker("#tr", "tr:nth-child(odd)", 5, ROWS)
        ),
            iconPicker(0, 36),
            printButton()
    );
});