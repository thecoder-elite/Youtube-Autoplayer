let REM_STATUS = localStorage.getItem('rememberStatus') || 'true'
let CURR_VIDEO_SRC = ''
let INTERVAL = ''
let PREV_VIDEO_SRC = ''
let CURR_VIDEO_OBJ = ''
let TIME_ELAPSED = 0

chrome.runtime.onMessage.addListener((request, sender) => {
    if(request) {
        if (request.msg == "status changed") {
            REM_STATUS = request.data;
            localStorage.setItem('rememberStatus', REM_STATUS);
            if(REM_STATUS == "false"){
                localStorage.removeItem('currTimeURL')
                localStorage.removeItem('lastVisitedURL')
            }
            else{
                if(!INTERVAL)
                    INTERVAL = window.setInterval(rememberSource, 1000); 
            }
        }
    }
});


function rememberSource(){
    CURR_VIDEO_SRC = window.location.href;
    if(CURR_VIDEO_SRC.split("=").length>1){
        if(CURR_VIDEO_SRC != PREV_VIDEO_SRC){
            CURR_VIDEO_OBJ = document.querySelectorAll('video')[0];
            PREV_VIDEO_SRC = CURR_VIDEO_SRC
        }
        TIME_ELAPSED = CURR_VIDEO_OBJ.currentTime;
    }
}

window.onunload = () =>{
    if( REM_STATUS == "true"){
        localStorage.setItem("currTimeURL", "https://youtu.be/"+CURR_VIDEO_SRC.split("=")[1]+"?t="+Math.floor(TIME_ELAPSED));
        localStorage.setItem("lastVisitedURL", CURR_VIDEO_SRC);
    }
}

window.onload = () => {
    let lasVisitedURL = localStorage.getItem("lastVisitedURL")
    let currTimeURL = localStorage.getItem("currTimeURL")
    if(REM_STATUS == "true"){
        if(lasVisitedURL && lasVisitedURL != window.location.href){
            window.location.href = currTimeURL
            localStorage.removeItem('lastVisitedURL');
            localStorage.removeItem('currTimeURL');
        }
        INTERVAL = window.setInterval(rememberSource, 1000); 
    }
}

