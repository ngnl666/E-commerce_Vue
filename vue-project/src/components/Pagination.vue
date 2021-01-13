<template>
  <div>
    <div class="container">
        <nav class="row justify-content-center" aria-label="Page navigation example">
            <ul class="pagination">
                <li class="page-item" :class="{'disabled': !pagination.has_pre}">
                    <a class="page-link" href="#" aria-label="Previous"
                    @click.prevent="getPage(pagination.current_page - 1)">
                        <span aria-hidden="true">&laquo;</span>
                        <span class="sr-only">Previous</span>
                    </a>
                </li>
                <li class="page-item" v-for="page in pagination.total_pages" :key="page"
                    :class="{'active': pagination.current_page === page}">
                    <a class="page-link" href="#" @click.prevent="getPage(page)">{{ page }}</a>
                </li>
                <li class="page-item" :class="{'disabled': !pagination.has_next}">
                    <a class="page-link" href="#" aria-label="Next"
                    @click.prevent="getPage(pagination.current_page + 1)">
                        <span aria-hidden="true">&raquo;</span>
                        <span class="sr-only">Next</span>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props:['pagination'], // 由 Products.vue 傳入
  data () {
    return {

    }
  },
  methods: {
    getPage(page) { 
        this.$emit("calcPage", page); // 向外傳出至 Products.vue
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
