$(document).ready(function(){
    loadTables();
    $("#tools").append(

            uploadFile(UPLOAD + " Upload your .hy3 roster file", loadRoster, "#roster"),
            uploadFile(UPLOAD + " Upload your .hy3 entries file", loadEntries, "#entries").hide(),
            div(".b",   colorPicker("#th", "th", random(0,7), HEADERS),
                        colorPicker("#tr", "tr:nth-child(odd)", random(0,7), ROWS)
        )   ,
            iconPicker(random(), random()),
            printButton()
    );

    $('#about-btn').on('click', function() {
        $('#modal-container').fadeIn(300);
        $('.column').addClass('blur');
        $('.close, #modal-container').on('click', function() {
          $('#modal-container').fadeOut(300);
          $('.column').removeClass('blur');
        });
      });

});
