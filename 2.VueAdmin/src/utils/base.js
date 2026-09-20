const base = {
    get() {
        return {
            url : "http://localhost:8080/springbootc0as852x/",
            name: "springbootc0as852x",
            // 退出到首页链接
            indexUrl: 'http://localhost:8080/springbootc0as852x/front/dist/index.html'
        };
    },
    getProjectName(){
        return {
            projectName: "饮食营养管理信息系统"
        } 
    }
}
export default base
