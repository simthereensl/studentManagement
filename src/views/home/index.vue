<template>
    <el-row :gutter="20">
        <el-col :span="10" style="margin-top : 20px">
            <el-dialog title="统计任务完成情况" :visible.sync="dialogFormVisible">
                <el-form>
                    <el-form-item label="">
                        <el-input type="textarea" v-model="info"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="exit">取 消</el-button>
                    <el-button type="primary" @click="relTest1">确 定</el-button>
                </div>
            </el-dialog>
            <el-dialog title="统计知识点掌握情况" :visible.sync="dialogVisible">
                <el-form>
                    <el-form-item label="">
                        <el-input type="textarea" v-model="info"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="exit">取 消</el-button>
                    <el-button type="primary" @click="relTest2">确 定</el-button>
                </div>
            </el-dialog>


            <el-card shadow="hover" class="Info">
                <div class="user" slot="header">
                    <img :src="userImg" />
                    <div class="userInfo">
                        <p>Admin</p>
                        <p>超级管理员</p>
                    </div>
                </div>
                <el-popover placement="right" width="290" trigger="click">
                    <el-button size="mini" @click="dialogFormVisible = true">统计任务完成情况</el-button>
                    <el-button size="mini" @click="dialogVisible = true">统计知识点掌握情况</el-button>
                    <el-button slot="reference">发布任务</el-button>
                </el-popover>
            </el-card>
            <el-card style="margin-top : 20px">
                <!--  <div class="title history">
                    <span>历史任务</span>
                </div>
                <el-collapse v-model="activeNames" accordion>
                    <el-collapse-item :title="test.info" :name="test.info" v-for="test in allTest" :key="test.info" @click="test()">
                        <div class="progress">
                            <el-progress :text-inside="true" :stroke-width="20" :percentage="percent"
                                style="width: 350px; margin: 10px 0"></el-progress>
                        </div>
                    </el-collapse-item>
                </el-collapse> -->
                <el-table :data="allTest" style="width: 100%">
                    <el-table-column  label="历史任务" width="200px" prop="info">
                        <!-- <template slot-scope="scope">
                            <el-popover trigger="hover" placement="top">
                                 <el-progress  :percentage="percent"></el-progress>
                                <div slot="reference" class="name-wrapper">
                                    <p>{{ scope.row.info }}</p>
                                </div>
                            </el-popover>
                        </template> -->
                    </el-table-column>
                    <el-table-column label="操作" width="">
                        <template slot-scope="scope">
                            <el-button size="mini"  @click="handleCheck(scope.$index, scope.row)">查看</el-button>
                            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-card>
        </el-col>
        <el-col :span="14">
            <div class="num">
                <el-card v-for="item in countData" :key="item.name" body-style="display: flex; padding: 0">
                    <div class="icon" :style="{background: item.color}">
                        <i :class="'el-icon-' + item.icon"></i>
                    </div>
                    <div class="detail">
                        <p>￥{{item.value}}</p>
                        <p>{{item.name}}</p>
                    </div>
                </el-card>
            </div>
            <el-card style="height: 190px;">
            </el-card>
            <div class="end">
                <el-card style="height: 170px">

                </el-card>
                <el-card style="height: 170px">

                </el-card>
            </div>
        </el-col>
    </el-row>


</template>

<script>
import { relTest1 }  from '../../../server/index'
import { relTest2 }  from '../../../server/index'
import { getTest }  from '../../../server/index'
import { getComplete }  from '../../../server/index'

export default {
    data(){
        return {
            userImg : require('../../assets/img/me.png'),
            tableLabel:{
                name: '商品',
                todayBuy: '今日购买',
                monthBuy: '月购买',
                totalBuy: '总购买'
            },
            countData: [
                {
                    name: '今日支付订单',
                    value: 1234,
                    icon: 'success',
                    color: '#2ec7c9'
                },
                {
                    name: '今日收藏订单',
                    value: 210,
                    icon: 'star-on',
                    color: '#ffb980'
                },
                 {
                    name: '今日未支付订单',
                    value: 230,
                    icon: 's-goods',
                    color: '#5ab1ef'
                },
                {
                    name: '本月支付订单',
                    value: 2234,
                    icon: 'success',
                    color: '#2ec7c9'
                },
                {
                    name: '本月收藏订单',
                    value: 510,
                    icon: 'star-on',
                    color: '#ffb980'
                },
                 {
                    name: '本月未支付订单',
                    value: 630,
                    icon: 's-goods',
                    color: '#5ab1ef'
                }
            ],
            dialogFormVisible: false,
            dialogVisible: false,
            info: '',
            allTest: [],
            activeNames: '',
            percent: 0,
            date: new Date()
        }
    },
    methods:{
        exit(){
            this.dialogFormVisible = false
            this.info = ''
        },
        relTest1(){
            this.getTime()
            this.dialogFormVisible = false
            relTest1({
                info: this.info,
                time: this.date
            }).then(res =>{
                if(res.status === 200){
                    this.$notify({
                        title: '发布成功',
                        type: 'success',
                        duration: 2000
                    });
                }
            })
        },
        relTest2(){
            this.dialogVisible = false
            relTest2({
                info: this.info
            }).then(res =>{
                if(res.status === 200){
                    this.$notify({
                        title: '发布成功',
                        type: 'success',
                        duration: 2000
                    });
                }
            })
        },
        getTime(){
            var time = new Date()
            console.log(time);
            var moment = require("moment");
            this.date = moment(time).format("YYYY-MM-DD")
            console.log(this.date);
        },
        getTest(){
            getTest().then(res =>{
                if(res.status === 200){
                    this.allTest = res.data.data
                    /* getComplete({
                        allTest: this.allTest
                    }).then(res =>{
                        if(res.status === 200){
                            console.log(res.data.data);
                        }
                    }) */
                }
            })
        },
        handleCheck(index,row){
            getComplete({
                        allTest: this.allTest
                    }).then(res =>{
                        if(res.status === 200){
                            console.log(res.data.data);
                        }
                 })
        }
    },
    mounted(){
       // this.getTime()
       this.getTest()
    }
}
</script>

<style>

</style>