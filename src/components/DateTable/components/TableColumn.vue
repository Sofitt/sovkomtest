<template>
  <li class="table-column">
    <label class="table-column__label">
      <span class="table-column__name">
        {{ label }}
      </span>
      {{ computedContent }}
    </label>
  </li>
</template>

<script>
import formatDate from '@/utils/formatDate';

export default {
  name: 'TableColumn',
  props: {
    label: {
      type: String,
      required: true,
    },
    propName: {
      type: String,
      required: true,
    },
    content: {
      type: Object,
      required: true,
    },
  },
  computed: {
    computedContent() {
      let content = this.content[this.propName];
      if (this.propName === 'date') {
        content = formatDate(this.content[this.propName]);
      }
      return content;
    },
  },
};
</script>
<style lang="scss">
.table-column {
  list-style: none;
  &__label {
    display: flex;
    flex-flow: column;
    align-items: flex-start;
    gap: 3px;
  }
  &__name {
    display: block;
    font-weight: 700;
    @media (min-width: 768px) {
      display: none;
    }
  }
}
</style>
