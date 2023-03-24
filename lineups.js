$(document).ready(function(){

/*   
    let tests = ["div", "div#test1.check", "div.check#test2", "div#test3.check1.check2", "div.check1.check2#test4", "div.check1.test5.check2"];

    tests.forEach(t =>{
        //console.log(t + " : " + parseClasses(t));
        parseClasses2(t);

        $("#lineups").append(make(t).html(t));
    });
*/
    loadTables();

    loadTools();

    attachHandlers();
  
});