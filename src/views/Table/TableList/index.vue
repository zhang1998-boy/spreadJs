<template>
  <div>

    <section class="page-container">

      <section class="base"
               id="tztj"
               ref="tztj">
        <PageFormTitle text="投资条件"></PageFormTitle>
      </section>

      <section class="base"
               id="kyzb"
               ref="kyzb">
        <PageFormTitle text="科研指标"></PageFormTitle>
      </section>

      <section class="base"
               id="ghzb"
               ref="ghzb">
        <PageFormTitle text="规划指标"></PageFormTitle>
      </section>

      <!-- <lf-table v-loading="loading"
              :data="tableData"
              :columns="columns" /> -->

    </section>

    <div class="menu-right">
      <div class="menu-item"
           :class="{ active: activeSection === item.value }"
           @click="goDetail(item.value)"
           v-for="item in menuList">
        {{item.label}}
      </div>
    </div>
  </div>
</template>

<script>
import { getTableListData } from '@/api/mocks/tableList';
import EditRules from '../components/EditRules';

export default {
  name: 'table-list',
  components: {
    EditRules,
  },
  data () {
    return {
      menuList: [
        { label: "投资条件", value: 'tztj' },
        { label: "科研指标", value: 'kyzb' },
        { label: "规划指标", value: 'ghzb' },
      ],

      loading: false,
      searchParams: {
        pageNum: 1,
        pageSize: 10,
        ruleName: '',
        describe: '',
      },

      tableData: [],
      total: 0,

      showEditDialog: false,
      isEdit: false,
      editParams: {},

      activeSection: '', // 当前激活的节
      observer: null, // IntersectionObserver 实例
    };
  },
  mounted () {
    this.initIntersectionObserver();
  },
  beforeDestroy () {
    this.observer.disconnect(); // 清理 IntersectionObserver
  },
  methods: {
    // 初始化 IntersectionObserver
    initIntersectionObserver () {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.activeSection = entry.target.id;
          }
        });
      }, {
        threshold: 0.5 // 可以调整阈值，决定何时触发
      });

      // 监听每个部分
      this.menuList.forEach(item => {
        const el = this.$refs[item.value];
        if (el) {
          this.observer.observe(el);
        }
      });
    },

    // 跳转到相应位置
    goDetail (id) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.page-container {
  height: 90vh; /* 确保内容高度超过视口高度 */
  overflow: auto;
}

.base {
  height: 500px;
  margin-bottom: 12px;
}

.menu-right {
  position: absolute;
  top: 58px;
  right: 27px;
  padding: 12px;
  font-size: 12px;
  background-color: #E3EAF5;
  border-radius: 4px;
}

.menu-item {
  height: 24px;
  margin-bottom: 6px;
  cursor: pointer;
}

.menu-item:hover {
  color: #007AF5;
}

.menu-item.active {
  color: #007AF5;
  font-weight: bold;
}
</style>