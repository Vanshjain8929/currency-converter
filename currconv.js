const base_Url ="https://api.currencyapi.com/v3/latest?apikey=cur_live_VkmFojMW3V4rKwtsd0NVc9twhIZGsIo89E679FzE";


const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector(".btn");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg=document.querySelector(".msg");




for(let select of dropdowns){
    for (currCode in countryList){
         let newOption=document.createElement("option");
         newOption.innerText = currCode;
         newOption.value=currCode   
         if(select.name==="from" && currCode==="USD"){
            newOption.selected="selected"; 
         }else if(select.name==="to" && currCode==="INR"){
            newOption.selected="selected";
         }
         select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
}

const updateFlag= (element  )=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src=newSrc;
}

const updateExchangeRate=async ()=>{
    let amount=document.querySelector("form input");
    let amtVal=amount.value;
    if(amtVal==="" || amtVal<1){
        amount.value="1";
        amtVal=1;
    }

    // console.log(fromCurr.value,toCurr.value)
    
    let response=await fetch(base_Url);
    let data= await response.json();
    let rate = data.data[toCurr.value].value;
    let finalAmount = amtVal * rate;
    msg.textContent = `${amtVal}${fromCurr.value} = ${finalAmount.toFixed(2)}${toCurr.value}`;
}

window.addEventListener("load",()=>{
    updateExchangeRate();
})
btn.addEventListener("click", (evt)=>{
    evt.preventDefault();
    updateExchangeRate();
})  
