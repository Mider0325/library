var Ajax =function(opt){
	var promise = new Promise(function(resolve,reject){
		
		// 设置默认参数
		opt = opt || {};
		//  默认为POST 请求
		opt.method = opt.method.toUpperCase() || 'POST';
		//  默认为异步
		opt.async = opt.async || true;
		opt.url = opt.url || '';
		opt.data = opt.data || null;
		opt.dataType =opt.dataType || "json";
		opt.success =opt.success || function (){};
		opt.error = opt.error || function (){};
		opt.complete = opt.complete || function(){};


		var xmlHttp = null;

		// 兼容 低版本IE 
		if(XMLHttpRequest){
			// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlHttp = new XMLHttpRequest();
		} else {
 			xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
		}
		var tempArr =[];
		var data ="";
		for (key in opt.data){
			tempArr.push(key+"="+opt.data[key]);
		}

        data = tempArr.join("&");

		if(opt.method ==="POST"){

			xmlHttp.open(opt.method,opt.url,opt.async);
			xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
			xmlHttp.send(opt.data);

		}else if(opt.method=== "GET"){
			xmlHttp.open(opt.method,opt.url+"?"+data,async)
			xmlHttp.send();
		}

		// 异步的时候调用 onreadystatechange
		if (opt.async == true ){
			xmlhttp.onreadystatechange = function (){
			if(xmlhttp.readyState==4 && ((xmlhttp.status>=200 && xmlhttp.status<300) || xmlhttp.status=304 ) ){
				resolve();
			} else {
				reject(new Error(this.statusText));
			}

			if(xmlhttp.readyState==4 ){
				opt.complete ();
			}
			};
		}
	})
	 return promise;
}


