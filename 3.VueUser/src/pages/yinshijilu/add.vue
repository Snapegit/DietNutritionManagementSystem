<template>
<div :style='{"width":"100%","padding":"30px calc((100% - 1200px)/2) 40px","margin":"0px auto","position":"relative","background":"#fff"}'>
    <el-form
	  :style='{"border":"1px solid #eee","padding":"30px 0","alignItems":"flex-start","flexWrap":"wrap","background":"#fff","display":"flex","width":"100%","position":"relative"}'
      class="add-update-preview"
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="120px"
    >
          <el-form-item :style='{"width":"100%","padding":"10px","margin":"0 0 10px","background":"none","display":"inline-block"}' label="日期" prop="riqi">
              <el-date-picker
				  :disabled=" false  ||ro.riqi"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  v-model="ruleForm.riqi" 
                  type="date"
                  placeholder="日期">
              </el-date-picker> 
          </el-form-item>
          <el-form-item :style='{"width":"100%","padding":"10px","margin":"0 0 10px","background":"none","display":"inline-block"}'  label="餐次" prop="canci">
            <el-select v-model="ruleForm.canci" placeholder="请选择餐次" :disabled=" false  ||ro.canci" >
              <el-option
                  v-for="(item,index) in canciOptions"
                  :key="index"
                  :label="item"
                  :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :style='{"width":"100%","padding":"10px","margin":"0 0 10px","background":"none","display":"inline-block"}' label="图片" v-if="type!='cross' || (type=='cross' && !ro.tupian)" prop="tupian">
            <file-upload
            tip="点击上传图片"
            action="file/upload"
            :limit="3"
            :multiple="true"
            :fileUrls="ruleForm.tupian?ruleForm.tupian:''"
            @change="tupianUploadChange"
            ></file-upload>
          </el-form-item>
            <el-form-item :style='{"width":"100%","padding":"10px","margin":"0 0 10px","background":"none","display":"inline-block"}' class="upload" v-else label="图片" prop="tupian">
                <img v-if="ruleForm.tupian.substring(0,4)=='http'" class="upload-img" style="margin-right:20px;" v-bind:key="index" :src="ruleForm.tupian.split(',')[0]" width="100" height="100">
                <img v-else class="upload-img" style="margin-right:20px;" v-bind:key="index" v-for="(item,index) in ruleForm.tupian.split(',')" :src="baseUrl+item" width="100" height="100">
            </el-form-item>
          <el-form-item :style='{"width":"100%","padding":"10px","margin":"0 0 10px","background":"none","display":"inline-block"}' label="食物名称" prop="shiwumingcheng">
            <el-select multiple @change="shiwumingchengChange" v-model="ruleForm.shiwumingcheng" placeholder="请选择食物名称" filterable>
              <el-option
                  v-for="(item,index) in shiwumingchengOptions"
                  :key="index"
                  :label="item"
                  :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :style='{"width":"100%","padding":"10px","margin":"0 0 10px","background":"none","display":"inline-block"}' label="蛋白质" prop="alldanbaizhi">
			<el-input-number v-model="ruleForm.alldanbaizhi" placeholder="蛋白质" :disabled="ro.alldanbaizhi"></el-input-number>
          </el-form-item>
          <el-form-item :style='{"width":"100%","padding":"10px","margin":"0 0 10px","background":"none","display":"inline-block"}' label="脂肪" prop="allzhifang">
			<el-input-number v-model="ruleForm.allzhifang" placeholder="脂肪" :disabled="ro.allzhifang"></el-input-number>
          </el-form-item>
          <el-form-item :style='{"width":"100%","padding":"10px","margin":"0 0 10px","background":"none","display":"inline-block"}' label="碳水化合物" prop="alltanshuihuahewu">
			<el-input-number v-model="ruleForm.alltanshuihuahewu" placeholder="碳水化合物" :disabled="ro.alltanshuihuahewu"></el-input-number>
          </el-form-item>
          <el-form-item :style='{"width":"100%","padding":"10px","margin":"0 0 10px","background":"none","display":"inline-block"}' label="膳食纤维" prop="allshanshixianwei">
			<el-input-number v-model="ruleForm.allshanshixianwei" placeholder="膳食纤维" :disabled="ro.allshanshixianwei"></el-input-number>
          </el-form-item>
          <el-form-item :style='{"width":"100%","padding":"10px","margin":"0 0 10px","background":"none","display":"inline-block"}' label="热量" prop="allreliang">
			<el-input-number v-model="ruleForm.allreliang" placeholder="热量" :disabled="ro.allreliang"></el-input-number>
          </el-form-item>
          <el-form-item :style='{"width":"100%","padding":"10px","margin":"0 0 10px","background":"none","display":"inline-block"}' label="维生素" prop="allweishengsu">
			<el-input-number v-model="ruleForm.allweishengsu" placeholder="维生素" :disabled="ro.allweishengsu"></el-input-number>
          </el-form-item>
          <el-form-item :style='{"width":"100%","padding":"10px","margin":"0 0 10px","background":"none","display":"inline-block"}' label="用户账号" prop="yonghuzhanghao">
            <el-input v-model="ruleForm.yonghuzhanghao" 
                placeholder="用户账号" clearable :disabled=" false  ||ro.yonghuzhanghao"></el-input>
          </el-form-item>
          <el-form-item :style='{"width":"100%","padding":"10px","margin":"0 0 10px","background":"none","display":"inline-block"}' label="用户姓名" prop="yonghuxingming">
            <el-input v-model="ruleForm.yonghuxingming" 
                placeholder="用户姓名" clearable :disabled=" false  ||ro.yonghuxingming"></el-input>
          </el-form-item>

      <el-form-item :style='{"width":"100%","padding":"0","margin":"0","textAlign":"center"}'>
        <el-button :style='{"border":"0px solid #eccc19","cursor":"pointer","padding":"0","margin":"0 20px 0 0","color":"#fff","borderRadius":"20px","background":"linear-gradient(to right,#f67536,#f64d36),#f64d36","width":"128px","lineHeight":"40px","fontSize":"14px","height":"40px"}'  type="primary" @click="onSubmit">提交</el-button>
        <el-button :style='{"border":"1px solid #ccc","cursor":"pointer","padding":"0","margin":"0","outline":"none","color":"#666","borderRadius":"20px","background":"none","width":"128px","lineHeight":"40px","fontSize":"14px","height":"40px"}' @click="back()">返回</el-button>
      </el-form-item>
    </el-form>
</div>
</template>

<script>
  export default {
    data() {
	  let self = this
      return {
        id: '',
        baseUrl: '',
        ro:{
				riqi : false,
				canci : false,
				tupian : false,
				shiwumingcheng : false,
				alldanbaizhi : false,
				allzhifang : false,
				alltanshuihuahewu : false,
				allshanshixianwei : false,
				allreliang : false,
				allweishengsu : false,
				yonghuzhanghao : false,
				yonghuxingming : false,
        },
        type: '',
        userTableName: localStorage.getItem('UserTableName'),
        ruleForm: {
          riqi: '',
          canci: '',
          tupian: '',
          shiwumingcheng: '',
          alldanbaizhi: '',
          allzhifang: '',
          alltanshuihuahewu: '',
          allshanshixianwei: '',
          allreliang: '',
          allweishengsu: '',
          yonghuzhanghao: '',
          yonghuxingming: '',
        },
        canciOptions: [],
        shiwumingchengOptions: [],


        rules: {
          riqi: [
          ],
          canci: [
          ],
          tupian: [
          ],
          shiwumingcheng: [
          ],
          alldanbaizhi: [
            { validator: this.$validate.isNumber, trigger: 'blur' },
          ],
          allzhifang: [
            { validator: this.$validate.isNumber, trigger: 'blur' },
          ],
          alltanshuihuahewu: [
            { validator: this.$validate.isNumber, trigger: 'blur' },
          ],
          allshanshixianwei: [
            { validator: this.$validate.isNumber, trigger: 'blur' },
          ],
          allreliang: [
            { validator: this.$validate.isNumber, trigger: 'blur' },
          ],
          allweishengsu: [
            { validator: this.$validate.isNumber, trigger: 'blur' },
          ],
          yonghuzhanghao: [
          ],
          yonghuxingming: [
          ],
        },
		centerType: false,
      };
    },
    computed: {



    },
    components: {
    },
    created() {
		if(this.$route.query.centerType){
			this.centerType = true
		}
	  //this.bg();
      let type = this.$route.query.type ? this.$route.query.type : '';
      this.init(type);
      this.baseUrl = this.$config.baseUrl;
      this.ruleForm.riqi = this.getCurDate()
    },
    methods: {
      getMakeZero(s) {
          return s < 10 ? '0' + s : s;
      },
      // 下载
      download(file){
        window.open(`${file}`)
      },
      // 初始化
      init(type) {
        this.type = type;
        if(type=='cross'){
          var obj = JSON.parse(localStorage.getItem('crossObj'));
          for (var o in obj){
            if(o=='riqi'){
              this.ruleForm.riqi = obj[o];
              this.ro.riqi = true;
              continue;
            }
            if(o=='canci'){
              this.ruleForm.canci = obj[o];
              this.ro.canci = true;
              continue;
            }
            if(o=='tupian'){
              this.ruleForm.tupian = obj[o].split(",")[0];
              this.ro.tupian = true;
              continue;
            }
            if(o=='shiwumingcheng'){
              this.ruleForm.shiwumingcheng = obj[o];
              this.ro.shiwumingcheng = true;
              continue;
            }
            if(o=='alldanbaizhi'){
              this.ruleForm.alldanbaizhi = obj[o];
              this.ro.alldanbaizhi = true;
              continue;
            }
            if(o=='allzhifang'){
              this.ruleForm.allzhifang = obj[o];
              this.ro.allzhifang = true;
              continue;
            }
            if(o=='alltanshuihuahewu'){
              this.ruleForm.alltanshuihuahewu = obj[o];
              this.ro.alltanshuihuahewu = true;
              continue;
            }
            if(o=='allshanshixianwei'){
              this.ruleForm.allshanshixianwei = obj[o];
              this.ro.allshanshixianwei = true;
              continue;
            }
            if(o=='allreliang'){
              this.ruleForm.allreliang = obj[o];
              this.ro.allreliang = true;
              continue;
            }
            if(o=='allweishengsu'){
              this.ruleForm.allweishengsu = obj[o];
              this.ro.allweishengsu = true;
              continue;
            }
            if(o=='yonghuzhanghao'){
              this.ruleForm.yonghuzhanghao = obj[o];
              this.ro.yonghuzhanghao = true;
              continue;
            }
            if(o=='yonghuxingming'){
              this.ruleForm.yonghuxingming = obj[o];
              this.ro.yonghuxingming = true;
              continue;
            }
          }
        }else if(type=='edit'){
			this.info()
		}
        // 获取用户信息
        this.$http.get(this.userTableName + '/session', {emulateJSON: true}).then(res => {
          if (res.data.code == 0) {
            var json = res.data.data;
            if((json.yonghuzhanghao!=''&&json.yonghuzhanghao) || json.yonghuzhanghao==0){
                this.ruleForm.yonghuzhanghao = json.yonghuzhanghao;
				this.ro.yonghuzhanghao = true;
            }
            if((json.yonghuxingming!=''&&json.yonghuxingming) || json.yonghuxingming==0){
                this.ruleForm.yonghuxingming = json.yonghuxingming;
				this.ro.yonghuxingming = true;
            }
          }
        });
        this.canciOptions = "早餐,中餐,晚餐".split(',')
        this.$http.get('option/shiwuyingyang/shiwumingcheng', {emulateJSON: true}).then(res => {
          if (res.data.code == 0) {
            this.shiwumingchengOptions = res.data.data;
          }
        });

		if (localStorage.getItem('raffleType') && localStorage.getItem('raffleType') != null) {
			localStorage.removeItem('raffleType')
			setTimeout(() => {
				this.onSubmit()
			}, 300)
		}
      },
		// 下多随
		shiwumingchengChange (columnValue) {
			let alldanbaizhi = 0
			let allzhifang = 0
			let alltanshuihuahewu = 0
			let allshanshixianwei = 0
			let allreliang = 0
			let allweishengsu = 0
			for(let x in columnValue){
				this.$http.get('follow/shiwuyingyang/shiwumingcheng?columnValue=' + columnValue[x], {emulateJSON: true}).then(res => {
					if (res.data.code == 0) {
						if(res.data.data.danbaizhi){
							alldanbaizhi += Number(res.data.data.danbaizhi)
						}
						this.ruleForm.alldanbaizhi = alldanbaizhi
						if(res.data.data.zhifang){
							allzhifang += Number(res.data.data.zhifang)
						}
						this.ruleForm.allzhifang = allzhifang
						if(res.data.data.tanshuihuahewu){
							alltanshuihuahewu += Number(res.data.data.tanshuihuahewu)
						}
						this.ruleForm.alltanshuihuahewu = alltanshuihuahewu
						if(res.data.data.shanshixianwei){
							allshanshixianwei += Number(res.data.data.shanshixianwei)
						}
						this.ruleForm.allshanshixianwei = allshanshixianwei
						if(res.data.data.reliang){
							allreliang += Number(res.data.data.reliang)
						}
						this.ruleForm.allreliang = allreliang
						if(res.data.data.weishengsu){
							allweishengsu += Number(res.data.data.weishengsu)
						}
						this.ruleForm.allweishengsu = allweishengsu
					}
				})
			}
		},

    // 多级联动参数
      // 多级联动参数
      info() {
        this.$http.get(`yinshijilu/detail/${this.$route.query.id}`, {emulateJSON: true}).then(res => {
          if (res.data.code == 0) {
            this.ruleForm = res.data.data;
            this.ruleForm.shiwumingcheng = this.ruleForm.shiwumingcheng.split(",");
          }
        });
      },
      // 提交
      onSubmit() {
			//更新跨表属性
			var crossuserid;
			var crossrefid;
			var crossoptnum;
			this.$refs["ruleForm"].validate(valid => {
				if(valid) {
					if(this.type=='cross'){
						var statusColumnName = localStorage.getItem('statusColumnName');
						var statusColumnValue = localStorage.getItem('statusColumnValue');
						if(statusColumnName && statusColumnName!='') {
							var obj = JSON.parse(localStorage.getItem('crossObj'));
							if(!statusColumnName.startsWith("[")) {
								for (var o in obj){
									if(o==statusColumnName){
										obj[o] = statusColumnValue;
									}
								}
								var table = localStorage.getItem('crossTable');
								this.$http.post(table+'/update', obj).then(res => {});
							} else {
								crossuserid=Number(localStorage.getItem('frontUserid'));
								crossrefid=obj['id'];
								crossoptnum=localStorage.getItem('statusColumnName');
								crossoptnum=crossoptnum.replace(/\[/,"").replace(/\]/,"");
							}
						}
					}
					if(crossrefid && crossuserid) {
						this.ruleForm.crossuserid=crossuserid;
						this.ruleForm.crossrefid=crossrefid;
						var params = {
							page: 1,
							limit: 10,
							crossuserid:crossuserid,
							crossrefid:crossrefid,
						}
						this.$http.get('yinshijilu/list', {
							params: params
						}).then(res => {
							if(res.data.data.total>=crossoptnum) {
								this.$message({
									message: localStorage.getItem('tips'),
									type: 'error',
									duration: 1500,
								});
								return false;
							} else {
								// 跨表计算


								this.$http.post(`yinshijilu/${this.ruleForm.id?'update':this.centerType?'save':'add'}`, this.ruleForm).then(res => {
									if (res.data.code == 0) {
										this.$message({
											message: '操作成功',
											type: 'success',
											duration: 1500,
											onClose: () => {
												this.$router.go(-1);
											}
										});
									} else {
										this.$message({
											message: res.data.msg,
											type: 'error',
											duration: 1500
										});
									}
								});
							}
						});
					} else {


						this.ruleForm.shiwumingcheng = this.ruleForm.shiwumingcheng.join(",");
						this.$http.post(`yinshijilu/${this.ruleForm.id?'update':this.centerType?'save':'add'}`, this.ruleForm).then(res => {
							if (res.data.code == 0) {
								this.$message({
									message: '操作成功',
									type: 'success',
									duration: 1500,
									onClose: () => {
										this.$router.go(-1);
									}
								});
							} else {
								this.$message({
									message: res.data.msg,
									type: 'error',
									duration: 1500
								});
							}
						});
					}
				}
			});
		},
		// 获取uuid
		getUUID () {
			return new Date().getTime();
		},
		// 返回
		back() {
			this.$router.go(-1);
		},
      tupianUploadChange(fileUrls) {
          this.ruleForm.tupian = fileUrls.replace(new RegExp(this.$config.baseUrl,"g"),"");
      },
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.el-date-editor.el-input {
		width: auto;
	}
	
	.add-update-preview .el-form-item ::v-deep .el-form-item__label {
	  padding: 0 10px 0 0;
	  color: #666;
	  font-weight: 500;
	  width: 120px;
	  font-size: 14px;
	  line-height: 40px;
	  text-align: right;
	}
	
	.add-update-preview .el-form-item ::v-deep .el-form-item__content {
	  margin-left: 120px;
	}
	
	.add-update-preview .el-input ::v-deep .el-input__inner {
	  border: 1px solid #ddd;
	  padding: 0 12px;
	  color: #666;
	  font-size: 14px;
	  border-color: #ddd;
	  border-radius: 0px;
	  box-shadow: 0 0 0px rgba(64, 158, 255, .5);
	  outline: none;
	  background: none;
	  width: auto;
	  border-width: 1px;
	  border-style: solid;
	  min-width: 250px;
	  height: 40px;
	}
	.add-update-preview .el-input-number ::v-deep .el-input__inner {
		text-align: left;
	  border: 1px solid #ddd;
	  padding: 0 12px;
	  color: #666;
	  font-size: 14px;
	  border-color: #ddd;
	  border-radius: 0px;
	  box-shadow: 0 0 0px rgba(64, 158, 255, .5);
	  outline: none;
	  background: none;
	  width: auto;
	  border-width: 1px;
	  border-style: solid;
	  min-width: 250px;
	  height: 40px;
	}
	.add-update-preview .el-input-number ::v-deep .el-input-number__decrease {
		display: none;
	}
	.add-update-preview .el-input-number ::v-deep .el-input-number__increase {
		display: none;
	}
	
	.add-update-preview .el-select ::v-deep .el-input__inner {
	  border-radius: 0px;
	  padding: 0 10px;
	  color: #666;
	  background: none;
	  width: auto;
	  font-size: 14px;
	  border-color: #ddd;
	  border-width: 1px;
	  border-style: solid;
	  min-width: 250px;
	  height: 40px;
	}
	
	.add-update-preview .el-date-editor ::v-deep .el-input__inner {
	  border-radius: 0px;
	  padding: 0 10px 0 30px;
	  color: #666;
	  background: none;
	  width: auto;
	  font-size: 14px;
	  border-color: #ddd;
	  border-width: 1px;
	  border-style: solid;
	  min-width: 250px;
	  height: 40px;
	}
	
	.add-update-preview ::v-deep .el-upload--picture-card {
		background: transparent;
		border: 0;
		border-radius: 0;
		width: auto;
		height: auto;
		line-height: initial;
		vertical-align: middle;
	}
	
	.add-update-preview ::v-deep .upload .upload-img {
	  cursor: pointer;
	  color: #999;
	  font-size: 24px;
	  border-color: #ddd;
	  line-height: 80px;
	  border-radius: 2px;
	  background: none;
	  width: 100px;
	  border-width: 1px;
	  border-style: solid;
	  text-align: center;
	  min-width: 150px;
	  height: 80px;
	}
	
	.add-update-preview ::v-deep .el-upload-list .el-upload-list__item {
	  cursor: pointer;
	  color: #999;
	  font-size: 24px;
	  border-color: #ddd;
	  line-height: 80px;
	  border-radius: 2px;
	  background: none;
	  width: 100px;
	  border-width: 1px;
	  border-style: solid;
	  text-align: center;
	  min-width: 150px;
	  height: 80px;
	}
	
	.add-update-preview ::v-deep .el-upload .el-icon-plus {
	  cursor: pointer;
	  color: #999;
	  font-size: 24px;
	  border-color: #ddd;
	  line-height: 80px;
	  border-radius: 2px;
	  background: none;
	  width: 100px;
	  border-width: 1px;
	  border-style: solid;
	  text-align: center;
	  min-width: 150px;
	  height: 80px;
	}
	
	.add-update-preview .el-textarea ::v-deep .el-textarea__inner {
	  border: 1px solid #ddd;
	  border-radius: 0px;
	  padding: 12px;
	  box-shadow: 0 0 0px rgba(64, 158, 255, .5);
	  outline: none;
	  color: #666;
	  background: none;
	  width: 60%;
	  font-size: 14px;
	  height: 120px;
	}
</style>
