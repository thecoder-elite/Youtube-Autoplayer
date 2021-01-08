chrome.runtime.onMessage.addListener((request, sender) => {
    if(request) {
        if (request.msg == "status changed") {
            let rememberStatus = request.data
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                if(tabs[0].id)
                    chrome.tabs.sendMessage(tabs[0].id, {msg : 'status changed', data : rememberStatus})
            });

        }
    }
});