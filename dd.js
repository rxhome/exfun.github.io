ddListener('ddButton');
ddListener('json');
ddListener('csv');
const ddButton = document.getElementById('ddButton');
ddButton.addEventListener('click', function(e){
	downloadTable(e.target.lastChild.textContent);
});
const json = document.getElementById('jsonddButton');
js.addEventListener('click', function(e){
	var format = e.target.textContent;
	e.target.parent.lastChild.textContent = format;
	downloadTable(format);
});
const csv = document.getElementById('csv');
csv.addEventListener('click', function(e){
	var format = e.target.textContent;
	e.target.parent.lastChild.textContent = format;
	downloadTable(format);
});

function downloadTable(format) {
  // 获取表格元素
  const table = document.querySelector("table");
  if(!table){alert('table not found! Please fetch rates first.');return false;}
  // 获取表格行数和列数
  var rows = table.rows.length;
  var cols = table.rows[0].cells.length;
  // 创建一个CSV字符串
  var csv = "";
  var arr = new Array();
  var arrKey = new Array();
  
  // 遍历表格行和列，将数据添加到CSV字符串中
  for (var i = 0; i < rows; i++) {
    if(format === 'json')if(i)var obj = new Object();
    
    for (var j = 0; j < cols; j++) {
      // 添加单元格数据，并用逗号分隔
      if(format === "csv")if(j != 4)csv += table.rows[i].cells[j].textContent + ",";
      if(format ==="json"){

      	if(i === 0){
      		if(j != 4)arrKey.push(table.rows[i].cells[j].textContent.toLowerCase());
      		if(j === 4)arrKey.push('null');
      	}else{
      		if(j != 4)obj[arrKey[j]] = table.rows[i].cells[j].textContent;
      	}
      }
    }
    // 添加行结束符
    if(format === "csv")csv += "\n";
    if(format === 'json')if(i)arr.push(obj);
  }
  // 创建一个下载链接
  var link = document.createElement("a");
  if(format === 'csv'){
  	link.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
 	link.download = "table.csv";
  }
  if(format ==='json'){
  	link.href = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(arr));
  	link.download = "table.json";
  }
  // 添加到页面上并模拟点击
  const ddBlock = document.getElementById('ddBlock');
  ddBlock.appendChild(link);
  link.click();
  ddBlock.removeChild(link);
}
