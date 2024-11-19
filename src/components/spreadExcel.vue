<!--
 * @Author: 张鹏 215683509@qq.com
 * @Date: 2024-11-15 14:23:43
 * @LastEditors: 张鹏 215683509@qq.com
 * @LastEditTime: 2024-11-19 17:07:22
 * @FilePath: /zt-invest-calculate-web/src/components/spreadExcel.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <!-- excel部分 -->
  <div class="spread"
       id="spreadDom">
    <section class="tabs-content"
             v-if="showSpread">
      <div class="titBox">
        <div v-if="isshow == 0">A81-C2经营期数据</div>
        <div v-else>{{ sheetTit }}</div>
        <!-- gq: 表A61.2 并且 !this.isSource，仅在c1 -->
        <template v-if="showvalue && isSource !== 0">
          <el-upload :disabled="isDisabled"
                     class="upload-demo"
                     action="no"
                     ref="uploadFile"
                     :limit="1"
                     :http-request="handleUpload"
                     :on-change="fileChange"
                     :on-success="handleAvatarSuccess"
                     :before-upload="beforeUpload"
                     :show-file-list="false">
            <el-button type="primary"
                       size="mini"
                       style="position: absolute;top: 8px;left: 143px;"
                       :disabled="isDisabled">
              上传附件
            </el-button>
          </el-upload>
          <p style=" position: absolute; left: 258px;cursor: pointer;"
             v-if="fileNameflage">
            <el-tag style="
                margin-left: -30px;
                color: #FFF;
                background: rgb(64, 158, 255);
"
                    @click.stop="download">{{ fileName}}
              <!-- <i style="color: red; padding-left: 9px" @click.stop="delfile">X</i> -->
            </el-tag>
            <el-button type="primary"
                       size="mini"
                       :disabled="isDisabled"
                       @click.stop="delfile">
              删除
            </el-button>
          </p>
        </template>
        <PublishTip :showPrePublish="true"
                    :showPublishing="true"
                    :requestParams="requestParams"
                    v-if="
            isShowTips &&
            ($route.name == 'spread_top_nav' || $route.name == 'spread')
          "></PublishTip>
        <div class="btnBox">
          <div class="explain"
               @click="explainFun">
            <img src="../assets/img/Union.png"
                 alt="" />
            说明
          </div>
          <!-- 查看投模、查看、非C1 -->
          <template v-if="isSource == 0"></template>
          <!-- c1项目、多因子测算工具 -->
          <template v-else>
            <!-- 保存按钮文案变为保存并计算，原保存并计算取消功能，新增复制功能按钮 -->
            <el-button type="primary"
                       @click="saveExcelFun(2)"
                       size="mini"
                       style="margin-left: 10px;"
                       v-if="isOne"
                       :disabled="isDisabled">保存并计算</el-button>
            <el-button type="primary"
                       @click="showCopyDialog"
                       size="mini"
                       style="margin-left: 10px;"
                       v-if="isCopy"
                       :disabled="isDisabled">复制</el-button>
            <!-- <el-button
              type="primary"
              @click="saveExcelFun(1)"
              size="mini"
              style="margin-left: 10px"
              v-if="isTwo"
              :disabled="isDisabled"
              >保存并计算</el-button
            > -->
            <el-button type="primary"
                       @click="delFun"
                       size="mini"
                       style="margin-left: 10px;"
                       v-if="delBtn"
                       :disabled="isDisabledDel">删除因子</el-button>
            <el-button type="primary"
                       @click="insertSpan('add')"
                       size="mini"
                       style="margin-left: 10px;"
                       v-if="addBtn">添加因子</el-button>
            <el-button type="primary"
                       @click="insertSpan('output')"
                       size="mini"
                       style="margin-left: 10px;"
                       v-if="outputBtn">输出因子</el-button>
            <el-button type="primary"
                       @click="analysis()"
                       size="mini"
                       style="margin-left: 10px;"
                       v-if="isThr"
                       :disabled="isDisabled">敏感性分析</el-button>
            <el-button type="primary"
                       @click="editFun()"
                       size="mini"
                       style="margin-left: 10px;"
                       v-if="isEdit"
                       :disabled="isDisabledEdit">编辑</el-button>
          </template>
        </div>
        <!-- <div class="notice" v-if="alertData">
          <el-alert
            :title="alertData.title"
            :type="alertData.type"
            :closable="false"
            show-icon>
          </el-alert>
        </div> -->
      </div>
      <div class="gc-excel"
           id="spreadBox">
        <gc-spread-sheets class="sample-spreadsheets"
                          :newTabVisible="false"
                          @workbookInitialized="initSpread">
          <gc-worksheet></gc-worksheet>
        </gc-spread-sheets>
      </div>
      <div class="status-bar">
        <div id="statusBar"
             class="status-bar-box"></div>
        <div class="full-screen"
             @click="fullScreen"></div>
      </div>
    </section>
    <div class="notice"
         ref="notice"
         v-show="showNotice">
      <div class="notice-header"
           @mouseout="endMove"
           @mousedown="startMove"
           @mousemove="moving"
           @mouseup="endMove">
        <span>说明（鼠标放在此处拖动）</span>
        <div class="close"
             @click="closeNotice">
          <i class="el-icon-close"></i>
        </div>
      </div>
      <div class="notice-body">
        {{ tipInfo }}
      </div>
      <div class="notice-footer">
        <el-button type="primary"
                   size="mini"
                   @click="closeNotice">关闭</el-button>
      </div>
    </div>
    <el-dialog title="编辑"
               :visible.sync="isShowEdit"
               width="30%">
      <span>重新编辑后，分析结果将清空，请确认</span>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="isShowEdit = false">取 消</el-button>
        <el-button type="primary"
                   @click="confirmEdit">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="选择复制源"
               :visible.sync="isShowCopyDialog"
               width="50%"
               class="copy-dialog">
      <div style="margin-bottom: 16px;">请选择复制哪一版本的数据，确定后该版本【当前表单的投模调整项】数据会复制至当前版本</div>
      <el-select v-model="copyVersionCode"
                 placeholder="请选择"
                 size="small"
                 :modal-append-to-body="false">
        <el-option v-for="item in copyOpts"
                   :key="item.versionCode"
                   :label="item.versionName"
                   :value="item.versionCode">
        </el-option>
      </el-select>
      <div class="copy-tip">仅支持复制模型版本号相同且业态组合一致的版本</div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="isShowCopyDialog = false">取 消</el-button>
        <el-button type="primary"
                   @click="copyExcelFun">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { cloneDeep } from "lodash";
import env from "@/utils/env.js";
import "@grapecity/spread-sheets-vue";
import GC from "@grapecity/spread-sheets";
// import * as GC from '@/utils/gc.spread.sheets.all.min'
import "@grapecity/spread-sheets-resources-zh";
// LicenseKey
import * as Excel from "@grapecity/spread-excelio";
// 引入spreadJS初始化样式文件，否则excel无边框spread有边框
import "@grapecity/spread-sheets/styles/gc.spread.sheets.excel2016colorful.css";
// 压缩
import pako from "pako";
// api
import {
  getGcExcelSheetData,
  getGcExcelSheetStyle,
  setGcExcel,
  getTipMessageData,
  setCalculateGcExcel,
  geSheetMappingMap,
  calcSensitivityDataAnalysis,
  queryNodeStatus,
  apiInsertSensitivity,
  apiCalcDynamicSensitivityData,
  delSensitivityData,
  getOperationsBySheetCode,
  screenGetGcExcelSheetData,
  screenGetGcExcelSheetStyle,
  screenGetOperationsBySheetCode,
  screenGetTipMessageData,
  screenSetCalculateGcExcel,
  screenSetGcExcel,
  queryApprove,
  editSensitivityData,
  dChannelCheck,
  saveReturna,
  uploadtable,
  getFile,
  downloadFile,
  delFile,
  getPermissionByVersionType,
  getOtherVersionList,
  copySheetData
} from "@/api/index";
import { queryParams, getColLetter } from "@/utils/index";
import { text } from './test'

GC.Spread.Sheets.LicenseKey = Excel.LicenseKey = process.env.VUE_APP_L_KEY;
GC.Spread.Common.CultureManager.culture("zh-cn");

export default {
  data () {
    return {
      oldDataTable: null,
      showSpread: false,   // 是否显示excel
      spread: null,    // excel对象？
      spreadObj: null,
      spreadData: null,
      spreadStyle: null,
      sheetIndex: null,
      getvalue: null,
      showvalue: false,   // true: sheetName === 'A61.2'|| 'A61.2-土增税模型' || sheetCode == 'A61.2'    
      currentSheet: {
        index: 0,
        name: "",
      },
      eventLog: "",
      editObj: {},
      // 修改后返回的数据
      setGcExcelData: null,
      // 路径返回的数据
      url: this.$route.query,
      // 查询参数
      searchData: [],
      // 小i
      tipInfo: null,
      isPopover: false,
      loadingInstance: null,
      // sheet 名字
      sheetTit: null,
      // 权限
      jurisdiction: {},
      readonly: false,
      hasS0: false,   // A41.4表getOperationsBySheetCode接口返回的数据是否包括S0，如果有S0且有保存权限，则保存时operCode为S0
      // 处理后的sheetName
      sheetCode: null,
      excelStatus: 1,
      commentObj: {},
      // btn
      isDisabled: false,
      isDisabledDel: false,
      // 权限
      menuList: null,
      index: null,
      arr: [],
      // 按钮
      isOne: true,  // 保存按钮  true: sheetName !== "S11.1"  
      isTwo: true,  // 保存并计算按钮  true: sheetName !== "S11.1" -- 功能已取消
      isThr: true,  // 敏感性分析按钮
      isCopy: true, // 复制功能
      // 删除因子
      delBtn: true,

      // 添加因子
      addBtn: true,
      // 小i
      showNotice: false,
      canMove: false,
      translate: {
        x: 0,
        y: 0,
        endX: 0,
        endY: 0,
      },
      // 编辑btn
      isEdit: false,
      isDisabledEdit: false,
      isShowEdit: false,
      // c2,c3,d
      list: [],
      nodeCodeType: null,
      // 其他调整项
      dChannelList: [],
      // 输出因子
      outputBtn: false,
      // 发版提示
      requestParams: {
        query: {},
        channel: "longxin",
        userCode: "",
      },
      isShowTips: false,
      uploadFile: null,
      fileName: "",
      fileNameflage: false,
      filedata: null,
      sheetValue: "",
      uploadAttachments: "上传附件",
      isShowCopyDialog: false,
      copyOpts: [],
      copyVersionCode: '',  // 选中的复制版本code
      changeCellsObj: null,   // 保存变化的单元格--用来判断单元格变化
      changeCells: []  // 保存变化的单元格--用来将公式改变但是值不变的单元格添加到脏数据中
    };
  },
  computed: {
    projectCode () {
      return queryParams("projectCode")
        ? queryParams("projectCode")
        : this.searchData[0];
    },
    versionCode () {
      return queryParams("versionCode")
        ? queryParams("versionCode")
        : this.searchData[1];
    },
    sheetName () {
      return queryParams("sheetName")
        ? decodeURIComponent(queryParams("sheetName"))
        : this.searchData[2];
    },
    alertData () {
      let resp = null;
      if (this.excelStatus == 0) {
        resp = {
          title: "该文档暂时不可编辑",
          type: "error",
        };
      } else if (this.excelStatus == 1) {
        resp = {
          title: "该文档可以编辑",
          type: "success",
        };
      }
      return resp;
    },
    isSource () {   // false  仅在C1
      return queryParams("isSource") ? queryParams("isSource") : null;
    },
    nodeSystem () {
      return queryParams("nodeSystem") ? queryParams("nodeSystem") : null;
    },
    version () {
      return queryParams("version") ? queryParams("version") : null;
    },
    isshow () {  // 是否显示  A81-C2经营期数据    0--显示
      return queryParams("isshow") ? queryParams("isshow") : null;
    },
  },
  watch: {
    spreadData (val) {
      // console.log(val);
      if (val) {
        this.assignObj();
      }
    },
    // spreadStyle (val) {
    //   if (val) {
    //     this.assignObj()
    //   }
    // }
  },
  created () {
    this.getSpreadObj();
    if (queryParams("sheetName")) {
      // this.geSheetMappingMap();
    }
  },
  methods: {
    //删除文件
    delfile () {
      var sheet = this.spread.getSheetFromName(this.currentSheet.name);
      if (
        this.sheetName === "A61.2" &&
        sheet.getValue(6, 9) !== null &&
        sheet.getValue(6, 9) !== 0
      ) {
        return this.$message.warning("J7单元格有调整项，不允许删除附件，若要更新附件，重新上传附件即可")
      }
      this.$confirm("是否确认删除附件？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let query = {
            versionCode: this.versionCode,
          };
          delFile({}, query).then((res) => {
            if (res.code === "200") {
              this.$message.success("删除成功");
              this.fileNameflage = false;
              this.getfile();
            }
          });
          // callBack()
        })
        .catch(() => {

        });

      // let query={
      //   versionCode:this.versionCode
      // }
      // delFile({},query).then(res=>{
      //   if(res.code === '200'){
      //     this.$message.error("删除成功");
      //   }
      // })
    },
    //获取上传文件信息
    getfile () {
      let query = {
        versionCode: this.versionCode,
      };
      getFile({}, query).then((res) => {
        if (res.code === "200") {
          this.fileName = res.data !== null ? res.data.originalFileName : "";
          this.filedata = res.data;
          console.log(this.fileName, "显示附件名称");
          this.fileNameflage = res.data !== null ? true : false;
        }
        console.log(res.data);
      });
    },

    //下载文件
    async download () {
      let query = {
        id: this.filedata.id,
      };
      const res = await downloadFile({}, query);
      console.log(
        res.status,
        res.headers["content-disposition"],
        "返回 的参数"
      );
      //  if (res.status === "200") {
      console.log("判断成功");
      // 获取heads中的filename文件名
      let fileName = res.headers["content-disposition"]
        .split(";")[1]
        .split("filename=")[1];
      console.log(fileName, "文件名");
      fileName = decodeURIComponent(fileName);

      // 获取数据类型
      const type = res.headers["content-type"].split(";")[0];
      console.log(type, "类型");
      const blob = new Blob([res.data], { type: type });
      const a = document.createElement("a");

      // 创建URL
      const blobUrl = window.URL.createObjectURL(blob);
      a.download = fileName;
      a.href = blobUrl;
      document.body.appendChild(a);

      // 下载文件
      a.click();

      // 释放内存
      URL.revokeObjectURL(blobUrl);
      document.body.removeChild(a);
      // } else {
      //   this.$message.error("文件不存在");
      // }
    },
    //文件上传之前
    beforeUpload (file) {
      this.uploadFile = file;
      this.testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      console.log(this.uploadFile, "上传之前");
      // const extension = this.testmsg === "xlsx";
      const isLimit = file.size / 1024 / 1024 < 5;
      // if (!extension) {
      //   this.$message.error("上传文件只能是xlsx格式!");
      // }
      if (!isLimit) {
        this.$message.error("上传文件大小不能超过 5MB!");
      }
      return isLimit;
    },
    //文件上传
    handleUpload (param) {
      console.log(this.projectCode, "项目code", this.versionCode, "版本code");
      let query = {
        versionCode: this.versionCode,
        projectCode: this.projectCode,
      };
      const formData = new FormData();
      this.$nextTick(() => {
        formData.append("file", this.uploadFile);
      });
      // formData.append("file", this.uploadFile);
      console.log(formData, "275", this.uploadFile);
      if (this.filedata === null) {
        uploadtable(formData, query).then((res) => {
          if (res.code === "200") {
            this.$message.success("上传成功");
            this.handleAvatarSuccess();
            this.getfile();
            this.$nextTick(() => {
              this.uploadAttachments = "上传附件";
            });
          } else {
            this.$message.success("上传失败");
          }
        });
      } else {
        this.$confirm("是否确认上传/更新此附件？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            setTimeout(() => {
              uploadtable(formData, query).then((res) => {
                if (res.code === "200") {
                  this.$message.success("上传成功");
                  this.$nextTick(() => {
                    this.uploadAttachments = "上传附件";
                  });
                  this.handleAvatarSuccess();
                  this.getfile();
                } else {
                  this.$message.success("上传失败");
                }
              });
            }, 300);

            // callBack()
          })
          .catch(() => {
            this.handleAvatarSuccess();
          });
      }
    },
    handleAvatarSuccess (res, file) {
      this.$refs.uploadFile.clearFiles();
    },
    // 清除文件浏览器缓存对象
    fileChange (file) {
      const mainImg = this.$refs.uploadFile;
      if (mainImg && mainImg.length) {
        mainImg.forEach((item) => {
          item.clearFiles();
        });
      }
    },
    async getSpreadObj (item) {
      this.getData();
      return
      this.checkChange(() => {
        this.searchData = item ? item.split("/") : [];
        this.spreadData = this.spreadStyle = null;
        this.editObj = {};
        // 每次清空按钮状态
        this.isOne = false;
        this.isTwo = false;
        this.isThr = false;
        this.isCopy = false;
        this.delBtn = false;
        this.addBtn = false;
        this.isEdit = false;
        this.outputBtn = false;
        if (sessionStorage.getItem('isAdmin')) {
          // alert(123)
          // admin
          // 敏感性分析
          // 管理员不需要按钮权限
          // this.isThr =
          //   this.sheetName === "S11.2" || this.sheetName === "S12.1"
          //     ? true
          //     : false;
          // // 删除因子
          // this.delBtn = this.sheetName === "S12.1" ? true : false;
          // // 添加因子
          // this.addBtn = /(A)|(B7)/.test(this.sheetName);
          // // 保存
          // this.isOne = this.sheetName !== "S11.1" ? true : false;
          // // 保存并计算 -- 功能已取消
          // this.isTwo = this.sheetName !== "S11.1" ? true : false;
          // this.showvalue= this.sheetName === 'A61.2' ? true : false;

          let sheetCode =
            this.sheetCode === null ? this.sheetName : this.sheetCode;
          // 判断页面是否可以编辑
          if (
            this.isThr ||
            this.delBtn ||
            this.addBtn ||
            this.isOne ||
            this.isTwo
          ) {
            // 存在btn，进行判断
            if (sheetCode != "C13" && sheetCode.indexOf("S") == -1) {
              this.queryApprove(100);
            } else if (sheetCode.indexOf("S") > -1) {
              this.checkAnalysis();
            } else if (sheetCode == "C13") {
              this.readonly = false;
            }
          }
          // 输出因子仅在C12显示--管理员无权限
          // if (sheetCode == "C12") {
          //   this.outputBtn = true;
          // } else {
          //   this.outputBtn = false;
          // }
          this.getData();
          // this.getStyle()
          this.getInfo();
        } else {
          // alert(345)
          // 权限
          if (
            this.$route.name === "preliminary_screening" ||
            this.$route.name === "preliminary"
          ) {
            // 初筛投摸
            this.screenGetOperationsBySheetCode(this.searchData[3]);
          } else {
            // 获取此sheet页权限相关信息
            this.getOperationsBySheetCode(this.searchData[3]);
            // c1投模获取c2/c3/d航道的sheet
            if (this.$route.name === "castMould") {
              this.list = [];
              this.sheetListFun(this.$store.state.menuData.tmck);
            }
          }
        }
      });
    },
    // 获取数据和样式
    async getData () {

      // const objData = {
      //   projectCode: this.projectCode,
      //   versionCode: this.versionCode,
      //   sheetName:
      //     this.sheetCode === null
      //       ? encodeURIComponent(this.sheetName)
      //       : encodeURIComponent(this.sheetCode),
      // };
      // // console.log(this.sheetName, 295);
      // const res =
      //   this.$route.name === "preliminary_screening" ||
      //     this.$route.name === "preliminary"
      //     ? await screenGetGcExcelSheetData({}, objData)
      //     : await getGcExcelSheetData({}, objData);
      const res = text
      if (res.code === "200") {
        // 解压处理
        var strData = atob(res.data);
        // 返回指定位置的字符的 Unicode 编码
        var charData = strData.split("").map(function (x) {
          return x.charCodeAt(0);
        });
        // 数组类型表示一个8位无符号整型数组
        const typeArrData = new Uint8Array(charData);
        // pako解压  decodeURIComponent解码 获取最终obj数据
        const obj = JSON.parse(
          decodeURIComponent(pako.inflate(typeArrData, { to: "string" }))
        );
        console.log(obj);
        // 去掉返回目录
        if (obj.data.dataTable[0] && obj.data.dataTable[0][0]) {
          obj.data.dataTable[0][0].value =
            obj.data.dataTable[0][0].value == "返回目录"
              ? ""
              : obj.data.dataTable[0][0].value;
        }
        // 拼接的最终格式
        const spreadObj = {
          version: "14.1.1",
          sheetCount: 1,
          sheets: {},
        };
        this.currentSheet.name = obj.name;
        this.currentSheet.index = obj.index;
        obj.index = 0;
        // this.initData(obj.data.dataTable)
        this.oldDataTable = cloneDeep(obj.data.dataTable);
        spreadObj.sheets[this.currentSheet.name] = obj;
        this.spreadData = spreadObj;
      } else {
        this.spread = null;
        this.hideExcel();
      }
    },
    // 获取样式--不用这个获取样式了
    async getStyle () {
      const objData = {
        projectCode: this.projectCode,
        versionCode: this.versionCode,
        sheetName:
          this.sheetCode === null
            ? encodeURIComponent(this.sheetName)
            : encodeURIComponent(this.sheetCode),
      };

      const res =
        this.$route.name === "preliminary_screening" ||
          this.$route.name === "preliminary"
          ? await screenGetGcExcelSheetStyle({}, objData)
          : await getGcExcelSheetStyle({}, objData);
      if (res.code === "200") {
        // 解压
        var strData = atob(res.data);
        var charData = strData.split("").map(function (x) {
          return x.charCodeAt(0);
        });
        const typeArrData = new Uint8Array(charData);
        const obj = JSON.parse(
          decodeURIComponent(pako.inflate(typeArrData, { to: "string" }))
        );
        this.spreadStyle = obj;
      } else {
        this.hideExcel();
      }
    },
    initData (data) {
      // console.log('initData');
      // data中对象转换为空
      for (const row in data) {
        const rowData = data[row];
        for (const col in rowData) {
          if (typeof rowData[col].value == "object") {
            rowData[col].value = "";
          } else if (String(rowData[col].value).indexOf("OADate") >= 0) {
            // 日期格式
            rowData[col].value = rowData[col].value.match(/\((.+?)\)/)[1];
          }
        }
      }
    },
    // 合并data和style
    assignObj () {
      console.log("this.spreadData", this.spreadData);
      // if (this.spreadData && this.spreadStyle) {
      if (this.spreadData) {
        this.showSpread = true;
        const sheetName =
          this.sheetCode === null ? this.sheetName : this.sheetCode;
        // excel不可编辑：1.readonly=true 2.龙头跳转（查看投模） 3.龙头跳转（敏感性因子，除S12.1外其他sheet）
        console.log("合并data和style", this.readonly);
        // 只读情况下锁定样式，不能修改
        if (
          this.readonly ||
          this.isSource == 0 ||
          (this.isSource == 1 && this.sheetName != "S12.1")
        ) {
          // this.lockStyle(this.spreadStyle.namedStyles)
          this.lockStyle(this.spreadData.sheets[sheetName].namedStyles);
        }

        this.spreadObj = this.spreadData;
        console.log(this.spreadObj);
        // console.log(this.spreadObj)
        // this.spreadObj.sheets[sheetName].namedStyles = this.spreadStyle.namedStyles
        // this.spreadObj.sheets[sheetName].data.columnDataArray = this.spreadStyle.data.columnDataArray
        // this.spreadObj.sheets[sheetName].data.sparklineGroups = this.spreadStyle.data.sparklineGroups
        // this.spreadObj.sheets[sheetName].data.rowDataArray = this.spreadStyle.data.rowDataArray
        // 主题
        // this.spreadObj.sheets[sheetName].theme = this.spreadStyle.theme
        // 下拉选择
        // this.spreadObj.sheets[sheetName].validations = this.spreadStyle.validations
        // 合并单元格
        // this.spreadObj.sheets[sheetName].spans = this.spreadStyle.spans
        // 分组
        // this.spreadObj.sheets[sheetName].rowOutlines = this.spreadStyle.rowOutlines
        // this.spreadObj.sheets[sheetName].columnOutlines = this.spreadStyle.columnOutlines
        // 是否受保护
        // this.spreadObj.sheets[sheetName].isProtected = this.spreadStyle.isProtected

        // this.spreadObj.sheets[sheetName].zoomFactor = 1

        // const styleDataTable = this.spreadStyle.data.dataTable
        // const spreadDataTable = this.spreadObj.sheets[sheetName].data.dataTable
        // 合并
        // for (const row in styleDataTable) {
        //   if (spreadDataTable[row]) {
        //     const styleRowData = styleDataTable[row]
        //     const spreadDataRowData = spreadDataTable[row]
        //     for (const col in styleRowData) {
        //       delete styleRowData[col].value
        //       if (spreadDataRowData[col]) {
        //         Object.assign(spreadDataRowData[col], styleRowData[col])
        //       } else {
        //         spreadDataRowData[col] = styleRowData[col]
        //       }
        //     }
        //   } else {
        //     spreadDataTable[row] = styleDataTable[row]
        //   }
        // }
        this.spreadData = null;
        if (this.spread) {
          this.changeCellsObj = null
          this.changeCells = []
          this.drawExcel();
        }
      }
    },
    // 隐藏excel
    hideExcel () {
      this.checkChange(() => {
        this.showSpread = false;
      });
    },
    // 显示excel
    openExcel () {
      this.showSpread = this.spreadObj !== null;
    },
    // 初始化spread
    initSpread: function (spread) {
      console.log('initSpread');
      this.spread = spread;
      this.changeCellsObj = null
      this.changeCells = []
      this.drawExcel();
    },
    // 渲染excel
    drawExcel () {
      const jsonOptions = {
        ignoreFormula: false,
        ignoreStyle: false,
        frozenColumnsAsRowHeaders: false,
        frozenRowsAsColumnHeaders: false,
        doNotRecalculateAfterLoad: true,
      };
      this.spread.suspendPaint();  // 暂停spread重绘,挂起活动表单和标签条的绘制
      this.spread.fromJSON(this.spreadObj, jsonOptions);  // 从指定的JSON字符串加载对象状态
      // console.log(this.spreadObj);
      const sheet = this.spread.getActiveSheet();  // 获取活跃表单，返回活跃表单实例
      // spread.options.backColor = 'white';
      this.spread.options.grayAreaBackColor = 'white';
      let code = this.sheetCode === null ? this.sheetName : this.sheetCode;
      if (code === 'B70.1') {
        // 设置单元格日期格式    单元格范围：  D5:E90
        sheet.getRange(4, 3, 86, 2).formatter('yyyy/M/d')
      }
      var _this = this;

      // 监听剪切板
      sheet.bind(
        GC.Spread.Sheets.Events.ClipboardPasting,
        function (sender, args) {
          if (args.pasteData.image) {
            // 图片
            args.cancel = true;
          } else if (
            args.pasteData.text &&
            args.pasteData.text.indexOf("!") != -1 &&
            args.pasteData.text.indexOf("=") != -1
          ) {
            // 跨sheet公式
            _this.$message.warning("禁止输入跨sheet公式");
            args.cancel = true;
          }
        }
      );

      // 监听单元格失去焦点
      sheet.bind(GC.Spread.Sheets.Events.EditEnding, function (sender, args) {
        // 禁止输入跨sheet公式
        if (
          args.editingText != null &&
          args.editingText.indexOf("!") != -1 &&
          args.editingText.indexOf("=") != -1
        ) {
          let oldVal = sheet.getValue(args.row, args.col);
          let oldFormula = sheet.getFormula(args.row, args.col);
          setTimeout(function () {
            sheet.setFormula(args.row, args.col, oldFormula);
            sheet.setValue(args.row, args.col, oldVal);
            _this.$message.warning("禁止输入跨sheet公式");
          }, 0);
        }

        // 除编辑按钮外可以点击
        setTimeout(() => {
          _this.isDisabled = false;
          _this.isDisabledDel = false;
        }, 200);

        _this.$nextTick(() => {
          console.log(_this.sheetName, sheet.getValue(6, 9), "表单名称");
          _this.sheetValue = sheet.getValue(6, 9);
          if (
            _this.sheetName === "A61.2" &&
            sheet.getValue(6, 9) !== null &&
            sheet.getValue(6, 9) !== 0 &&
            _this.fileName === ''
          ) {
            _this.$message.warning("J7单元格不为0，请上传线下测算底稿或证明文件");
          }
          // console.log('失去获取值',sheet.getValue(6,9),sheet.getText(6,9))
        });
      });

      // 监听单元格聚焦，即开始编辑
      sheet.bind(GC.Spread.Sheets.Events.EditStarting, function (sender, args) {
        console.log(_this.isDisabled, "查看");
        // 下拉选项禁止输入，判断该单元格是否有数据验证
        if (sheet.getDataValidator(args.row, args.col) != undefined) {
          // =3，下拉选项
          if (sheet.getDataValidator(args.row, args.col).type() == 3) {
            //  除编辑按钮外不可以点击
            _this.isDisabled = false;
            _this.isDisabledDel = false;
            // 锁定单元格
            args.cancel = true;
          }
        } else {
          //  除编辑按钮外不可以点击
          _this.isDisabled = true;
          _this.isDisabledDel = true;
        }
      });

      // 监听单元格改变事件: 单元格进行更改时发生，该更改可能需要重新绘制该单元格----但是不能监听到键盘delete事件
      sheet.bind(GC.Spread.Sheets.Events.CellChanged, function (e, info) {
        console.log('info', info);
        info.newValue = info.newValue == null ? sheet.getText(info.row, info.col) : info.newValue
        _this.changeCellsObj = _this.changeCellsObj ? _this.changeCellsObj : {}
        _this.changeCells = _this.changeCells ? _this.changeCells : []
        // 将值发生变化的单元格保存到changeCellsObj中
        if (_this.changeCellsObj[info.row + '-' + info.col]) {
          // 之前保存过的单元格，判断新值和原来保存的初始旧值是否一致，如果不一致则更换新值为当前的新值，一致则删除这个保存的单元格
          if (info.newValue !== _this.changeCellsObj[info.row + '-' + info.col].oldVal) {
            _this.changeCellsObj[info.row + '-' + info.col].newVal = info.newValue
            let obj = _this.changeCells.filter(item => item.row === info.row && item.col === info.col)[0]
            obj.newValue = info.newValue
          } else {
            _this.changeCells = _this.changeCells.filter(item => !(item.row === info.row && item.col === info.col))
            delete _this.changeCellsObj[info.row + '-' + info.col]
          }
        } else {
          // 如果之前没保存就保存，格式为  info.row+'-'+info.col : {oldVal: info.oldValue, newVal: info.newValue} 
          _this.changeCellsObj[info.row + '-' + info.col] = {
            'oldVal': info.oldValue,
            'newVal': info.newValue
          }
          _this.changeCells.push({
            row: info.row,
            col: info.col,
            oldValue: info.oldValue,
            newValue: info.newValue
          })
        }
        // console.log('监听changeCells', _this.changeCells);
      })

      // 表单被保护，可以用protectionOptions限制用户行为
      sheet.options.protectionOptions = {
        allowResizeRows: true,       // 允许改变行高
        allowResizeColumns: true,    // 允许改变列宽
        allowOutlineRows: true,      // 允许展开或折叠行组
        allowOutlineColumns: true,   // 允许展开或折叠列组
      };

      // 状态栏显示
      const barDom = document.getElementById("statusBar");
      barDom.innerHTML = "";
      const statusBar = new GC.Spread.Sheets.StatusBar.StatusBar(barDom);
      statusBar.bind(this.spread);

      // 是否显示标签栏
      this.spread.options.tabStripVisible = false;

      // 公式禁止计算
      // sheet.suspendCalcService()

      this.spread.resumePaint();   // 恢复活动表单和标签条的绘制

      // 设置滚动条
      this.spread.options.scrollbarMaxAlign = true;
      this.spread.options.scrollbarShowMax = false;
      // 迭代计算
      this.spread.options.iterativeCalculation = false;
    },
    // 获取小i
    getInfo () {
      const obj = {
        sheetCode:
          this.sheetCode === null
            ? encodeURIComponent(this.sheetName)
            : encodeURIComponent(this.sheetCode),
      };
      // 每次清除禁用状态
      this.isDisabled = false;
      if (
        this.$route.name === "preliminary_screening" ||
        this.$route.name === "preliminary"
      ) {
        screenGetTipMessageData({}, obj).then((res) => {
          if (res.code === "200") {
            this.tipInfo = res.data === "" ? "无" : res.data;
          }
        });
      } else {
        getTipMessageData({}, obj).then((res) => {
          if (res.code === "200") {
            this.tipInfo = res.data === "" ? "无" : res.data;
          }
        });
      }
    },
    // 锁定
    lockStyle (arr) {
      arr.forEach((item) => {
        item.locked = true;
      });
    },
    // gq: 点击保存/保存并计算 先判断是否存在循环计算    -- 保存并计算功能已取消  保存按钮文案变为保存并计算
    saveExcelFun (e) {
      let loopLen = this.spread.getCircularReference();  // 获取工作簿中的所有循环引用单元格信息,返回对象数组
      if (loopLen.length == 0) {
        this.saveExcel(e);
      } else {
        this.$message.error("excel中存在循环计算，请修改后再操作");
      }
    },
    // 保存
    async saveExcel (e) {
      this.spreadData = null;
      var sheet = this.spread.getSheetFromName(this.currentSheet.name);  // 获取具有指定名称的表单
      var dirtyCells = sheet.getDirtyCells();  // 获取已编辑过的单元格集合, 获取所有脏数据：通常只有单元格值的变更才导致其成为脏数据，该单元格所在行也将是脏数据,脏数据状态不会因为撤销状态而改变（如果改变了原值又恢复了原值仍然是脏数据）
      // console.log('changeCells', this.changeCells);  // 所有单元格变化的，包括公式单元格
      // 添加公式单元格的公式变化但是值不改变的单元格：this.changeCells有但是dirtyCells没有该单元格
      if (dirtyCells.length == 0) {
        this.changeCells.length > 0 && dirtyCells.push(...this.changeCells)
      } else {
        this.changeCells.length > 0 && this.changeCells.forEach(item => {
          const flag = dirtyCells.some(cell => (cell.row == item.row && cell.col == item.col))
          if (!flag) {
            dirtyCells.push(item)
          }
        })
      }
      // console.log('dirtyCells', dirtyCells); 
      let status = true;
      let dateErrorTip = [];
      dirtyCells.forEach((item) => {
        // 获取此表单中指定单元格中的公式，参数：行索引，列索引，返回公式字符串
        const formula = sheet.getFormula(item.row, item.col);
        if (formula != null) {
          item.formula = formula;
        }
        const formatter = sheet.getFormatter(item.row, item.col);  // 获取单元格格式化，返回指定单元格的单元格格式化字符串或对象
        let code =
          this.sheetCode === null
            ? encodeURIComponent(this.sheetName)
            : encodeURIComponent(this.sheetCode);
        // (手动输入 || 手动输入 || 从其他地方复制粘贴)
        if (
          formatter.indexOf("年") >= 0 ||
          formatter.indexOf("yyyy/") >= 0 ||
          (String(item.newValue).indexOf("GMT+0800") > -1 &&
            formatter == "General" &&
            code == "S11.2") ||
          (RegExp(/年/).test(String(item.newValue)) &&
            formatter == "General" &&
            code == "S11.2")
        ) {
          // 修改的是日期类型
          const newVal = String(item.newValue);
          if (newVal != "#REF!" && newVal != "") {
            // console.log(newVal, 'OADate')
            if (newVal.indexOf("OADate") >= 0) {
              // OADate类型
              sheet.tag(newVal);
              item.newValue = sheet.tag();
            } else {
              // console.log(newVal, 'OADate other')
              const formatVal = newVal
                .replace(/-/g, "/")
                .replace(/年/g, "/")
                .replace(/月/g, "/")
                .replace(/日/g, "/");
              // console.log(formatVal, 'OADate other after')
              const dateResp =
                formatVal !== "null" && formatVal != ""
                  ? new Date(formatVal)
                  : null;
              // console.log(dateResp, 'result')
              if (dateResp == "Invalid Date") {
                status = false;
                const colLetter = getColLetter(item.col);
                dateErrorTip.push(`${colLetter}${item.row + 1}`);
              } else {
                item.newValue = dateResp;
              }
            }
          }
        }
      });
      if (!status) {
        this.$message.warning(`单元格${dateErrorTip}输入日期格式为：xxxx-xx-xx`);
        return false;
      }

      // return false

      // 配合安全漏洞，保存按钮code
      sessionStorage.setItem("operCode", e === 2 ? ((['A41.1', 'A41.4', 'A54.2', 'A61.1', 'A61.2', 'A61.4', 'A61.5', 'A62', 'A71.2'].includes(this.sheetName) && this.hasS0) ? 'S0' : "S") : "SC");
      // return false
      if (dirtyCells.length == 0) {
        this.$message.warning("未修改任何数据，无需保存");
      } else if (
        this.sheetValue &&
        this.sheetName === "A61.2" &&
        this.fileName === ""
      ) {
        this.$message.warning("请先上传附件再保存");
      }
      else {
        // 告知点击完成
        if (
          this.nodeSystem == "dChannel" &&
          this.$route.name == "spread_top_nav"
        ) {
          this.informCompletion();
        }
        // 完成
        const data = {
          sheetName:
            this.sheetCode === null
              ? encodeURIComponent(this.sheetName)
              : encodeURIComponent(this.sheetCode),
          dataTable: dirtyCells,
          projectCode: this.projectCode,
          versionCode: this.versionCode,
        };
        // return false
        if (e === 2) {
          // 保存
          var resSave =
            this.$route.name === "preliminary_screening" ||
              this.$route.name === "preliminary"
              ? await screenSetGcExcel(data)
              : await setGcExcel(data);
        } else {
          // 保存并计算 -- 功能已取消
          var resSave =
            this.$route.name === "preliminary_screening" ||
              this.$route.name === "preliminary"
              ? await screenSetCalculateGcExcel(data)
              : await setCalculateGcExcel(data);
        }
        if (resSave.code === "200") {
          // 将监听的变化的单元格置空
          this.changeCellsObj = null
          this.changeCells = []

          console.log("保存/保存并计算接口返回成功");
          this.setGcExcelData = resSave.data;
          this.$message.success(e === 2 ? "保存成功" : "保存并计算成功");
          zhuge.track(
            "excel按钮",
            {
              button_name: e === 2 ? "保存" : "保存并计算",
            },
            function () {
              console.log(e === 2 ? "埋点：保存" : "埋点：保存并计算");
            }
          );
        }

        // 解压修改后返回的数据
        var strData = atob(this.setGcExcelData);
        var charData = strData.split("").map(function (x) {
          return x.charCodeAt(0);
        });
        const typeArrData = new Uint8Array(charData);
        const obj = JSON.parse(
          decodeURIComponent(pako.inflate(typeArrData, { to: "string" }))
        );
        // this.initData(obj.data.dataTable)

        this.oldDataTable = cloneDeep(obj.data.dataTable);
        const spreadObj = {
          version: "15.1.4",
          sheetCount: 1,
          sheets: {},
        };
        this.currentSheet.name = obj.name;
        this.currentSheet.index = obj.index;
        obj.index = 0;
        spreadObj.sheets[this.currentSheet.name] = obj;
        this.spreadData = spreadObj;
      }
    },
    // 告知完成
    informCompletion () {
      const obj = {
        versionCode: this.version,
        nodeSystem: this.nodeSystem,
      };
      console.log("告知完成", obj);
      saveReturna({}, obj);
    },
    // 添加因子 输出因子
    async insertSpan (id) {
      const sheet = this.spread.getActiveSheet();
      const selections = sheet.getSelections();

      if (selections.length == 0) {
        this.$message.warning("请选择一个单元格");
        return false;
      } else if (selections.length > 1) {
        this.$message.warning("只能选择一个单元格");
        return false;
      } else if (selections[0].rowCount > 1 || selections[0].colCount > 1) {
        this.$message.warning("只能选择一个单元格");
        return false;
      }

      // 添加因子
      if (
        sheet.getActualStyle(selections[0].row, selections[0].col).backColor !=
        "rgb(238,243,253)" &&
        sheet.getActualStyle(selections[0].row, selections[0].col).backColor !=
        "rgb(246,249,253)" &&
        sheet.getActualStyle(selections[0].row, selections[0].col).backColor !=
        "rgb(247,250,253)" &&
        id == "add"
      ) {
        this.$message.warning("该单元格不能选择");
        return false;
      }

      // 输出因子
      if ((selections[0].col != 5 || selections[0].row < 4) && id == "output") {
        this.$message.warning("只可选择投委会下单元格");
        return false;
      }

      /*const status = sheet.getRange(selections[0].row, selections[0].col).locked()
      if (status) {
        this.$message.warning('请选择未被锁定的单元格')
        return false
      }*/

      // 配合安全漏洞，按钮code
      sessionStorage.setItem("operCode", id == "add" ? "AF" : "SCYZ");

      const selectObj = {
        row: selections[0].row,
        col: selections[0].col,
        value: sheet.getValue(selections[0].row, selections[0].col),
        name:
          id == "add"
            ? null
            : sheet.getValue(selections[0].row, selections[0].col - 3), // 评价指标的值，规格模板变化告知，前端修改
        sheetCode: this.sheetCode || this.sheetName,
        versionCode: this.versionCode,
      };

      const res = await apiInsertSensitivity(selectObj);
      if (res.code == 200) {
        this.$message.success(id == "add" ? "插入成功" : "输出成功");
        if (id == "add") {
          zhuge.track(
            "excel按钮",
            {
              button_name: "插入",
            },
            function () {
              console.log("埋点：插入");
            }
          );
        }
        return false;
      }
    },
    // 全屏
    fullScreen () {
      const excelDom = document.getElementById("spreadBox");
      if (excelDom.requestFullscreen) {
        excelDom.requestFullscreen();
      } else if (excelDom.msRequestFullscreen) {
        excelDom.msRequestFullscreen();
      } else if (excelDom.mozRequestFullScreen) {
        excelDom.mozRequestFullScreen();
      } else if (excelDom.webkitRequestFullscreen) {
        excelDom.webkitRequestFullscreen();
      }
    },
    // 检查Excel是或否有变化，是否有已编辑的单元格，如果有先提示后操作回调函数
    checkChange (callBack, id) {
      let status = true;
      if (this.spread) {
        // 获取脏单元格集合，已编辑的单元格
        const dirtyCells = this.spread.getActiveSheet()
          ? this.spread.getActiveSheet().getDirtyCells()
          : [];
        // 添加公式单元格的公式变化但是值不改变的单元格
        if (dirtyCells.length == 0) {
          this.changeCells.length > 0 && dirtyCells.push(...this.changeCells)
        } else {
          this.changeCells.length > 0 && this.changeCells.forEach(item => {
            const flag = dirtyCells.some(cell => (cell.row == item.row && cell.col == item.col))
            if (!flag) {
              dirtyCells.push(item)
            }
          })
        }

        if (dirtyCells.length > 0) {
          if (id === 1) {
            this.$confirm(
              "存在未保存数据。请先保存，后进行敏感性分析",
              "提示",
              {
                // confirmButtonText: '继续',
                cancelButtonText: "取消",
                type: "warning",
              }
            )
              .then(() => {
                // callBack()
              })
              .catch(() => { });
          } else {
            this.$confirm(
              "存在未保存数据。如果继续，此数据将丢失。 是否继续?",
              "提示",
              {
                confirmButtonText: "继续",
                cancelButtonText: "取消",
                type: "warning",
              }
            )
              .then(() => {
                callBack();
              })
              .catch(() => { });
          }
        } else {
          callBack();
        }
      } else {
        callBack();
      }
    },
    // 与龙头的映射
    geSheetMappingMap () {
      geSheetMappingMap().then((res) => {
        if (res.code === "200") {
          res.data.map((item) => {
            if (item.sheetCodeLt === this.sheetName) {
              // 返回代号
              this.sheetCode = item.sheetCode;
              sessionStorage.setItem("compCode", item.menu_code);
            } else if (item.sheetCode === this.sheetName) {
              // 直接是sheetCode
              sessionStorage.setItem("compCode", item.menu_code);
            }
          });
          this.getSpreadObj();
        }
      });
    },
    // 敏感性分析
    analysis () {
      this.checkChange(() => {
        this.analysisFun();
      }, 1);
    },
    async analysisFun () {
      sessionStorage.setItem("operCode", "SA");
      let code =
        this.sheetCode === null
          ? encodeURIComponent(this.sheetName)
          : encodeURIComponent(this.sheetCode);
      const res =
        code === "S11.2"
          ? await calcSensitivityDataAnalysis({}, this.versionCode)
          : await apiCalcDynamicSensitivityData({}, this.versionCode);
      if (res.code === "200") {
        this.$message.success("敏感性分析开始，请等待");
        zhuge.track(
          "excel按钮",
          {
            button_name:
              code === "S11.2" ? "S11.2敏感性分析" : "S12.1敏感性分析",
          },
          function () {
            console.log(
              code === "S11.2"
                ? "埋点：S11.2敏感性分析"
                : "埋点：S12.1敏感性分析"
            );
          }
        );
        this.isDisabledDel = true;
        this.excelProhibit();
      } else {
        this.isDisabledDel = false;
      }
    },
    // 检查敏感性分析状态
    async checkAnalysis () {
      let code =
        this.sheetCode === null
          ? encodeURIComponent(this.sheetName)
          : encodeURIComponent(this.sheetCode);
      let query = {
        versionCode: this.versionCode,
        nodeSystem: code == "S11.2" ? "sensitivity" : "DynamicSensitivity",
        versionType: code == "S11.2" ? "sensitivity" : "DynamicSensitivity",
      };
      const res = await queryNodeStatus({}, query);

      if (res.code === "200") {
        // S11.2 - 1,2 不可以编辑  0,3   可编辑
        // S12.1 - 1   不可以编辑  0,2,3 可编辑
        if (res.data == 1) {
          this.readonly = true;
          console.log("检查敏感性分析状态-1", this.readonly);
          this.isDisabled = true;
          this.isDisabledDel = true;
        } else if (res.data == 2) {
          this.isDisabledDel = false;
          if (code == "S11.2" && !this.isSource) {
            // !this.isSource，仅在c1
            this.readonly = true;
            console.log("检查敏感性分析状态-2", this.readonly);
            this.isDisabled = true;
            this.isEdit = true;
            this.$message.success("若想进行编辑，请点击[编辑]按钮");
          } else {
            this.readonly = false;
            console.log("检查敏感性分析状态-3", this.readonly);
            this.isDisabled = false;
          }
        } else {
          this.readonly = false;
          console.log("检查敏感性分析状态-4", this.readonly);
          this.isDisabled = false;
          this.isDisabledDel = false;
        }
        this.getData();
      }
    },
    // 禁止状态
    excelProhibit () {
      // btn
      this.isDisabled = true;
      // excel
      const sheet = this.spread.getActiveSheet();
      this.spread.suspendPaint();
      sheet.suspendEvent();
      sheet
        .getRange(0, 0, sheet.getRowCount(), sheet.getColumnCount())
        .locked(true);
      sheet.resumeEvent();
      this.spread.resumePaint();
    },
    // 点击查看小i
    explainFun () {
      this.showNotice = true;
    },
    closeNotice () {
      this.showNotice = false;
    },
    startMove (event) {
      const moveDom = this.$refs.notice;
      this.canMove = true;
      this.translate.x = event.clientX;
      this.translate.y = event.clientY;
    },
    moving (event) {
      if (this.canMove) {
        const moveDom = this.$refs.notice;
        const moveX = event.clientX - this.translate.x + this.translate.endX;
        const moveY = event.clientY - this.translate.y + this.translate.endY;
        moveDom.style.transform = "translate(" + moveX + "px, " + moveY + "px)";
      }
    },
    endMove (event) {
      const transArr = this.$refs.notice.style.transform.split(",");
      if (transArr.length > 1) {
        this.translate.endX = parseInt(transArr[0].split("(")[1]);
        this.translate.endY = parseInt(transArr[1]);
      }
      this.canMove = false;
    },
    // 非admin权限 非初筛投摸 获取sheet页相关信息：btn，name，num-表格(A41.4)
    async getOperationsBySheetCode (num) {
      // console.log('getOperationsBySheetCode');
      let _this = this;
      let obj = {
        sheetCode: this.sheetCode === null ? this.sheetName : this.sheetCode,
      };
      if (this.$store.state.menuArr.length != 0) {
        // c1，龙头跳转（查看投模，多因子测算）
        this.$store.state.menuArr.some((item, index) => {
          if (item.menuName == obj.sheetCode) {
            sessionStorage.setItem("compCode", item.menuCode);
          }
        });
      } else {
        // 龙头内嵌
      }
      // 配合安全漏洞，按钮code
      sessionStorage.setItem("operCode", "R");
      const res = await getOperationsBySheetCode(obj, {});
      console.log(res, "1401");
      if (res.code === "200") {
        // 有登录权限，无菜单，显示无权限
        if (res.data === null) {
          this.$router.push("/noRights");
        } else {
          // 发版提示
          this.requestParams.userCode = res.data.userName;
          this.isShowTips = true;
          // spreadNav 无btn + 锁定，所以不需要判断btn  仅在C1
          if (this.isSource != 0) {
            this.sheetTit = res.data.sheetName;
            // 无按钮则无编辑excel权限
            if (
              res.data.operations.length === 1 &&
              res.data.operations[0] == "R"
            ) {
              this.readonly = true;
              console.log("无按钮则无编辑excel权限", this.readonly);
              this.getData();
            } else {
              this.readonly = false;
              console.log(
                "有按钮",
                this.readonly,
                res.data.sheetName,
                "左侧菜单"
              );
              this.showvalue = obj.sheetCode === "A61.2";
              if (this.showvalue) {
                this.getfile();
              }
              // 存储是否包含S，
              const hasS = res.data.operations.includes('S')
              res.data.operations.map(async (item) => {
                if (item === "SC") {
                  // 保存并计算，多因子测算跳转除S12.1外不展示 -- 功能已取消
                  this.isTwo =
                    this.isSource == 1 && this.sheetName != "S12.1"
                      ? false
                      : true;
                } else if (item === "S") {
                  // 保存，多因子测算跳转除S12.1外不展示
                  this.isOne =
                    this.isSource == 1 && this.sheetName != "S12.1"
                      ? false
                      : true;
                } else if (item === "SA") {
                  // 敏感性分析，多因子测算的S11.2跳转不展示
                  this.isThr =
                    this.isSource == 1 && this.sheetName == "S11.2"
                      ? false
                      : true;
                  // 判断该sheet页面敏感性分析状态
                  this.checkAnalysis();
                  // 有按钮，但是红绿灯页面，根据完成状态来判断，优先级小
                  if (num == 1) {
                    this.readonly = true;
                    console.log(
                      "有按钮，但是红绿灯页面，根据完成状态来判断，优先级小",
                      this.readonly
                    );
                    this.$nextTick(() => {
                      this.isDisabled = true;
                    });
                  }
                } else if (item === "AF") {
                  // 添加因子
                  this.addBtn = true;
                } else if (item === "DF") {
                  // 删除因子
                  this.delBtn = true;
                } else if (item === "SCYZ") {
                  // 输出因子
                  this.outputBtn = true;
                } else if (item === 'S0' && !hasS && !this.isSource) {
                  // 如果既有S又有S0，则以S为准，只有C1中有S0的时候走此逻辑
                  // a41.4表  保存按钮权限：S0时在请求权限接口  返回1-有权限  0-没有权限
                  // isSource == null 是龙头嵌套的表单，isSource == 0 是龙头点击查看投模进入的，isSource == 1 是龙头的敏感性指标里的多因子测算工具点击进来的
                  this.hasS0 = true
                  // 只在C1并且是这些表中走此逻辑 如果用户只有 S0 则下面这边表单只有试算版可以编辑
                  if (['A41.1', 'A41.4', 'A54.2', 'A61.1', 'A61.2', 'A61.4', 'A61.5', 'A62', 'A71.2'].includes(this.sheetName)) {
                    const { code, data } = await getPermissionByVersionType(this.versionCode)
                    if (code == '200') {
                      this.isOne = data == 1
                    }
                  }
                }
              });
              // 如果operations里有CP 并且有保存的权限，就显示复制按钮
              if (this.isOne && res.data.operations.includes('CP')) {
                this.isCopy = true
              } else {
                this.isCopy = false
              }
              if (this.$route.name.indexOf("preliminary") > -1) {
                // 初筛
                // 有按钮，但是红绿灯页面，根据完成状态来判断，优先级小
                if (num == 1) {
                  this.readonly = true;
                  console.log(
                    "有按钮，但是红绿灯页面，根据完成状态来判断，优先级小-初筛",
                    this.readonly
                  );
                  this.$nextTick(() => {
                    this.isDisabled = true;
                  });
                }
                // this.getData()
              } else {
                // 投模
                let sheetCode =
                  this.sheetCode === null ? this.sheetName : this.sheetCode;
                // C13-内嵌和C1是否可编辑放开，S表单只需检查敏感性分析状态
                if (sheetCode != "C13" && sheetCode.indexOf("S") == -1) {
                  let result = this.list.some((item) => {
                    if (sheetCode === item.sheetCode) {
                      this.nodeCodeType = item.nodeSystem;
                      return true;
                    }
                  });
                  let dChannelResult = this.dChannelList.some((item) => {
                    if (sheetCode === item.sheetCode) {
                      return true;
                    }
                  });
                  if (result) {
                    // c2/c3/d
                    this.queryNodeStatus();
                  } else if (
                    dChannelResult ||
                    (this.isSource == null && this.nodeSystem == "dChannel")
                  ) {
                    // dChannel
                    this.dChannelCheck();
                  } else {
                    this.queryApprove(num);
                  }
                } else if (sheetCode == "C13") {
                  // excel可以编辑
                  this.readonly = false;
                  this.getData();
                  console.log("C13", this.readonly);
                } else if (sheetCode == "A61.2") {
                  this.showvalue = true;
                }
              }
            }
          } else if (this.isSource == 0) {
            // spreadNav
            this.getData();
          }
          // this.getData()
          // this.getStyle()
          this.getInfo();
        }
      }
    },
    // 查看权限  
    // gq: 查看是否可编辑  返回0  或者num == 1  都不可编辑
    queryApprove (num) {
      let obj = {
        projectCode: this.projectCode,
        versionCode: this.versionCode,
      };
      queryApprove(obj, {}).then((res) => {
        if (res.code === "200") {
          if (res.data == 0) {
            // 0-不可编辑，1-可编辑
            this.readonly = true;
            // console.log("查看权限-0", this.readonly);
            this.$nextTick(() => {
              this.isDisabled = true;
            });
          } else {
            if (num == 1) {
              // console.log("queryApprove锁定");
              this.readonly = true;
              // console.log("查看权限", this.readonly);
              this.$nextTick(() => {
                this.isDisabled = true;
              });
            }
          }
        }
        this.getData();
      });
    },
    // S12.1删除
    async delFun () {
      const sheet = this.spread.getActiveSheet();
      const selections = sheet.getSelections();
      // 需求规定可删除区域单元格(8,J)-(8,BD) (6&7,DK)-(6&7,FF)
      if (selections.length == 0) {
        this.$message.warning("请选择一个单元格");
        return false;
      } else if (selections.length > 1) {
        this.$message.warning("只能选择一个单元格");
        return false;
      } else if (selections[0].rowCount > 1 || selections[0].colCount > 1) {
        if (
          selections[0].colCount == 1 &&
          selections[0].rowCount == 2 &&
          selections[0].row == 6 &&
          selections[0].col > 112 &&
          selections[0].col < 162
        ) {
        } else {
          this.$message.warning("只能选择一个单元格");
          return false;
        }
      }
      if (
        (selections[0].row == 7 &&
          selections[0].col > 8 &&
          selections[0].col < 56) ||
        (selections[0].row == 6 &&
          selections[0].col > 112 &&
          selections[0].col < 162)
      ) {
      } else {
        this.$message.warning("该单元格不可删除");
        return false;
      }

      // 配合安全漏洞，按钮code
      sessionStorage.setItem("operCode", "DF");

      const obj = {
        row: selections[0].row,
        col: selections[0].col,
        versionCode: this.versionCode,
      };
      // return false
      const res = await delSensitivityData(obj, {});
      if (res.code === "200") {
        this.$message.success("删除成功");
        // 埋点
        zhuge.track(
          "excel按钮",
          {
            button_name: "S12.1删除因子",
          },
          function () {
            console.log("埋点：S12.1删除因子");
          }
        );
        this.getData();
        return false;
      }
    },
    // 初筛投摸：获取sheet页相关信息：btn，name
    async screenGetOperationsBySheetCode (num) {
      let obj = {
        sheetCode: this.sheetCode === null ? this.sheetName : this.sheetCode,
      };
      const res = await screenGetOperationsBySheetCode(obj, {});
      if (res.code === "200") {
        if (res.data === null) {
          this.$router.push("/noRights");
        } else {
          this.sheetTit = res.data.sheetName;
          // 无按钮则无编辑excel权限
          if (
            res.data.operations.length === 1 &&
            res.data.operations[0] == "R"
          ) {
            this.readonly = true;
          } else {
            // 有按钮，但是红绿灯页面，根据完成状态来判断
            if (num == 1) {
              this.readonly = true;
              this.$nextTick(() => {
                this.isDisabled = true;
              });
            }
            res.data.operations.map((item) => {
              if (item == "S") {
                // 保存
                this.isOne = true;
              } else if (item == "SC") {
                // 保存并计算 -- 功能已取消
                this.isTwo = true;
              } else {
                // 其他
                sessionStorage.setItem("operCode", "R");
              }
            });
          }
          this.getData();
          // this.getStyle()
          this.getInfo();
        }
      }
    },
    // 获取c2/c3/d  dChannel 航道sheet
    sheetListFun (arr) {
      arr.map((item) => {
        if (item.list) {
          // 1级/2级
          if (item.list.length == 0) {
            // 末级
            if (
              item.nodeCodeType == "c2" ||
              item.nodeCodeType == "c3" ||
              item.nodeCodeType == "d1" ||
              item.nodeCodeType == "d2" ||
              item.nodeCodeType == "d3" ||
              item.nodeCodeType == "c7"
            ) {
              this.list.push({
                sheetCode: item.sheetCode,
                nodeSystem: item.nodeCodeType,
              });
            } else if (item.nodeCodeType == "dChannel") {
              this.dChannelList.push({
                sheetCode: item.sheetCode,
                nodeSystem: item.nodeCodeType,
              });
            }
          } else {
            this.sheetListFun(item.list);
          }
        } else {
          // 末级
          if (
            item.nodeCodeType == "c2" ||
            item.nodeCodeType == "c3" ||
            item.nodeCodeType == "d1" ||
            item.nodeCodeType == "d2" ||
            item.nodeCodeType == "d3" ||
            item.nodeCodeType == "c7"
          ) {
            this.list.push({
              sheetCode: item.sheetCode,
              nodeSystem: item.nodeCodeType,
            });
          } else if (item.nodeCodeType == "dChannel") {
            this.dChannelList.push({
              sheetCode: item.sheetCode,
              nodeSystem: item.nodeCodeType,
            });
          }
        }
      });
    },
    // c2/c3/d 查看状态
    queryNodeStatus () {
      const query = {
        versionCode: this.versionCode,
        nodeSystem: this.nodeCodeType,
        versionType: "calc",
      };
      queryNodeStatus({}, query).then((res) => {
        if (res.code === "200") {
          // console.log(res.data,"查看数据")
          // if(res.data === 2){
          //   console.log('可编辑')
          // }else if(res.data === 1){
          //   this.excelProhibit()
          // }
          this.queryApprove(Math.abs(res.data));
        }
      });
    },
    // dChannel 查看状态
    dChannelCheck () {
      dChannelCheck({}, this.versionCode).then((res) => {
        if (res.code === "200") {
          this.queryApprove(res.data);
        }
      });
    },
    // 编辑，打开确认编辑的二次弹窗
    editFun () {
      this.isShowEdit = true;
    },
    // 确定编辑
    confirmEdit () {
      let obj = {
        versionCode: this.versionCode,
      };
      editSensitivityData(obj, {}).then((res) => {
        if (res.code == 200) {
          this.isShowEdit = false;
          this.isDisabled = false;
          this.isDisabledEdit = true;
          this.readonly = this.readonly ? false : this.readonly; // 若编辑前页面为锁定状态，则改为解锁状态
          console.log("编辑", this.readonly);
          const sheet = this.spread.getActiveSheet();
          this.spread.suspendPaint();
          sheet.suspendEvent();
          // 仅开放需求要求可编辑部分
          sheet.getRange(6, 2, 300, 8).locked(false); // row: 7-306  col: C-J
          sheet.getRange(4, 12, 302, 20).locked(false); // row: 5-306  col: M-AF
          sheet.getRange(1, 4, 2, 4).locked(false); // row: 2-3  col: E-H
          sheet.getRange(3, 2, 2, 1).locked(false); // row: 4-5  col: C
          sheet.resumeEvent();
          this.spread.resumePaint();
        }
      });
    },

    // 点击打开复制弹窗
    async showCopyDialog () {
      this.isShowCopyDialog = true
      this.copyOpts = []
      this.copyVersionCode = ''
      const res = await getOtherVersionList({
        version: this.versionCode  // 版本
      })
      if (res.code == 200) {
        this.copyOpts = res.data
      }
    },
    // 复制版本
    async copyExcelFun () {

      if (this.copyVersionCode == '') {
        return this.$message.warning("请选择要复制的版本");
      }
      let sheetCode = this.sheetCode === null ? this.sheetName : this.sheetCode
      const res = await copySheetData({
        sourceVersionCode: this.copyVersionCode, // 选择复制的版本
        targetVersionCode: this.versionCode, // 当前版本
        sheetCode: sheetCode // 表单code，不是表单名称，类似 A12
      })
      if (res.code == 200) {
        // 清空监听的变化的单元格
        this.changeCellsObj = null
        this.changeCells = []
        this.$message.success("复制版本成功");
        this.setGcExcelData = res.data;

        zhuge.track(
          "excel按钮",
          {
            button_name: "复制",
          },
          function () {
            console.log("埋点：复制");
          }
        );
      }
      this.isShowCopyDialog = false
      // 解压修改后返回的数据
      var strData = atob(this.setGcExcelData);
      var charData = strData.split("").map(function (x) {
        return x.charCodeAt(0);
      });
      const typeArrData = new Uint8Array(charData);
      const obj = JSON.parse(
        decodeURIComponent(pako.inflate(typeArrData, { to: "string" }))
      );
      // this.initData(obj.data.dataTable)

      this.oldDataTable = cloneDeep(obj.data.dataTable);
      const spreadObj = {
        version: "15.1.4",
        sheetCount: 1,
        sheets: {},
      };
      this.currentSheet.name = obj.name;
      this.currentSheet.index = obj.index;
      obj.index = 0;
      spreadObj.sheets[this.currentSheet.name] = obj;
      this.spreadData = spreadObj;

      if (obj.name === "A61.2") {
        this.getfile();
      }
    }
  },
};
</script>

<style lang="scss" scoped>
#spreadDom {
  height: 80vh;
}

.spread {
  position: relative;
  height: 100%;
  overflow: hidden;
  background-color: #FFF;

  /* excel */
  .tabs-content {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    overflow: hidden;

    .titBox {
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
      width: 100%;
      height: 43px;
      margin: 0 auto 12px;
      padding: 0 12px;
      font-size: 14px;
      line-height: 43px;
      background-color: #FFF;
      border-bottom: 1px solid #EAEAEA;
      // position: relative;
      .btnBox {
        position: relative;
        z-index: 1;
        display: flex;
        align-items: center;
        font-size: 14px;
      }

      .btnBox img {
        position: absolute;
        top: 15px;
        left: -15px;
        width: 13px;
        height: 13px;
      }

      .explain:hover {
        // display: block;
        cursor: pointer;
      }
    }

    .gc-excel {
      position: absolute;
      top: 55px;
      right: 0;
      bottom: 15px;
      left: 0;

      .sample-spreadsheets {
        width: 100%;
        height: 100%;
      }
    }

    .status-bar {
      display: flex;
      height: 15px;
      background: #F3F2F1;

      .status-bar-box {
        flex: 1;
      }

      .full-screen {
        width: 15px;
        height: 15px;
        margin-left: 10px;
        background: url(../assets/img/full-screen.png) no-repeat center;
        background-size: contain;
        cursor: pointer;
      }
    }
  }

  .popover {
    max-height: 40vh;
    overflow-y: auto;
    font-size: 14px;
    white-space: pre-line;
  }

  .notice {
    position: fixed;
    top: 10%;
    right: 0;
    left: 0;
    z-index: 10;
    width: 50%;
    margin: auto;
    background: #FFF;
    box-shadow: 0 1px 3px rgb(0 0 0 / 30%);
    transform: translate(0, 0);

    .notice-header {
      position: relative;
      padding: 20px 20px 10px;
      cursor: move;
      user-select: none;

      .close {
        position: absolute;
        top: 20px;
        right: 20px;
        width: 16px;
        height: 16px;
        cursor: pointer;
      }
    }

    .notice-body {
      min-height: 50px;
      padding: 30px 20px;
      font-size: 14px;
      line-height: 180%;
      white-space: pre-line;
      word-break: break-all;
    }

    .notice-footer {
      padding: 10px 20px 20px;
      text-align: right;
    }
  }

  .copy-tip {
    margin-top: 6px;
    color: #999;
    font-size: 12px;
  }
}
</style>