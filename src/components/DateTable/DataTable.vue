<template>
  <div class="data-table">
    <div class="data-table__filter">
      <ui-money v-model="moneyFilter"/>
    </div>

    <div class="data-table__content" v-if="rows && rows.length">
      <div class="data-table__head">
        <div class="data-table__label"
             v-for="headItem of columns"
             :key="headItem.label"
             :style="{'flex-basis': headItem.width}">
          {{headItem.label}}
        </div>
      </div>
      <template v-if="filteredData.length">
        <ul class="data-table__row" v-for="row of dataPerPage" :key="row.id">
          <!-- отделяю представление от данных, чтобы не был важен порядок и наличие ключей в объекте row -->
          <table-column class="data-table__column"
                        v-for="column of columns"
                        :key="column.prop"
                        :prop-name="column.prop"
                        :label="column.label"
                        :content="row"
                        :style="getColumnOptions(column.prop)"/>
        </ul>
      </template>
      <template v-else>
        <div class="data-table__placeholder">
          Not found
        </div>
      </template>
    </div>

    <div class="data-table__paginator">
      <ui-pagination
        v-model="page"
        :pages="pageCount"
      />
    </div>
  </div>
</template>

<script>
import TableColumn from '@/components/DateTable/components/TableColumn.vue';

export default {
  name: 'DataTable',
  props: {
    rows: {
      type: Array,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    },
  },
  components: { TableColumn },

  data: () => ({
    page: 1,
    pageSize: 4,
    moneyFilter: 0,
  }),

  computed: {
    filteredData() {
      return this.moneyFilter > 0 ? this.rows.filter((item) => item.money <= this.moneyFilter) : this.rows;
    },
    dataPerPage() {
      const calcData = this.page === 1
        ? [0, this.pageSize]
        : [(this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize];
      return this.filteredData.slice(...calcData);
    },
    pageCount() {
      return Math.ceil(this.filteredData.length / this.pageSize);
    },
  },

  methods: {
    getColumnOptions(columnKey) {
      const options = this.columns.find((column) => column.prop === columnKey);
      return options && { 'flex-basis': options.width };
    },
  },
};
</script>
<style lang="scss">
.data-table {
  display: flex;
  flex-flow: column;
  @media (max-width: 768px) {
    /* Чтобы пагинация не прилипала к границе страницы */
    margin-bottom: 40px;
  }
  &__filter {
    align-self: flex-end;
    margin-bottom: 10px;
  }
  &__content {
    display: flex;
    flex-flow: column;
    width: 100%;
    margin-bottom: 20px;
    /* Чтобы блок не прыгал, если элементов не хватает для полно-высотной таблицы */
    min-height: 200px;
    @media (max-width: 768px) {
      gap: 16px;
    }
  }
  &__row, &__head {
    display: flex;
    flex-flow: column wrap;
    align-items: flex-start;
    padding: 6px 8px;
    @media (max-width: 768px) {
      gap: 16px;
      border: 1px solid black;
    }
    @media (min-width: 768px) {
      flex-flow: row nowrap;
      justify-content: flex-start;
      height: 40px;
      border-bottom: 1px solid black;
      padding: 0;
      &:first-child {
        border-top: 1px solid black;
      }
    }
  }
  &__head {
    display: none;
    @media (min-width: 768px) {
      display: flex;
    }
  }
  &__label {
    font-weight: 700;
  }
  &__column, &__label {
    display: flex;
    align-items: center;
    justify-content: center;
    @media (min-width: 768px) {
      display: flex;
      border-right: 1px solid black;
      height: 100%;
      &:first-child {
        border-left: 1px solid black;
      }
    }
  }
  &__placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
  }
}
</style>
