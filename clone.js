// console.log("Welcome")
let paramCount=1;

// As it is already checked in JSON we should hide the parameters Box 
// Hiding The parameters Box 
let paramBox=document.getElementById("parameterBox");
paramBox.style.display="none";

// When we click on Json we should get the Json Request Box 
let jsonRadio=document.getElementById("getJson")
jsonRadio.addEventListener('click',(e)=>{
    document.getElementById("requestBox").style.display="block"
    document.getElementById("parameterBox").style.display="none"
})

// When we click on custom parameter we should get the Parameter Box 
let paramRadio=document.getElementById("getParams")
paramRadio.addEventListener('click',(e)=>{
    document.getElementById("requestBox").style.display="none"
    document.getElementById("parameterBox").style.display="block"
})

// When We Click on + it should add more parameters list 
let paramBtn=document.getElementById('paramBtn')
let newParamBox=document.getElementById('newParamBox')
paramBtn.addEventListener('click',(e)=>{
    console.log("click")
    let html = `<div class="form-group row">
    <label for="inputpara" class="col-sm-2 col-form-label">Parameter ${paramCount + 1}</label>
    <div class="col-md-4">
          <input type="text" class="form-control" id="parameterKey${paramCount+1}" placeholder="Enter Parameter Key ">
        </div>
        <div class="col-md-4">
          <input type="text" class="form-control" id="parameterValue${paramCount+1}" placeholder="Enter Parameter Value">
        </div>
    <button class="btn btn-primary mx-2 deleteBtn">-</button>
  </div>`
//   we need aelement to inset the string  
let paramEle=getElementfromString(html);
newParamBox.appendChild(paramEle);
// Delete A Element When Click on - Button 
let deleteBtn=document.getElementsByClassName("deleteBtn");
for (let item of deleteBtn) {
    item.addEventListener('click',(e)=>{
        let a=alert("Do you want To delete")
        e.target.parentElement.remove();
    })
}
paramCount++;
})

// Function To get the Element From String 
function getElementfromString(str) {
    let div=document.createElement('div');
    div.innerHTML=str;
    return div.firstElementChild;
}

// When we click on Submit Button 
let submitBtn=document.getElementById("submitBtn");
submitBtn.addEventListener('click',()=>{
    document.getElementById("prism").innerHTML="Please Wait.....Fetching Data";

    let url=document.getElementById("inputurl").value;
    let requestType=document.querySelector("input[name='RequestType']:checked").value
    let contentType=document.querySelector("input[name='ContentType']:checked").value


    if(contentType=='getParams'){
        data={};
        for(i=0;i<paramCount;i++)
        {
              if(document.getElementById('parameterKey'+(i+1))!=undefined){
                let key=document.getElementById('parameterKey'+(i+1)).value;
                let Val=document.getElementById('parameterValue'+(i+1)).value;
                data[key]=Val;
             }
        }
        data=JSON.stringify(data);
    }
    else{
        data=document.getElementById('requestJson').value;
    }
    

  if(requestType=="GET"){
      fetch(url,{
          method:'GET'
      })
      .then((response)=>{
          return response.text();
      })
      .then((data)=>{
        document.getElementById("prism").innerHTML=data;
      })
  }
  else{
    fetch(url,{
        method:'POST',
        body:(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
    })
    .then((response)=>{
        return response.text();
    })
    .then((data)=>{
      document.getElementById("prism").innerHTML=data;
    })
  }

})