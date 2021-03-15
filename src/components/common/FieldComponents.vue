<template>
  <el-form ref="form" :model="form" label-width="80px" v-if="fieldData.length">
    <el-form-item label="活动名称" v-for="(item, index) in fieldData" :key="index">
      <component
        :is="'el-' + item.type"
        :key="index"
        v-model="form[item.prop]"
        v-on="item.attrs"
      >
        <template v-if="item.type === 'select'">
          <el-option
            v-for="(op, index_op) in item.values"
            :key="index_op"
            :label="op.label"
            :value="op.value"
          >
          </el-option>
        </template>
      </component>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      fieldData: this.fieldProp,
      from: {}
    };
  },
  props: {
    fieldProp: Array
  }
};
</script>
<style scoped></style>
