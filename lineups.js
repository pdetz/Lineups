$(document).ready(function(){
    loadTables();
    $("#tools").append(

            uploadFile(UPLOAD + " Upload your .hy3 roster file", loadRoster, "#roster"),
            uploadFile(UPLOAD + " Upload your .hy3 entries file", loadEntries, "#entries").hide(),
            div(".b",   colorPicker("tr:first-child", random(0,7), HEADERS),
                        colorPicker("tbody", random(0,7), ROWS)
        )   ,
            iconPicker(random(), random()),
            printButton()
    );
    cells = $("td.swim");
    setInterval(() => {
      cells.each((index, cell) => {
        console.log(cell);
        const shouldHide = Math.random() < 0.5;
        $(index).toggleClass("swim");
        $("button.palette.swim.sel").click();
      });
    }, Math.floor(Math.random() * 400) + 100);


    $('#about-btn').on('click', function() {
        $('#modal-container').fadeIn(300);
        $('.column').addClass('blur');
        $('.close, #modal-container').on('click', function() {
          $('#modal-container').fadeOut(300);
          $('.column').removeClass('blur');
        });
      });

});
