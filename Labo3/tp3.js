//contient les données
var n;

function gauss(n,A,B){
	for(i=1;i<n;i++){
		
	}
}
function getFileContent(){
	var reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(document.getElementById("fileToUpload").files[0]);
}
function onReaderLoad(event){
    console.log(event.target.result);
    var obj = JSON.parse(event.target.result);
	gauss(obj.n, eval(obj.A), eval(obj.B));
}