function addEventHandle(ele, event, afc) {   //兼容
    if (ele.addEventListener) {
        ele.addEventListener(event, afc, false);
    }
    else if (ele.attachEvent) {
        ele.attachEvent("on" + event, afc);
    }
    else {
        ele["on" + event] = afc;
    }
}

var tagInput = document.getElementById('tag_input'),
    tagList = document.getElementById('tag_list'),
    hobbyInput = document.getElementById('hobby_input'),
    hobbyList = document.getElementById('hobby_list'),
    btn = document.getElementsByTagName("button")[0];

function CreateList(list) {      //利用构造函数和原型模式相结合的方式创建对象模型
    this.queue = [];
    this.render = function () {
        var str = "";
        this.queue.forEach(function (e) {
            str += "<span>" + e + "</span>";
        });
        list.innerHTML = str;
    }
}
CreateList.prototype.rightPush = function (str) {
    this.queue.push(str);
};
CreateList.prototype.leftShift = function () {
    this.queue.shift();
};

var tagObj = new CreateList(tagList);//创建tag实例对象

function showTag() {
    if (/[,，;；、\s\n]+/.test(tagInput.value.trim()) || event.keyCode == 13) {
        var input = tagInput.value.trim().split(/[,，;；、。.\s\n]+/);
        var newTag = input[0];
        if (tagObj.queue.indexOf(newTag) === -1) {
            tagObj.rightPush(newTag);
            if (tagObj.queue.length > 10) {
                tagObj.leftShift();
            }
        }
        tagObj.render();
        tagInput.value = "";
    }
}

var hobbyObj = new CreateList(hobbyList);  //创建hobby实例对象

function showHobby() {
    var Input = hobbyInput.value.trim().split(/[,，;；、。.\s\n]+/);
    Input.forEach(function (e) {
        if (hobbyObj.queue.indexOf(e) === -1) {
            hobbyObj.rightPush(e);
            if (hobbyObj.queue.length > 10) {
                hobbyObj.leftShift();
            }
        }
        hobbyObj.render();
        hobbyInput.value = "";
    })
}

addEventHandle(tagInput, "keyup", showTag);//绑定事件
addEventHandle(btn, "click", showHobby);
addEventHandle(tagList,"mouseover",function(e){
    if(e.target && e.target.nodeName == "SPAN"){
        e.target.firstChild.insertData(0,'点击删除');
    }
});
addEventHandle(tagList,"mouseout",function(e) {
    if(e.target && e.target.nodeName == "SPAN") {
        e.target.firstChild.deleteData(0,4);
    }
});
addEventHandle(tagList,"click",function(e){
    if(e.target && e.target.nodeName == "SPAN" ){
        tagList.removeChild(e.target);
    }
});