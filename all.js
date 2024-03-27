let data = [
    {
        content : "把冰箱發霉的檸檬拿去丟",
        done : false
    },
    {
        content : "把冰箱發霉的檸檬拿去",
        done : false
    },
    {
        content : "把冰箱發霉的檸檬拿",
        done : false
    },
    {
        content : "把冰箱發霉的檸檬",
        done : false
    }
];
undone = 0;
nowPage = "全部"

const list = document.querySelector(".list");
const list_footer_text = document.querySelector(".list_footer_text");

// tab選單功能
const tab = document.querySelector(".tab");
tab.addEventListener("click",function(e){
    nowPage = e.target.textContent;
    tabLi = e.target.parentNode.querySelectorAll("li");
    tabLi.forEach(item => {
        item.classList.remove('active')
    });
    e.target.setAttribute("class","active");

    if (e.target.textContent == "全部"){
        renderData();
    }else if(e.target.textContent == "待完成"){
        renderUnDoneData();
    }else if(e.target.textContent == "已完成"){
        renderDoneData();
    }
})

// 刷新資料
function renderData(){
    str = "";
    count = 0;
    data.forEach((item,index) => {
        str += `<li>
        <label class="checkbox">
            <input class="list_content" type="checkbox" />
            <span>${item.content}</span>
        </label>
        <a href="#" class="delete" data-num="${index}"></a>
        </li>`;
        if(item.done == false){
            count++;
            undone = count;
        }
    });

    list.innerHTML = str;
    const list_content = document.querySelectorAll(".list_content");
    list_content.forEach(function(item,index){
        item.checked = data[index].done;
    });

    list_footer_text.textContent = `${undone} 個待完成項目`;

    changeData();
    deleteData();
};

renderData();

// 刷新已完成資料
function renderDoneData(){
    str = "";
    data.forEach((item,index) => {
        if(item.done == true){
            str += `<li>
            <label class="checkbox">
                <input class="list_content" type="checkbox" />
                <span>${item.content}</span>
            </label>
            <a href="#" class="delete" data-num="${index}"></a>
            </li>`;
        }
    });
    list.innerHTML = str;
    const list_content = document.querySelectorAll(".list_content");
    list_content.forEach(function(item,index){
        item.checked = true;
    });

    changeData();
    deleteData();
};

// 刷新待完成資料
function renderUnDoneData(){
    str = "";
    data.forEach((item,index) => {
        if(item.done == false){
            str += `<li>
            <label class="checkbox">
                <input class="list_content" type="checkbox" />
                <span>${item.content}</span>
            </label>
            <a href="#" class="delete" data-num="${index}"></a>
            </li>`;
        }
    });
    list.innerHTML = str;
    const list_content = document.querySelectorAll(".list_content");
    list_content.forEach(function(item,index){
        item.checked = false;
    });

    changeData();
    deleteData();
};

// 加資料
function addData(){
    const btn_add = document.querySelector(".btn_add");
    const btn_input = document.querySelector(".btn_input");
    
    btn_add.addEventListener("click",function(e){
        e.preventDefault();
        undone = 0;
        data.push({
            content : btn_input.value,
            done : false
        });
        renderData();
        btn_input.value = "";
    });
}
addData();

// 變資料布林值
function changeData(){
    const list_content = document.querySelectorAll(".list_content");
    list_content.forEach(function(item){
        item.addEventListener("click",function(e){
            str = e.target.parentNode.lastChild.previousSibling.textContent;
            data.forEach(function(item){
                if(item.content == str){
                    if(item.done == false){
                        item.done = true;
                        undone--;
                        list_footer_text.textContent = `${undone} 個待完成項目`;
                    }else if(item.done == true){
                        item.done = false;
                        undone++;
                        list_footer_text.textContent = `${undone} 個待完成項目`;
                    }
                }
            });
        })
    });
}

// 刪資料
function deleteData(){
    const del = document.querySelectorAll(".delete");
    del.forEach(function(item){
        item.addEventListener("click",function(e){
            e.preventDefault();
            data.splice(e.target.getAttribute("data-num"),1);
            renderData();
        })
    });
}

// 清除已完成項目
const deleteDone = document.querySelector(".deleteDone");
deleteDone.addEventListener("click",function(e){
    e.preventDefault();
    deleteDoneData();
})
function deleteDoneData(){
    data.forEach(function(item,index){
        if (item.done == true){
            data.splice(index,1);
        }
    });
    
    if (nowPage == "全部"){
        renderData();
    }else if(nowPage == "待完成"){
        renderUnDoneData();
    }else if(nowPage == "已完成"){
        renderDoneData();
    }
}