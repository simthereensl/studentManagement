<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-form class="addStudent" :inline="true" :model="studentForm" ref="studentForm">
                    <el-form-item label="学号" prop="id" :rules="[
                    { required: true, message: '学号不能为空'},
                    { type: 'number', message: '学号必须为数字值'}
                    ]">
                        <el-input type="id" v-model.number="studentForm.id" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名" prop="name" :rules="[
                    { required: true, message: '姓名不能为空'},
                    ]">
                        <el-input type="name" v-model="studentForm.name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password" :rules="[
                    { required: true, message: '密码不能为空'},
                    ]">
                        <el-input type="password" v-model="studentForm.password" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-button type="primary" @click="addStudent('studentForm')" size="mini" class="add">添加</el-button>
                    <el-upload action="" :file-list="fileList" class="el-upload" :http-request="uploadFile">
                        <el-button type="primary" size="mini" class="upload">点击上传</el-button>
                    </el-upload>
                </el-form>
            </el-col>
        </el-row>
        <el-row>
            <el-col>
                <el-card style="height: 70vh">
                    <el-table :data="stuData.slice((currentPage-1)*pageSize,currentPage*pageSize)" style="width: 100%">
                        <el-table-column prop="id" label="学号" width="180">
                        </el-table-column>
                        <el-table-column prop="name" label="姓名" width="180">
                        </el-table-column>
                        <el-table-column prop="password" label="密码">
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button size="mini" @click="stuEdit(scope.$index, scope.row)">编辑</el-button>
                                <el-button size="mini" type="danger" @click="stuDelete(scope.$index, scope.row)">删除
                                </el-button>
                                <el-button size="mini" @click="testCheck(scope.$index, scope.row)">查看</el-button>
                            </template>
                        </el-table-column>
                    </el-table>

                    <el-dialog title="编辑信息" :visible.sync="dialogFormVisible">
                        <el-form :model="editForm">
                            <el-form-item label="学号" :label-width="formLabelWidth">
                                <el-input v-model="editForm.id" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="姓名" :label-width="formLabelWidth">
                                <el-input v-model="editForm.name" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="密码" :label-width="formLabelWidth">
                                <el-input v-model="editForm.password" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogFormVisible = false">取 消</el-button>
                            <el-button type="primary" @click="stuNew">确 定</el-button>
                        </div>
                    </el-dialog>

                    <el-dialog title="查看" :visible.sync="dialogVisibleTest" >
                        <el-table :data="testCheckInfo">
                        <el-table-column prop="info" label="已完成任务">
                        </el-table-column>
                        </el-table>
                        <span slot="footer" class="dialog-footer">
                            <el-button type="primary" @click="dialogVisibleTest = false">确 定</el-button>
                        </span>
                    </el-dialog>

                    <div class="block" style="margin-top:15px;">
                        <el-pagination align='center' @size-change="handleSizeChange"
                            @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5,10,20]"
                            :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
                            :total="stuData.length">
                        </el-pagination>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { addStudent } from '../../../server/index'
import { showStudent } from '../../../server/index'
import {deleteStudent} from '../../../server/index'
import {editStudent} from '../../../server/index'
import { read, utils } from "xlsx";
import {uploadFile} from '../../../server/index'
import {testCheck} from '../../../server/index'
export default {
    data(){
        return {
            studentForm: {
                id: '',
                name: '',
                password: ''
            },
            stuData: [],
            dialogFormVisible: false,
            dialogVisibleTest: false,
            testCheckInfo: [],
            editForm: {
                id: '',
                name: '',
                password: '',
                index: ''
            },
            formLabelWidth: '100px',
            fileList: [], //上传文件列表
            tableHead: [], //表头
            tableData: [],
            currentPage: 1, // 当前页码
            total: 20, // 总条数
            pageSize: 10

        }
    },
    methods:{
        addStudent(studentForm){
           /*  this.$http.post('http://127.0.0.1/addStudent',{
                params: {
                    id: this.studentForm.id,
                    name: this.studentForm.name,
                    password: this.studentForm.password
                }
            }) */
            this.$refs[studentForm].validate((valid) => {
                if (valid) {
                    addStudent({
                        id: this.studentForm.id,
                        name: this.studentForm.name,
                        password: this.studentForm.password
                    }).then(res => {
                        if (res.data.status === 200) {
                            this.studentForm.id = ''
                            this.studentForm.name = ''
                            this.studentForm.password = ''
                            this.show()
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });

        },
        show(){
            showStudent().then(res =>{
               this.stuData = res.data.data
               // console.log(res.data.data);
            })
        },
        stuEdit(index,row){     
            this.dialogFormVisible = true
            this.editForm.id = row.id
            this.editForm.name = row.name
            this.editForm.password = row.password
            this.editForm.index = index
        },
        stuNew(){
             editStudent({
                id: this.editForm.id,
                name: this.editForm.name,
                password: this.editForm.password,
                index: this.editForm.index
            }).then(res =>{
                if(res.data.status === 100){
                    this.dialogFormVisible = false
                    this.show()
                }
            })
        },
        stuDelete(index,row){
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                 deleteStudent({
                    id: row.id
                }).then(res => {
                    if (res.status === 200) {
                        this.$message.success('删除成功')
                        this.show()
                    }else{
                        return this.$message.error('删除失败')
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        uploadFile(params) {
            const file = params.file
            const fileReader = new FileReader();
            fileReader.onload = ev => {
                try {
                    const data = ev.target.result;
                    const workbook = read(data, { type: "binary" });
                    const params = [];
                    // 取对应表生成json表格内容
                    workbook.SheetNames.forEach(item => {
                        params.push({
                            name: item,
                            dataList: utils.sheet_to_json(workbook.Sheets[item])
                        });
                        this.tableData.push(utils.sheet_to_json(workbook.Sheets[item]));
                    });
                    // 该算法仅针对表头无合并的情况
                    if (this.tableData.length > 0) {
                        // 获取excel中第一个表格数据tableData[0][0]，并且将表头提取出来
                        for (const key in this.tableData[0][0]) {
                            this.tableHead.push(key);
                        }
                    }
                    console.log(this.tableData[0]);
                    new Promise((resolve,reject) =>{
                        uploadFile(this.tableData[0]).then(res => {
                            if (res.status === 200) {
                                console.log('添加成功');
                            }
                        })
                        setTimeout(()=>{
                            resolve()
                        },1000)
                    }).then(()=>{
                        this.show();
                    })
                    // return params;
                    // 重写数据
                } catch (e) {
                    console.log("error:" + e);
                    return false;
                }
            };
            fileReader.readAsBinaryString(file);
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.currentPage = 1;
            this.pageSize = val;
        },
        //当前页改变时触发 跳转其他页
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.currentPage = val;
        },
        testCheck(index,row){
            testCheck({
                stuId: row.id
            }).then(res =>{
                if(res.status === 200){
                    this.testCheckInfo = res.data.data
                    this.dialogVisibleTest = true
                    console.log(res.data.data);
                }
            })
        }
    },
    mounted: function(){
        this.show()
    }
}
</script>

<style>

</style>