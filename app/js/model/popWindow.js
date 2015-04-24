function popWindow(msg, callback){

    var iWidth = document.documentElement.clientWidth;
    var iHeight = document.documentElement.clientHeight;
    var bgObj = document.createElement("div");
    bgObj.style.cssText = "position:absolute;left:0px;top:0px;width:"+iWidth+"px;height:"+Math.max(document.body.clientHeight, iHeight)+"px;filter:Alpha(Opacity=50);opacity:0.5;background-color:#000000;z-index:101;";
    document.body.appendChild(bgObj);

    var msgObj=document.createElement("div");
    msgObj.style.cssText = "position:absolute;font:14px 'Helvetica Neue';top:"+(document.body.clientHeight-200)/2+"px;left:10%;width:80%;height:200px;text-align:center;background-color:#FFFFFF;padding:1px;line-height:22px;z-index:102;" +
    "border-radius:20px;opacity:0.85;";
    document.body.appendChild(msgObj);

    var h3 =document.createElement("h3");
    msgObj.appendChild(h3);
    h3.style.cssText ="height:30%;margin:0 auto;text-align:centre;padding:0 20px;line-height:2.4;color:#3071a9;font-size:1.8em;font-weight:bold"
    h3.innerHTML = "系统提示";

    var p =document.createElement("p");
    msgObj.appendChild(p);
    p.style.cssText ="height:45%;margin:0 auto;text-align:centre;padding:0 40px;border-bottom:2px solid #eee;font-size:1.2em;"
    p.innerHTML = msg;

    var closeBtn =document.createElement("div");
    msgObj.appendChild(closeBtn);
    closeBtn.style.cssText= "padding:0 20px;height:25%;margin:0 auto;border:none；outline:none;line-height:2.4;font-size:1.6em;font-weight:bold;color:#3071a9;cursor:pointer";
    closeBtn.innerHTML ="关闭" ;
    closeBtn.onclick = function(){
        document.body.removeChild(bgObj);
        document.body.removeChild(msgObj);
        if(callback) callback();
    }
}