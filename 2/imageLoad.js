function action(){
    var element = document.getElementById("my-bar");
    var i=0;
    var temp = setInterval(func,10);
    function func(){
        if(i==100){
            clearInterval(temp);
        }
        else{
            i++;
            element.style.width= i+'%';
        }
    }
    }