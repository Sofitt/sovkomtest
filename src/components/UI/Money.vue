<template>
  <input
    type="text"
    v-model="valueInput"
    @keydown="handleKeyDown"
    class="ui-money"
    placeholder="Filter by money..."
  />
</template>

<script>
import formatNumber from '@/utils/formatNumber';

export default {
  name: 'UiMoney',
  props: {
    value: {
      type: Number,
      require: true,
    },
  },
  data() {
    return {
      input: '',
    };
  },
  watch: {
    value: {
      handler(v) {
        this.updateField(v?.toString(), 'watch');
      },
    },
  },
  computed: {
    valueInput: {
      get() {
        return this.input;
      },
      set(v) {
        this.updateField(v);
      },
    },
  },
  methods: {
    handleKeyDown(evt) {
      if (evt.key.length === 1 && /[^0-9.,]/g.test(evt.key)) {
        evt.preventDefault();
      }
    },
    emitFormatted(from, formatted) {
      if (!this.emitFormatted.emitsDivider) {
        this.emitFormatted.emitsDivider = 1;
      }
      if (from !== 'watch') {
        if (formatted.isValid) {
          this.$emit('input', formatted.digit);
        } else {
          // eslint-disable-next-line no-plusplus
          this.emitFormatted.emitsDivider++;
          if (this.emitFormatted.emitsDivider % 2 === 0 || !this.$el.value) {
            this.$emit('input');
          }
        }
        // Обновить инпут
        this.$forceUpdate();
      }
    },
    updateField(value, from) {
      const formatted = formatNumber(value);
      this.input = formatted.formatted;
      this.emitFormatted(from, formatted);
    },
  },
  created() {
    this.valueInput = this.value?.toString();
  },
};
</script>
