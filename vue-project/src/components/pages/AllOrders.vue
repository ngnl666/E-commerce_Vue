<template>
    <div>
        <loading :active.sync="isLoading"></loading>
        <table class="table mt-4">
            <thead>
              <th width="120"> 購買時間 </th>
              <th width="200">Email</th>
              <th width="150" class="text-center"> 購買款項 </th>
              <th width="60"> 應付金額 </th>
              <th width="60" class="text-center"> 是否付款 </th>
            </thead>
            <tbody>
                <tr v-for="(item) in orders" :key="item.id">
                    <td>{{item.create_at |date}}</td>
                    <td>{{item.user.email}}</td>
                    <td class="text-center">
                    <ul class="list-unstyled">
                        <li v-for="(product, i) in item.products" :key="i">
                            {{ product.product.title }} 
                            {{ product.qty }}
                            {{ product.product.unit }}
                        </li>
                    </ul>
                    </td>
                    <td class="text-left">{{ item.total | currency }}</td>
                    <td class="text-center">
                        <span v-if="item.is_paid" class="text-success"> 已付款 </span>
                        <span v-else> 尚未付款 </span>
                    </td>
                </tr>
            </tbody>
        </table>
        <!-- Page --> <!-- :props進來的名字="原始的資料結構" -->
        <Pagination :pagination="pagination" @calcPage="getAllOrders"></Pagination>
    </div>
</template>

<script>
import Pagination from '../Pagination'

export default {
    components:{
        Pagination, // 由 Pagination.vue 傳入
    },
    data() {
        return {
            isLoading: false,
            pagination: {},
            orders: [],
        }
    },
    methods: {
        getAllOrders(page = 1) {
            const vm = this;
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMERPATH}/admin/orders?page=${page}`;
            vm.isLoading = true;
            this.$http.get(api).then((response) => {
                console.log(response);
                vm.orders = response.data.orders;
                vm.pagination = response.data.pagination;
                vm.isLoading = false;
            });
        },
    },
    created() {
        this.getAllOrders();
    },
}
</script>