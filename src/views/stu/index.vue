<template>
    <el-row>
        <el-col :span="10" class="stu">
            <el-card class="box-card1">
                <div slot="header" class="clearfix">
                    <span>任务列表{{$route.query.id}}</span>
                </div>
                <div>
                    <el-table :data="info1" style="width: 100%">
                        <el-table-column prop="time" label="发布日期" width="180">
                        </el-table-column>
                        <el-table-column prop="info" label="内容" width="180">
                        </el-table-column>
                        <el-table-column label="操作" prop="complete">
                            <template slot-scope="scope">
                                 <div v-if="scope.row.complete == 1">
                                    <el-button size="mini" @click="show_info1_complete(scope.$index, scope.row)">已完成</el-button>
                                </div>
                                <div v-else>
                                    <el-button size="mini" @click="show_info1(scope.$index, scope.row)">查看</el-button>
                                </div>
                              <!--   <el-tag :type="scope.row.complete === 1 ? 'primary' : 'success'" disable-transitions>
                                    {{scope.row.complete}}</el-tag> -->
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-card>

            <el-dialog title="通知" :visible.sync="dialogVisible1" width="30%">
                <span>{{info1_all}}</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible1 = false">取 消</el-button>
                    <el-button type="primary" @click="finishInfo1">确 定</el-button>
                </span>
            </el-dialog>
            <el-dialog title="通知" :visible.sync="dialogVisible1_complete" width="30%">
                <span>{{info1_all}}</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible1_complete = false">取 消</el-button>
                </span>
            </el-dialog>
        </el-col>
        <el-col :span="10" class="stu1">
            <el-card class="box-card2">
                <div slot="header" class="clearfix">
                    <span>知识点掌握情况</span>
                </div>
                <div>
                    <el-table :data="info2" style="width: 100%">
                        <el-table-column prop="time" label="发布日期" width="180">
                        </el-table-column>
                        <el-table-column prop="info" label="内容" width="180">
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button size="mini" @click="show_info2(scope.$index, scope.row)">查看</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-card>

            <el-dialog title="通知" :visible.sync="dialogVisible2" width="30%">
                <span>{{info2_all}}</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible2 = false">取 消</el-button>
                    <el-button type="primary" @click="dialogVisible2 = false">确 定</el-button>
                </span>
            </el-dialog>
        </el-col>
    </el-row>
</template>

<script>
import '../../assets/css/stuHome.css'
import { insertStuTest } from '../../../server/index'
import { showInfo1 } from '../../../server/index'
import { showInfo2 } from '../../../server/index'
import { finishInfo1 } from '../../../server/index'

export default {
    data(){
        return{
            info1: [],
            info2: [],
            check: [],
            i : 0,
            dialogVisible1: false,
            dialogVisible1_complete: false,
            dialogVisible2: false,
            info1_all: '',
            info2_all: ''
        }
    },
    methods: {
        insertStuTest(){
            insertStuTest({
                stuId: this.$route.query.id
            }).then(res =>{
                
            })
        },
        showInfo1(){
            showInfo1().then(res =>{
                if(res.status === 200)
                    this.info1 = res.data.data
                    console.log(this.info1);
                    for(let item of this.info1){
                        this.check.push(item.complete)
                    }
                    console.log(this.check);
            })
        },
        showInfo2(){
            showInfo2().then(res =>{
                if(res.status === 200)
                    this.info2 = res.data.data
            })
        },
        show_info1(index, row){
            this.dialogVisible1 = true
            this.info1_all = row.info
        },
         show_info1_complete(index, row){
            this.dialogVisible1_complete = true
            this.info1_all = row.info
        },
        show_info2(index, row){
            this.dialogVisible2 = true
            this.info2_all = row.info
        },
       /*   show_info2_complete(index, row){
            this.dialogVisible2_complete = true
            this.info2_all = row.info
        }, */
        finishInfo1(){
            console.log(this.$route.query.id);
            console.log(this.info1_all);
            finishInfo1(
                {
                    stuId: this.$route.query.id,
                    info: this.info1_all
                }
            ).then(res =>{
                if(res.data.status === 200){
                    console.log('已确认');
                }
            })
        }
    },
    mounted(){
        this.insertStuTest()
        this.showInfo1()
        this.showInfo2()
    }
}
</script>

<style>

</style>