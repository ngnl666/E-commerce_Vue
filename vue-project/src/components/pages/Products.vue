<template>
    <div>
        <loading :active.sync="isLoading"></loading>
        <div class="text-right mt-4">
            <button class="btn btn-primary"
                    @click="openModal(true)">
                    建立新的產品
            </button>
        </div>
        <!-- itemTable -->
        <table class="table mt-4 mb-5">
            <thead>
                <tr>
                    <th width="140">分類</th> <!--欄寬固定-->
                    <th>產品名稱</th>
                    <th width="150">原價</th>
                    <th width="150">售價</th>
                    <th width="110">是否啟用</th>
                    <th width="140">編輯</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,key) in products" :key="key">
                    <td>{{ item.category }}</td>
                    <td>{{ item.title }}</td>
                    <td>
                        {{ item.origin_price | currency }}
                    </td>
                    <td>
                        {{ item.price | currency }}
                    </td>
                    <td class="pl-3">
                        <span v-if="item.is_enabled" class="text-success">啟用</span>
                        <span v-else>未啟用</span>
                    </td>
                    <td>
                        <button class="btn btn-outline-primary btn-sm"
                                @click="openModal(false, item)">
                                編輯
                        </button>
                        <button class="btn btn-outline-danger btn-sm"
                                @click="deleteModal(item)">
                                刪除
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <!-- Page --> <!-- :props進來的名字="原始的資料結構" -->
        <Pagination :pagination="pagination" @calcPage="getProducts"></Pagination>
        <!-- Modal -->
        <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
        aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content border-0">
                    <div class="modal-header bg-dark text-white">
                        <h5 class="modal-title" id="exampleModalLabel">
                            <span>新增產品</span>
                        </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-sm-4">
                                <div class="form-group">
                                    <label for="image">輸入圖片網址</label>
                                    <input type="text" class="form-control" id="image"
                                        v-model="tempProduct.imageUrl"
                                        placeholder="請輸入圖片連結">
                                </div>
                                <div class="form-group">
                                    <label for="customFile">或 上傳圖片
                                        <i class="fas fa-spinner fa-spin" v-if="status.fileUploading"></i>
                                    </label>
                                    <input type="file" id="customFile" class="form-control"
                                        ref="files" @change="uploadFile">
                                </div>
                                <img :src="tempProduct.imageUrl" class="img-fluid" alt="">
                            </div>
                            <div class="col-sm-8">
                                <div class="form-group">
                                    <label for="title">標題</label>
                                    <input type="text" class="form-control" id="title"
                                        v-model="tempProduct.title"
                                        placeholder="請輸入標題">
                                </div>

                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="category">分類</label>
                                        <input type="text" class="form-control" id="category"
                                        v-model="tempProduct.category"
                                        placeholder="請輸入分類">
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="price">單位</label>
                                        <input type="unit" class="form-control" id="unit"
                                        v-model="tempProduct.unit"
                                        placeholder="請輸入單位">
                                    </div>
                                </div>

                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="origin_price">原價</label>
                                        <input type="number" class="form-control" id="origin_price"
                                        v-model="tempProduct.origin_price"
                                        placeholder="請輸入原價">
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="price">售價</label>
                                        <input type="number" class="form-control" id="price"
                                        v-model="tempProduct.price"
                                        placeholder="請輸入售價">
                                    </div>
                                </div>
                                <hr>

                                <div class="form-group">
                                    <label for="description">產品描述</label>
                                    <textarea type="text" class="form-control" id="description"
                                        v-model="tempProduct.description"
                                        placeholder="請輸入產品描述"></textarea>
                                </div>
                                <div class="form-group">
                                    <label for="content">說明內容</label>
                                    <textarea type="text" class="form-control" id="content"
                                        v-model="tempProduct.content"
                                        placeholder="請輸入產品說明內容"></textarea>
                                </div>
                                <div class="form-group">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox"
                                        v-model="tempProduct.is_enabled"
                                        :true-value="1"
                                        :false-value="0"
                                        id="is_enabled">
                                        <label class="form-check-label" for="is_enabled">
                                        是否啟用
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary" @click="updateProduct">確認</button>
                    </div>
                </div>
            </div>
        </div>
        <!--Delete Modal-->
        <div class="modal fade" id="delProductModal" tabindex="-1" role="dialog"
        aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content border-0">
                    <div class="modal-header bg-danger text-white">
                        <h5 class="modal-title" id="exampleModalLabel">
                        <span>刪除產品</span>
                        </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        是否刪除 <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-danger" @click="deleteProduct">確認刪除</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
//import $ from 'jquery' // 需先載入 jquery
import Pagination from '../Pagination'

export default {
    components:{
        Pagination,  // 由 Pagination.vue 傳入
    },
    data() {
        return{
            products: [],
            pagination: {},
            tempProduct: {},
            isNew: false,
            isLoading: false,
            status: {
                fileUploading: false, // 區域註冊 loading
            },
        };
    },
    methods: {
        getProducts(page = 1) { // es6 參數預設值(沒帶參數則使用此預設值)
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMERPATH}/admin/products?page=${page}`;
            const vm = this;
            vm.isLoading = true;
            this.$http.get(api).then((response) => {
                vm.products = response.data.products;
                vm.isLoading = false;
                vm.pagination = response.data.pagination;
            });
        },
        openModal(isNew, item) {
            if(isNew){ // 建立新產品
                this.tempProduct = {};
                this.isNew = true;
            }else{ // 編輯舊產品
                this.tempProduct = Object.assign({}, item); // 避免物件傳參考(建立一個新的空物件然後把 item 丟進去) 
                this.isNew = false;
            }
            $('#productModal').modal('show');
        },
        deleteModal(item) {
            var vm = this;
            vm.tempProduct = Object.assign({}, item);;
            $('#delProductModal').modal('show');
        },
        deleteProduct() {
            var vm = this;
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMERPATH}/admin/product/${vm.tempProduct.id}`;
            this.$http.delete(api).then((response) => {
                console.log(response.data);
                if(response.data.success){
                    $('#delProductModal').modal('hide');
                    vm.getProducts();
                }else{
                    $('#delProductModal').modal('hide');
                    vm.getProducts();
                    console.log('刪除失敗');
                }
            });
        },
        updateProduct() {
            let api = `${process.env.APIPATH}/api/${process.env.CUSTOMERPATH}/admin/product`;
            let httpMethod = 'post';
            const vm = this;
            if(!vm.isNew){ // 編輯舊產品(修改其 api)
                api = `${process.env.APIPATH}/api/${process.env.CUSTOMERPATH}/admin/product/${vm.tempProduct.id}`;
                httpMethod = 'put';
            }
            this.$http[httpMethod](api, { data: vm.tempProduct }).then((response) => {
                console.log(response.data);
                if(response.data.success){
                    $('#productModal').modal('hide');
                    vm.getProducts();
                }else{
                    $('#productModal').modal('hide');
                    vm.getProducts();
                    console.log('新增失敗');
                }
            });
        },
        uploadFile() {
            console.log(this);
            const uploadedFile = this.$refs.files.files[0];
            const vm = this;
            const formData = new FormData(); // 需要使用表單形式來上傳
            formData.append('file-to-upload', uploadedFile);
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMERPATH}/admin/upload`;
            vm.status.fileUploading = true;
            this.$http.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data' // 設置表頭資訊為表單傳送，這樣就不用在 html 中的 form 裡加上一堆傳送格式資訊
                }
            }).then((response) => {
                console.log(response.data);
                vm.status.fileUploading = false;
                if(response.data.success){
                    /* 使用第一行的存取方法在 tempProduct.imageUrl 會接到值，
                       但是並不會與上方 v-model="tempProduct.imageUrl" 做雙向綁定，
                       因此必須使用 vm.$set(v-model的主物件結構, '欄位名稱', 綁定的值)
                       來強制寫入綁定*/
                    // vm.tempProduct.imageUrl = response.data.imageUrl;
                    vm.$set(vm.tempProduct, 'imageUrl', response.data.imageUrl);
                }else{
                    this.$bus.$emit('message:push', response.data.message , 'danger');
                }
            });
        },
    },
    created() {
        this.getProducts();
    },
}
</script>