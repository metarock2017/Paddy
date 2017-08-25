function ajax(json) {
    var method = json.method || 'POST',
        url = json.url,
        success = json.success || '',
        data = json.data;

    var xhr = new XMLHttpRequest();
    xhr.open(method,url ,true);
    xhr.onreadystatechange = function() {
        if(xhr.readyState === 4) {
            if(xhr.status === 200) {
                // success(xhr.responseText);
                console.log('success');
            }
        }
    }
    xhr.send('point='+data);
}