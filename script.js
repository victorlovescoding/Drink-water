let goalPercent = document.getElementById("goalPercent");
const waterContainer = document.getElementById("waterContainer");
const addWaterButton = document.getElementById("addWaterButton");
const progress = document.getElementById("progress");
const kg = document.getElementById("kg");
const target = document.getElementById("target");
const needWater = document.getElementById("needWater");
const changeBottle = document.getElementById("changeBottle");
let addWater;
let totalWater=0;
//如果localStorage沒有喝水資料，目前的水量為0。
// if(JSON.parse(localStorage.getItem("finishedProportion",))===null){
//    totalWater = 0;
//    progress.innerHTML= totalWater;  
// }else{//如果localStorage有喝水資料，目前的水量為喝水%數往回取得目前水量
//     totalWater = (JSON.parse(localStorage.getItem("finishedProportion",))/100)*target.value //喝水%數往回取得目前水量
// }


window.addEventListener('load',refresh);

kg.addEventListener('keyup',calc);
addWaterButton.addEventListener('click',addWaterFunction);
addWaterButton.addEventListener('contextmenu',subtract);
target.addEventListener('keyup',setGoal);
changeBottle.addEventListener('click',changeBottleMl);


//(addWater/target.textContent)*100;


 function setGoal(){
     localStorage.setItem("goal",JSON.stringify(target.value));
 }



 function addWaterFunction(){
    if(target.value!="" && target.value>=0 && localStorage.getItem('bottle') !== null){
      
      addWater = JSON.parse(localStorage.getItem("bottle",));
      totalWater = JSON.parse(localStorage.getItem("totalWater",));
      totalWater += addWater;
      progress.innerHTML= totalWater;
      localStorage.setItem("totalWater",JSON.stringify(totalWater));
      let finishedProportion = (totalWater/target.value)*100;
      // goalPercent.innerHTML = finishedProportion.value;
      waterContainer.style.background = `linear-gradient(to top,#5AA6F8 ${finishedProportion+"%"},transparent ${finishedProportion+"%"})`;
      localStorage.setItem("finishedProportion",JSON.stringify(finishedProportion));
      
      goalPercent.textContent = finishedProportion.toFixed(2);
    }else {
      alert("Give me ml of bottle or goal !")
    };
  }




function subtract(event){
  if(target.value!="" && target.value>=0){
    event.preventDefault();
    totalWater = JSON.parse(localStorage.getItem("totalWater",));
    addWater = JSON.parse(localStorage.getItem("bottle",));
    totalWater -= addWater;
    
    let finishedProportion = (totalWater/target.value)*100;
    
    waterContainer.style.background = `linear-gradient(to top,#5AA6F8 ${finishedProportion+"%"},transparent ${finishedProportion+"%"})`;
    localStorage.setItem("finishedProportion",JSON.stringify(finishedProportion));
    localStorage.setItem("totalWater",JSON.stringify(totalWater));
    progress.innerHTML= totalWater;
    goalPercent.textContent = finishedProportion.toFixed(2);
  }else{
  alert("Get Positive Number")
  }
  
  
     
}



//重新載入時，提取localStorage資料，並顯示喝水進度給使用者看
function refresh(){
    if(localStorage.getItem("finishedProportion",)){
      addWaterButton.textContent = JSON.parse(localStorage.getItem("bottle",));
      addWaterButton.textContent ="+"+addWaterButton.textContent+"ml"
       finishedProportion = JSON.parse(localStorage.getItem("finishedProportion",));
      target.value = JSON.parse(localStorage.getItem("goal",));
        waterContainer.style.background = `linear-gradient(to top,#5AA6F8 ${finishedProportion+"%"},transparent ${finishedProportion+"%"})`;
        progress.innerHTML= JSON.parse(localStorage.getItem("totalWater",));;
        goalPercent.textContent = finishedProportion.toFixed(2);
    }
    
}

function calc(){
    needWater.innerHTML = (kg.value)*35;
    // target.innerHTML = (kg.value)*35;
    // localStorage.setItem("goal",JSON.stringify(needWater.textContent));
}


function changeBottleMl(){
  
  let ans = prompt("How many mls in your bottle?");
  addWaterButton.textContext = Number(ans);
  addWaterButton.innerHTML  = "+"+ans+"ml";
  localStorage.setItem("bottle",JSON.stringify(addWaterButton.textContext));
  
}
