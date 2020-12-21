/* var inputText = function(task) {
    var input = document.getElementById('lcSearchInputQuery');            
    if(task === 'add') {
        input.value="Enter keyword";
        input.style.backgroundColor="#FFFFFF"; // #BCACBF
    } else if (task === 'remove') {
        input.value="";
        input.style.backgroundColor="#FFFFFF";
    }
} */

var inputDate = function() {
    var input = document.getElementById('lcDate');
    var d = new Date();
    var monthname = new Array("January","February","March","April","May","June","July","August","September","October","November","December");
    var month = monthname[d.getMonth()];
    var date = d.getDate();
    var year = d.getFullYear();    
    input.innerHTML = month + ' ' + date + ', ' + year;
}
