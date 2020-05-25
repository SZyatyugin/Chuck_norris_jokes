window.onload=function(){
    var textJoke=document.getElementById("textJoke");
    var button=document.getElementById("button");
    var idInfo=this.document.getElementById("idInfo");
    var lastUpdate=document.getElementById("lastUpdate");
    var favSvg=document.getElementById("favSvg");
    var frm=document.forms.form;
    var sectionRight=document.getElementById("sectionRight");
    
    button.onclick=function(){
        for(i=0;i<frm.elements.length;i++){
            var e=frm.elements[i];
            if(e.checked){
                var xhr=new XMLHttpRequest();
                xhr.open("GET","https://api.chucknorris.io/jokes/random", false);
                xhr.send();
                var res=xhr.responseText;
                idInfo.innerHTML="ID: "+getData("id");
                lastUpdate.innerHTML="last update: "+getData("updated_at");
                textJoke.innerHTML=getJokeValue("value");
            
                   
                }
                function getData(val){
                    var pattern=val;
                    var f=res.search(pattern);
                    var start=f+pattern.length+2;
                    var end=res.indexOf(",",start); 
                   return res.substring(start,end); 
                
                  
                }
                function getJokeValue(val){
                    var pattern=val;
                    var f=res.search(pattern);
                    var start=f+pattern.length+2;
                    var end=res.indexOf("}",start); 
                    return res.substring(start,end); 
                   
                }
            }
        }
       favSvg.onclick=function(){
          
           function Creatediv(){
               this.creatediv=document.createElement("div");
               this.creatediv.style.position="absolute";
               this.creatediv.style.width="400px";
               this.creatediv.style.height="180px";
               this.creatediv.style.top="88px";
               this.creatediv.style.left="40px";
            this.creatediv.style.right="40px";
           }
           function pushdiv(){
               if(parentNode==div){
                   sectionRight.appendChild(this.creatediv)
               }
               
            
           }
       }
        
    }
