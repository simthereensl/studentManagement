<template>
    <header>
        <div class="l-content">
            <el-button plain icon="el-icon-menu" size="mini" @click="change"></el-button>
            <p>首页</p>
        </div>
        <div class="r-content">
            <el-dropdown trigger="click" size="mini" @command="handleCommand">
                <span class="el-dropdown-link">
                    <img :src="userImg"/>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item command="exit">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </header>
</template>

<script>
export default {
    methods: {
        change(){
            this.$store.commit('change')
        },
        handleCommand(command){
            if(command == 'exit'){
                window.sessionStorage.clear()
                this.$router.push('/login')
            }
        }
    },
    data(){
        return{
            userImg : require('../assets/img/me.png')
        }
    }
}
</script>

<style>

</style>