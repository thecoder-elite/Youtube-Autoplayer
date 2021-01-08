const SWITCH = document.getElementById('switch')
let SWITCH_STATUS = localStorage.getItem('rememberStatus') || "true";

if (SWITCH_STATUS == "true"){
    SWITCH.style.backgroundColor = "green"
    SWITCH.style.border = '1px solid green' 
    SWITCH.innerText = 'ON'  
}
else{
    SWITCH.style.backgroundColor = "red"
    SWITCH.style.border = '1px solid red'   
    SWITCH.innerText = 'OFF'  
}

function toggleSwitch(){
    if(SWITCH_STATUS == "true"){
        SWITCH.style.backgroundColor = "red"
        SWITCH.style.border = '1px solid red'   
        SWITCH.innerText = 'OFF'   
        localStorage.setItem('rememberStatus', "false")
        SWITCH_STATUS = "false"
        chrome.runtime.sendMessage({msg:'status changed', data:"false"})
    }
    else if (SWITCH_STATUS == "false"){
        SWITCH.style.backgroundColor = "green"
        SWITCH.style.border = '1px solid green' 
        SWITCH.innerText = 'ON'  
        localStorage.setItem('rememberStatus', "true")
        SWITCH_STATUS = "true"
        chrome.runtime.sendMessage({msg:'status changed', data:"true"})
    }
    
}

SWITCH.addEventListener("click", toggleSwitch)


