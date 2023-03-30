<template>
  <input
    ref="input"
    type="text"
    @input.prevent="updateField"
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
    defaultValue: {
      type: String,
      default: '0',
    },
  },
  data() {
    return {
      valueInput: '',
    };
  },
  created() {
    this.valueInput = this.defaultValue;
  },
  methods: {
    handleKeyDown(evt) {
      if (evt.key.length === 1 && /[^0-9.,]/g.test(evt.key)) {
        evt.preventDefault();
      }
    },
    updateField(evt) {
      const formatted = formatNumber(evt.target.value);
      evt.target.value = formatted.formatted;
      let emitPayload = '';
      if (formatted.isValid) {
        this.valueInput = formatted.digit;
        emitPayload = this.valueInput;
      }
      this.$emit('input', emitPayload);
    },
  },
};
</script>
