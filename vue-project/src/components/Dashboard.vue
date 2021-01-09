<template>
    <div>
        <Navbar></Navbar>
        <Alert></Alert>
        <div class="container-fluid">
            <div class="row">
                <Sidebar></Sidebar>
                <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
                    <router-view></router-view> <!--巢狀 router-view (App.vue 的是第一層)-->
                </main>
            </div>
        </div>
    </div>
</template>

<script>
// 把 Dashboard 拆分出來再分別 import
import Sidebar from './Sidebar' 
import Navbar from './Navbar'
import Alert from './AlertMessage'

export default{
    components:{
        Sidebar,
        Navbar,
        Alert,
    },
    created() {
        // 取出 cookie 內的 token，並把此 token 發送到後端去做驗證，所有的 api 都會套用
        const myToken = document.cookie.replace(/(?:(?:^|.*;\s*)myToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
        this.$http.defaults.headers.common.Authorization = myToken;
    },
};
</script>