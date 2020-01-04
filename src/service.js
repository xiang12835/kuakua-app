// 管理账号信息
const USERS_KEY = 'USERS_KEY';
const STATE_KEY = 'STATE_KEY';

const getUserId = function () {
    let users = getUsers();

    // [{"userId":"201911240124454262825497","account":"18811356921","password":"9cb3a277e2581a2d3e90169523c7b67c"}]
	let userId = "201911240124454262825497";
	if (users.length != 0) {
		userId = users[0].userId;
	}
	
    return userId;
};

const getUsers = function () {
    let ret = '';
    ret = uni.getStorageSync(USERS_KEY);
    if (!ret) {
        ret = '[]';
    }
    return JSON.parse(ret);
}

const addUser = function (userInfo) {
    let users = [];

    users.push({
        userId: userInfo.userId,
        account: userInfo.account,
        password: userInfo.password
    });

    uni.setStorageSync(USERS_KEY, JSON.stringify(users));
}

export default {
    getUsers,
    addUser,
    getUserId,
}
