function ajax(json) {
    var method = json.method,
        url = json.url,
        success = json.success;

    var xhr = new XMLHttpRequest();
    xhr.open(method,url,'true');
    xhr.onreadystatechange = function() {
        if(xhr.readyState === 4) {
            if(xhr.status === 200) {
                success(xhr.responseText);
            }
        }
    }
    // xhr.setRequestHeader('Content-Type','application/x-for')
    xhr.send('hello');
}