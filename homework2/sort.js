
var arr = [23,213,4,12,5,2,5,646,45,7,231,23,244];
function datatr () {
    for(var i = 0 ; i < arr.length ; i++ ) {
        for(var j = i + 1 ; j < arr.length ; j++) {
            if(arr[i] > arr[j]) {
                var tmp = arr[i];
                arr[i] = arr[j];
                arr[j] = tmp;
            }
        }
    }
     postMessage(arr);
}

datatr();