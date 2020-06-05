window.onload = function () {
    var textJoke = document.getElementById("textJoke");
    var button = document.getElementById("button");
    var idInfo = document.getElementById("idInfo");
    var lastUpdate = document.getElementById("lastUpdate");
    var favSvg = document.getElementById("favSvg");
    var form_categories=document.getElementById("form_categories");
    var frm = document.forms.form;
    var sectionRight = document.getElementById("sectionRight");
    var value_idInfo;
    var value_update;
    var value_joke;
    button.onclick = function () {
        var res;

        for (i = 0; i < frm.elements.length; i++) {
            var e = frm.elements[i];
            if (e.checked) {
                if(e.name=='random'){
                    var xhr = new XMLHttpRequest();
                    xhr.open("GET", "https://api.chucknorris.io/jokes/random", false);
                    xhr.send();
                    res = xhr.responseText;
                    idInfo.innerHTML = "ID: " + getData("id");
                    lastUpdate.innerHTML = "last update: " + getData("updated_at");
                    textJoke.innerHTML = getJokeValue("value");
                }
                if(e.name=='fromCategories'){
                    var xhr = new XMLHttpRequest();
                    xhr.open("GET", "https://api.chucknorris.io/jokes/categories", false);
                    xhr.send();
                    res = xhr.responseText;
                    let array=res.substring(2,res.length-2).split('","');
                    
                    for(i=0;i<array.length;i++){
                        var newLi_categories=document.createElement('li');
                        form_categories.appendChild(newLi_categories);
                        newLi_categories.innerHTML=array[i];
                    }
                }
                }
               

            function getData(val) {
                var pattern = val;
                var f = res.search(pattern);
                var start = f + pattern.length + 2;
                var end = res.indexOf(",", start);
                return res.substring(start, end);
            }

            function getJokeValue(val) {
                var pattern = val;
                var f = res.search(pattern);
                var start = f + pattern.length + 2;
                var end = res.indexOf("}", start);
                return res.substring(start, end);
            }
        }
    value_idInfo=getData("id");
    value_update=getData("updated_at");
    value_joke=getJokeValue("value");

    }

    favSvg.addEventListener('click', addtoFavourite, false);
var isValid=false;

    function addtoFavourite(e) {
        if (!e) e = window.event;
        if (sectionRight.childNodes.length > 2) {
            isValid=false;
            do {
                sectionRight.removeChild(sectionRight.lastChild);
            }
            while (sectionRight.firstChild)
            
        }
        window.localStorage.setItem("id", value_idInfo);
        window.localStorage.setItem("updated_at", value_update);
        window.localStorage.setItem("value", value_joke);
        if (value_idInfo == undefined || value_update == undefined || value_joke == undefined) {
           return alert("no info to get");
        }

        function Create_div() {
            this.div = document.createElement("div");
        }
        Create_div.prototype.show_div = function (name, value_idInfo) {
            this.div.id = value_idInfo;
            this.div.className = name;
            if(!document.getElementById(value_idInfo)){
                sectionRight.appendChild(this.div);
                for (i = 0; i < array.length; i++) {
                    array[i].show(this.div.id);
                }
            }
           
        }
        function Create_groupidInfo() {
            this.div = document.createElement("div");
            this.div.innerHTML = window.localStorage.getItem("id");
            this.div.className = "sectionRight__idInfo";
            this.show = function (id) {
                document.getElementById(id).appendChild(this.div)
            }
        }

        function Create_groupLastUpdate() {
            this.div = document.createElement("div");
            this.div.className = "sectionRight__lastUpdate";
            this.show = function (id) {
                document.getElementById(id).appendChild(this.div);
            }
        }

        function Create_grouptextJoke() {
            this.div = document.createElement("div");
            this.div.innerHTML = window.localStorage.getItem("value");
            this.div.className = "sectionRight__textJoke";
            this.show = function (id) {
                document.getElementById(id).appendChild(this.div)
            }
        }
        var array = [
            new Create_groupidInfo(),
            new Create_grouptextJoke(),
            new Create_groupLastUpdate(),
        ]



        var r = new Create_div();
        if(sectionRight.firstChild!=null && sectionRight.firstChild.nodeName=='#text'){
            sectionRight.removeChild(sectionRight.firstChild);
        }
        if(sectionRight.childNodes.length==2){
            r.show_div("group3", value_idInfo);
           
        }
        if(sectionRight.childNodes.length==1){
        r.show_div("group2", value_idInfo);
        
        }

        if(!isValid){
           
        r.show_div("group1", value_idInfo);
        isValid=true;
        }
       
        




    }
}