function fetchEx(){
	const apiUrl = 'https://openexchangerates.org/api/';
	var queryPara = 'latest.json';
	const appId = '6e8597dfb06a4c12840d93054ae13fba';

	//var url = apiUrl + queryPara;
	var url = apiUrl + queryPara + '?app_id=' + appId;
	
	///url = url + '&base=CNY';
	const options ={
		method: 'GET',
		headers: {
			'Authorization': 'Token ' + appId
		}
	}
	// 调用 `fetch()`，传入 URL。
	fetch('./json/exchange_rates.json')
	  // fetch() 返回一个 promise。当我们从服务器收到响应时，
	  // 会使用该响应调用 promise 的 `then()` 处理器。
	  .then((response) => {
	    // 如果请求没有成功，我们的处理器会抛出错误。
	    if (!response.ok) {
	      throw new Error(`获取汇率失败-HTTP 错误：${response.status}!`);
	    }
	    // 否则（如果请求成功），我们的处理器通过调用
	    // response.json() 以获取文本形式的响应，
	    // 并立即返回 `response.json()` 返回的 promise。
	    return response.json();
	  })
	  // 若成功调用 response.json()，会使用返回的json来调用 `then()` 处理器，
	  // 
	  .then((data) => {
	  	if(0){}//处理服务器错误码
	  	console.log('fetch Rates from Server: ');
	  	console.log(data);
	  	displayEx(data);
	  }).catch((error) => {
	  	console.log( `失败汇率失败：${error}!`);
	  });
}
async function fetchJson(path){
	var obj =
	await fetch(path)
	.then((response)=>{
		if (!response.ok) {
		      throw new Error(`HTTP 错误：${response.status}!`);
		    }
		return response.json();
	}).then((data)=>{
		return data;
	}).catch((error) => {
	  	console.log( `获取 ${path} JSON： ${error}!`);
	  	return error;
	});
	console.log(`成功获取 ${path} JSON;`);
	console.log(obj);
	return obj;
	
}

async function displayEx(data){
	//other info
	const time = new Date(data.timestamp).toString();
	const base = data.base;//str
	const terms = data.disclaimer;
	const license = data.license;
	const headInfo = document.getElementById('exInfo');
	
	var headInfoStr = `<div>基准货币: ${base}</div><div>更新时间: ${time}</div><a href="${terms}">免责声明</a><a href="${license}">许可证</a>`;
	headInfo.innerHTML = headInfoStr;
	
	//create tables to display rates
	const supportedC = await fetchJson('./json/supported_currencies.json');
	
	const cName = await fetchJson('./json/sym_cname.json');
	
	const country = await fetchJson('./json/code_country.json');
	
	const rates = data.rates;//obj
	
	const table = document.createElement('table');
	const thead = document.createElement('thead');
	const tbody = document.createElement('tbody');
	
	table.appendChild(thead);
	table.appendChild(tbody);
	
	const tableCreate = document.getElementById('tableCreate');
	if("replaceChildren" in document.createElement("table")) {
  		tableCreate.replaceChildren();
	} else {
  	// 浏览器不支持replaceChildren()方法
  	console.log('浏览器不支持replaceChildren()方法');
  	tableCreate.innerHTML = '';
	}
	tableCreate.appendChild(table);
	
	thead.innerHTML = '<tr><th>Symbol</th><th>Rates</th><th>Name</th><th>cName</th><th>Flag</th><th>Contient</th></tr>';
	
	//console.log(rates);
	var nameNotFound= "Name not found: ";
	var cNameNotFound= "Chinese Name not found: ";
	var flagNotFound= 'Flag not found: ';
	var countryNotFound= 'Country not found: ';
	
	for(let key in rates){
		var tr =  document.createElement('tr');
		var td1 = document.createElement('td');
		var td2 = document.createElement('td');
		var td3 = document.createElement('td');
		var td4 = document.createElement('td');
		var td5 = document.createElement('td');
		var td6 = document.createElement('td');
		
		td1.textContent =  key;
		td2.textContent = rates[key];
		
		if(supportedC.hasOwnProperty(key)){			
			td3.innerHTML = supportedC[key];
		}else{
			td3.textContent = 'not found';
			td3.style.color = 'red';
			nameNotFound += `${key} `;
		}
		
		if(cName.hasOwnProperty(key)){			
			td4.textContent = cName[key]['cname'];
			//if(cName[key]['cname'].match(/美元/)){
			//	td4.style.backgroundColor = "red";
			//	str += `${key} `;
			//}
			//for code to country
			var keyNew = cName[key]['code'].toLowerCase();
		}else{
			td4.textContent = 'not found';
			td4.style.color = 'red';
			cNameNotFound += `${key} `;
			
			var keyNew = 'null';
		}
		
		//flags
		var code = cName[key]['code'].toLowerCase();
		if(/^[a-z]{2}$/.test(code)){
			var span = document.createElement('span');
			//span.classList.add(`fi fi-${code}`);error
			span.classList.add('fi');
			span.classList.add(`fi-${code}`);
			td5.appendChild(span);
		}else{flagNotFound +=`${cName[key]['cname']} `;}
		
		if(/[a-z]{2}/.test(keyNew)){
			if(country.hasOwnProperty(keyNew)){
				td6.textContent = country[keyNew]['continent'];
			}else{
				;
				countryNotFound += `${keyNew} inCountry | `;
			}
		}else{countryNotFound += `${key} inCName | `;}
		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.appendChild(td3);
		tr.appendChild(td4);
		tr.appendChild(td5);
		tr.appendChild(td6);
		tbody.appendChild(tr);
	}
	console.log(nameNotFound);
	console.log(cNameNotFound);
	console.log(flagNotFound);
	console.log(countryNotFound);
	console.log('-------------------------------------------');
}
