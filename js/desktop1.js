window.onload = function () {
    function get(id){
        return document.getElementById(id);
     }
    
  
    var textJoke = document.getElementById("textJoke");
    var button = document.getElementById("button");
    var idInfo = document.getElementById("idInfo");
    var lastUpdate = document.getElementById("lastUpdate");
    var favSvg = document.getElementById("favSvg");
    var form_categories=document.getElementById("form_categories");
    var form_elements=document.getElementsByName("form_elements");
    var form_categoriesList=document.getElementById('form_categoriesList');
    var frm = document.forms.form;
    var sectionRight = document.getElementById("sectionRight");
    var value_idInfo;
    var value_update;
    var value_joke;
    
frm.onclick=function(e){
    if(!e)e=window.event;
    for (i=0;i<form_elements.length;i++){
        var element = form_elements[i];
        if(element.checked){
            if(element.id!='form_categories' && form_categoriesList.childNodes.length>0){
                get('jokeCategory').innerHTML='';
                do{
                    form_categoriesList.removeChild(form_categoriesList.lastChild);
                }
                while(form_categoriesList.firstChild)
                           } 
            if(element.id=='form_categories'&&form_categoriesList.childNodes.length==0){
                var xhr = new XMLHttpRequest();
                xhr.open("GET", "https://api.chucknorris.io/jokes/categories", false);
                xhr.send();
                res = xhr.responseText;
                let array=res.substring(2,res.length-2).split('","');
                
                for(i=0;i<array.length;i++){
                    var newLi_categories=document.createElement('input');
                    newLi_categories.setAttribute('type','button');
                    newLi_categories.setAttribute('value',array[i]);
                    form_categoriesList.appendChild(newLi_categories);
                    
                }

            }
            if(element.id=='form_search'){
                get('input_form_search').style.visibility='visible';
            
        }else if(element.id!='form_search'){
            get('input_form_search').style.visibility='hidden';
        }
        }
        
    }
    if(form_categoriesList.childNodes.length>0){
       e.target.setAttribute('val','clicked');  
    }
    
}
    button.onclick = function () {
        setInterval(showBoomFirst,400);
        setInterval(showBoomSecond,1500);
        var res;
      
        for (i = 0; i < frm.elements.length; i++) {
           
            var e = frm.elements[i];
            if (e.checked) {
                if(e.id=='form_random'){
                    var xhr = new XMLHttpRequest();
                    xhr.open("GET", "https://api.chucknorris.io/jokes/random", false);
                    xhr.send();
                    res = xhr.responseText;
                    idInfo.innerHTML = "ID: " + getData("id");
                    lastUpdate.innerHTML = "last update: " + getData("updated_at");
                    textJoke.innerHTML = getJokeValue("value");
                }
                if(e.id=='form_categories'){
                    for(i=0;i<form_categoriesList.childNodes.length;i++){
                        var elem_form_categoriesList=form_categoriesList.childNodes[i];
                        if(elem_form_categoriesList.hasAttribute('val')){
                            var pattern=elem_form_categoriesList.getAttribute('value');
                            var url="https://api.chucknorris.io/jokes/random?category="+pattern+"";
                            var xhr = new XMLHttpRequest();
                            xhr.open("GET",url, false);
                            xhr.send();
                            res = xhr.responseText;
                            idInfo.innerHTML = "ID: " + getData("id");
                            lastUpdate.innerHTML = "last update: " + getData("updated_at");
                            textJoke.innerHTML = getJokeValue("value");
                            get('jokeCategory').innerHTML=pattern;
                        }else{
                            continue
                        }
                    }
                }
                if(e.id=='form_search'){
                    if(get('input_form_search').value!=""){
                        var xhr = new XMLHttpRequest();
                        var url_form_search='https://api.chucknorris.io/jokes/search?query='+get('input_form_search').value+'';
                        xhr.open("GET",url_form_search, false);
                        xhr.send();
                        res = xhr.responseText;
                        idInfo.innerHTML = "ID: " + getData("id");
                        lastUpdate.innerHTML = "last update: " + getData("updated_at");
                        textJoke.innerHTML = getJokeValue("value");
                    }else{
                        textJoke.innerHTML='There is nothing to search';
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
        if (!value_idInfo) {
           return alert("no joke to add to Favourite");
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
            this.div.innerHTML ='ID:'+window.localStorage.getItem("id");
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
    function showBoomFirst(){
        get("boom_one").style.visibility='visible';
        get("boom_three").style.visibility='visible';
    }
   
    function showBoomSecond(){
        get("boom_second").style.visibility='visible';
        get("boom_four").style.visibility='visible';
    }
}
