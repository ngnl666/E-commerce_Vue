<template>
  <div>
    <Loading :active.sync="isLoading"></Loading>
    <div class="text-right mt-4">
      <button class="btn btn-primary" @click="openCouponModal(true)">
        建立新的優惠券
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th> 名稱 </th>
          <th> 折扣百分比 </th>
          <th> 到期日 </th>
          <th> 是否啟用 </th>
          <th> 編輯 </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, key) in coupons" :key="key">
          <td>{{ item.title }}</td>
          <td>{{ item.percent }}%</td>
          <td>{{ item.due_date | date }}</td> <!--使用 filter 轉換時間格式-->
          <td>
            <span v-if="item.is_enabled === 1" class="text-success"> 啟用 </span>
            <span v-else class="text-muted"> 未起用 </span>
          </td>
          <td>
            <button class="btn btn-outline-primary btn-sm"
              @click="openCouponModal(false, item)"
            > 編輯 </button>
            <button class="btn btn-outline-danger btn-sm"
              @click="deleteModal(item)"
            > 刪除 </button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Page --> <!-- :props進來的名字="原始的資料結構" -->
    <Pagination :pagination="pagination" @calcPage="getCoupons"></Pagination>
    <!-- Modal -->
    <div class="modal fade" id="couponModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">建立優惠券</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="title"> 標題 </label>
              <input type="text" class="form-control" id="title" v-model="tempCoupon.title"
                placeholder=" 請輸入標題 ">
            </div>
            <div class="form-group">
              <label for="coupon_code"> 優惠碼 </label>
              <input type="text" class="form-control" id="coupon_code" v-model="tempCoupon.code"
                placeholder=" 請輸入優惠碼 ">
            </div>
            <div class="form-group">
              <label for="due_date"> 到期日 </label>
              <input type="date" class="form-control" id="due_date"
                v-model="due_date">
            </div>
            <div class="form-group">
              <label for="price"> 折扣百分比 </label>
              <input type="number" class="form-control" id="price"
                v-model="tempCoupon.percent" placeholder=" 請輸入折扣百分比 ">
            </div>
            <div class="form-group">
              <div class="form-check">
                <input class="form-check-input" type="checkbox"
                  :true-value="1"
                  :false-value="0"
                  v-model="tempCoupon.is_enabled" id="is_enabled">
                <label class="form-check-label" for="is_enabled">
                  是否啟用
                </label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary"
              @click="updateCoupon"> 確定 </button>
          </div>
        </div>
      </div>
    </div>
    <!--Delete Modal-->
    <div class="modal fade" id="delCouponModal" tabindex="-1" role="dialog"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content border-0">
                <div class="modal-header bg-danger text-white">
                    <h5 class="modal-title" id="exampleModalLabel">
                    <span>刪除優惠券</span>
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    是否刪除 <strong class="text-danger">{{ tempCoupon.title }}</strong> 優惠券(刪除後將無法恢復)。
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-danger" @click="deleteCoupon">確認刪除</button>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import Pagination from '../Pagination'

export default {
    components:{
        Pagination,  // 由 Pagination.vue 傳入
    },
    data() {
        return {
            coupons:[],
            tempCoupon:{
              title: '',
              is_enabled: 0,
              percent: 100,
              due_date: 0,
              code: '',
            },
            isNew: false,
            isLoading: false,
            pagination: {},
            due_date: new Date(), // 取得日期選單時間 (Wed Jan 13 2021 23:00:30 GMT+0800 (台北標準時間))
        }
    },
    watch: { // 取得日期選單時間後偵測到 due_date 的變化後觸發
      due_date() {
        const vm = this;
        // 把日期選單時間放進 new Date 轉成 timestamp (除1000是為了把 毫秒 轉成 秒)
        const timestamp = Math.floor(new Date(vm.due_date) / 1000);
        vm.tempCoupon.due_date = timestamp;
      },
    },
    methods: {
        getCoupons(page = 1) {
            const vm = this;
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMERPATH}/admin/coupons?page=${page}`;
            vm.isLoading = true;
            this.$http.get(api).then((response) => {
                vm.coupons = response.data.coupons;
                vm.pagination = response.data.pagination;
                vm.isLoading = false;
            });
        },
        openCouponModal(isNew, item) {
            const vm = this;
            if(!isNew){
                vm.tempCoupon = Object.assign({}, item);
                // 2011-10-05T14:48:00.000Z
                const dateAndTime = new Date(vm.tempCoupon.due_date * 1000).toISOString().split('T');
                vm.due_date = dateAndTime[0];
                vm.isNew = false;
            }else{
                vm.tempCoupon = {};
                vm.isNew = true;
            }
            $('#couponModal').modal('show');
        },
        deleteModal(item) {
            var vm = this;
            vm.tempCoupon = Object.assign({}, item);;
            $('#delCouponModal').modal('show');
        },
        updateCoupon() {
            const vm = this;
            let api = `${process.env.APIPATH}/api/${process.env.CUSTOMERPATH}/admin/coupon`;
            let httpMethod = 'post';
            vm.isLoading = true;
            if(!vm.isNew){ // 更新優惠券
                api = `${process.env.APIPATH}/api/${process.env.CUSTOMERPATH}/admin/coupon/${vm.tempCoupon.id}`;
                httpMethod = 'put';
                vm.due_date = new Date(vm.tempCoupon.due_date * 1000); // 更新必須重取得時間
            }
            this.$http[httpMethod](api, { data:vm.tempCoupon }).then((response) => {
                if(response.data.success){
                    console.log(response);
                    vm.isLoading = false;
                    $('#couponModal').modal('hide');
                    vm.getCoupons();
                }        
            });
        },
        deleteCoupon() {
            const vm = this;
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMERPATH}/admin/coupon/${vm.tempCoupon.id}`;
            vm.isLoading = true;
            this.$http.delete(api).then((response) => {
                console.log(response);
                $('#delCouponModal').modal('hide');
                vm.getCoupons();
                vm.isLoading = false;
            });
        },
    },
    created() {
        this.getCoupons();
    },
}
</script>