/**
数据验证（表单验证）
来自 grace.hcoder.net 
作者 hcoder 深海
*/
module.exports = {
	error:'',
	check : function (data, rule){
			if (!rule.checkType){return true;}
			if (!rule.name) {return true;}
			if (!rule.errorMsg) {return true;}
			if (!data[rule.name]) {this.error = rule.errorMsg; return false;}
			switch (rule.checkType){
				case 'string':
					var reg = new RegExp('^.{' + rule.checkRule + '}$');
					if(!reg.test(data[rule.name])) {this.error = rule.errorMsg; return false;}
				break;
				case 'int':
					var reg = new RegExp('^(-[1-9]|[1-9])[0-9]{' + rule.checkRule + '}$');
					if(!reg.test(data[rule.name])) {this.error = rule.errorMsg; return false;}
					break;
				break;
				case 'between':
/*					if (!this.isNumber(data[rule.name])){
						this.error = rule.errorMsg;
						return false;
					}*/
					var minMax = rule.checkRule.split(',');
					minMax[0] = Number(minMax[0]);
					minMax[1] = Number(minMax[1]);
					if (data[rule.name] > minMax[1] || data[rule[i].name] < minMax[0]) {
						this.error = rule.errorMsg;
						return false;
					}
				break;
				case 'betweenD':
					var reg = /^-?[1-9][0-9]?$/;
					if (!reg.test(data[rule.name])) { this.error = rule.errorMsg; return false; }
					var minMax = rule.checkRule.split(',');
					minMax[0] = Number(minMax[0]);
					minMax[1] = Number(minMax[1]);
					if (data[rule.name] > minMax[1] || data[rule.name] < minMax[0]) {
						this.error = rule.errorMsg;
						return false;
					}
				break;
				case 'betweenF': 
					var reg = /^-?[0-9][0-9]?.+[0-9]+$/;
					if (!reg.test(data[rule.name])){this.error = rule.errorMsg; return false;}
					var minMax = rule.checkRule.split(',');
					minMax[0] = Number(minMax[0]);
					minMax[1] = Number(minMax[1]);
					if (data[rule.name] > minMax[1] || data[rule.name] < minMax[0]) {
						this.error = rule.errorMsg;
						return false;
					}
				break;
				case 'same':
					if (data[rule.name] != rule.checkRule) { this.error = rule.errorMsg; return false;}
				break;
				case 'notsame':
					if (data[rule.name] == rule.checkRule) { this.error = rule.errorMsg; return false; }
				break;
				case 'email':
					var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
					if (!reg.test(data[rule.name])) { this.error = rule.errorMsg; return false; }
				break;
				case 'phoneno':
					var reg = /^1[0-9]{10,10}$/;
					if (!reg.test(data[rule.name])) { this.error = rule.errorMsg; return false; }
				break;
				case 'zipcode':
					var reg = /^[0-9]{6}$/;
					if (!reg.test(data[rule.name])) { this.error = rule.errorMsg; return false; }
				break;
				case 'reg':
					var reg = new RegExp(rule.checkRule);
					if (!reg.test(data[rule.name])) { this.error = rule.errorMsg; return false; }
				break;
				case 'in':
					if(rule.checkRule.indexOf(data[rule.name]) == -1){
						this.error = rule.errorMsg; return false;
					}
				break;
				case 'notnull':
					if(data[rule.name] == null || data[rule.name].length < 1){this.error = rule.errorMsg; return false;}
				break;
		}
		return true;
	},
	isNumber : function (checkVal){
		var reg = /^-?[1-9][0-9]?.?[0-9]*$/;
		return reg.test(checkVal);
	}
}