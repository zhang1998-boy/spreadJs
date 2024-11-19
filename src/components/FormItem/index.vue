<template>
  <section>
    <el-row
      v-for="(formRow, rowIndex) of formItemList"
      :key="rowIndex"
      v-bind="$attrs"
    >
      <el-col
        v-for="(formItem, colIndex) of formRow"
        :key="colIndex"
        :span="colSpan(rowIndex, formItemList.length, colIndex, formRow.length, formItem.fixed)"
        :class="colClass(rowIndex, formItemList.length, colIndex, formRow.length, formItem.fixed)"
      >
        <el-form-item
          :label="formItem.label"
          :prop="formItem.prop"
          :required="formItem.required || false"
          :label-width="formItem.labelWidth"
          :rules="formItem.rules"
          :error="formItem.error"
          :show-message="formItem.showMessage || true"
          :inline-message="formItem.inlineMessage || false"
          size="small"
        >
          <template v-if="formItem.render && typeof(formItem.render)==='function'">
            <create-item :render="formItem.render" />
          </template>
          <!-- Cascader 级联选择器 -->
          <el-cascader
            v-else-if="formItem._type === 'cascader'"
            v-model="model[formItem._model]"
            :options="formItem._options"
            v-bind="omitObject(formItem)"
            @change="changeValueHandle"
          />

          <!-- 多选框 checkbox -->
          <template v-else-if="formItem._type === 'checkbox'">
            <el-checkbox
              v-for="(item, idx) in formItem._options"
              :key="item.value"
              v-model="model[`${formItem._model}${idx}`]"
              :label="item.value"
              v-bind="omitObject(item, ['value'])"
              @change="changeValueHandle"
            >
              {{ item.label }}
            </el-checkbox>
          </template>
          <!-- 多选框组 checkboxGroup -->
          <el-checkbox-group
            v-else-if="formItem._type === 'checkboxGroup'"
            v-model="model[formItem._model]"
            v-bind="omitObject(formItem)"
            @change="changeValueHandle"
          >
            <el-checkbox
              v-for="item in formItem._options"
              :key="item.value"
              :label="item.value"
              v-bind="omitObject(item, ['value'])"
            >
              {{ item.label }}
            </el-checkbox>
          </el-checkbox-group>
          <!-- 多选框组 checkboxButton -->
          <el-checkbox-group
            v-else-if="formItem._type === 'checkboxButton'"
            v-model="model[formItem._model]"
            v-bind="omitObject(formItem)"
            @change="changeValueHandle"
          >
            <el-checkbox-button
              v-for="item in formItem._options"
              :key="item.value"
              :label="item.value"
              v-bind="omitObject(item, ['value'])"
            >
              {{ item.label }}
            </el-checkbox-button>
          </el-checkbox-group>

          <!-- ColorPicker 颜色选择器 -->
          <el-color-picker
            v-else-if="formItem._type === 'colorPicker'"
            v-model="model[formItem._model]"
            v-bind="omitObject(formItem)"
            @change="changeValueHandle"
          />

          <!-- 日期选择器 -->
          <el-date-picker
            v-else-if="formItem._type === 'datePicker'"
            v-model="model[formItem._model]"
            v-bind="omitObject(formItem)"
            @change="changeValueHandle"
          />
          <!-- 日期时间选择器 -->
          <el-date-picker
            v-else-if="formItem._type === 'dateTimePicker'"
            v-model="model[formItem._model]"
            v-bind="omitObject(formItem)"
            type="datetime"
            @change="changeValueHandle"
          />
          <!-- 选择时间（时分秒） -->
          <el-time-picker
            v-else-if="formItem._type === 'timePicker'"
            v-model="model[formItem._model]"
            v-bind="omitObject(formItem)"
            @change="changeValueHandle"
          />

          <!-- 输入框 -->
          <el-input
            v-else-if="formItem._type === 'input'"
            v-model="model[formItem._model]"
            v-bind="omitObject(formItem)"
            @input="changeValueHandle"
          />

          <!-- Input Number 计数器 -->
          <el-input-number
            v-else-if="formItem._type === 'inputNumber'"
            v-model="model[formItem._model]"
            :min="1"
            :max="10"
            v-bind="omitObject(formItem)"
            @change="changeValueHandle"
          />

          <!-- 单选框 radio -->
          <template v-else-if="formItem._type === 'radio'">
            <el-radio
              v-for="item in formItem._options"
              :key="item.value"
              v-model="model[formItem._model]"
              :label="item.value"
              v-bind="omitObject(item, ['value'])"
              @change="changeValueHandle"
            >
              {{ item.label }}
            </el-radio>
          </template>
          <!-- 单选框组 radioGroup -->
          <el-radio-group
            v-else-if="formItem._type === 'radioGroup'"
            v-model="model[formItem._model]"
            v-bind="omitObject(formItem)"
            @change="changeValueHandle"
          >
            <el-radio
              v-for="item in formItem._options"
              :key="item.value"
              :label="item.value"
              v-bind="omitObject(item, ['value'])"
            >
              {{ item.label }}
            </el-radio>
          </el-radio-group>
          <!-- 单选框组 button形式 radioButton -->
          <el-radio-group
            v-else-if="formItem._type === 'radioButton'"
            v-model="model[formItem._model]"
            v-bind="omitObject(formItem)"
            @change="changeValueHandle"
          >
            <el-radio-button
              v-for="item in formItem._options"
              :key="item.value"
              :label="item.value"
              v-bind="omitObject(item, ['value'])"
            >
              {{ item.label }}
            </el-radio-button>
          </el-radio-group>

          <!-- 下拉选择框 -->
          <el-select
            v-else-if="formItem._type === 'select'"
            v-model="model[formItem._model]"
            :placeholder="formItem.placeholder"
            v-bind="omitObject(formItem)"
            @change="changeValueHandle"
          >
            <el-option
              v-for="item in formItem._options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>

          <!-- 滑块 -->
          <el-slider
            v-else-if="formItem._type === 'slider'"
            v-model="model[formItem._model]"
            v-bind="omitObject(formItem)"
            @change="changeValueHandle"
            @input="changeValueHandle"
          />

          <!-- 开关 switch-->
          <el-switch
            v-else-if="formItem._type === 'switch'"
            v-model="model[formItem._model]"
            v-bind="omitObject(formItem)"
            @change="changeValueHandle"
          />

          <!-- TimeSelect 时间选择 -->
          <el-time-select
            v-else-if="formItem._type === 'timeSelect'"
            v-model="model[formItem._model]"
            start="08:30"
            step="00:15"
            end="18:30"
            v-bind="omitObject(formItem)"
            @change="changeValueHandle"
          />

          <!-- TODO:Transfer 穿梭框 -->

          <!-- TODO:Upload 上传 -->

          <p v-else>类型不匹配</p>
        </el-form-item>
      </el-col>
    </el-row>

    <el-divider v-if="formItems.length <= colCounts && !columns" />
    <el-divider v-else-if="showToggle">
      <span
        v-if="collapse"
        class="btn"
        type="text"
        @click="toggleHandle"
      >
        <svg-icon
          icon-class="arrow-down-circle"
          class="icon"
        /> 展开
      </span>
      <span
        v-else
        class="btn"
        type="text"
        @click="toggleHandle"
      >
        <svg-icon
          icon-class="arrow-up-circle"
          class="icon"
        /> 收起
      </span>
    </el-divider>
  </section>
</template>
<script>
  import { debounce, omit } from 'lodash';
  import CreateItem from './CreateItem';

  export default {
    components: {
      CreateItem,
    },
    props: {
      /**
       * 说明: 控制表单一行几列
       * 可选值: 任意数字
       * 默认值: 0 自适应，非0就是不自适应
       */
      columns: {
        type: Number,
        default: 0,
      },
      /**
       * 说明: el-form必传的model参数对应的值
       * 可选值: -
       * 默认值: {}
       */
      modelKeys: {
        type: Object,
        required: true,
        default: () => ({}),
      },
      /**
       * 说明: 表单元素
       * 可选值: -
       * 默认值: []
       */
      formItems: {
        type: Array,
        required: true,
        default: () => [],
      },
    },

    data() {
      return {
        row: 1, // 行数
        colCounts: 1, // 默认一行1列
        formItemList: [], // 表单元素
        showToggle: false, // 默认不显示折叠和展搜索内容的入口
        collapse: true, // 默认超出搜索内容是折叠的
        model: {},
      };
    },
    watch: {
      columns: {
        immediate: true,
        handler(newVal) {
          if (newVal) {
            this.colCounts = newVal;
          }
        },
      },
      modelKeys: {
        immediate: true,
        deep: true,
        handler() {
          this.model = { ...this.modelKeys };
        },
      },
      colCounts: {
        immediate: true,
        handler() {
          const length = this.formItems.length;
          this.showToggle = length > this.colCounts && !this.columns;
          if (this.showToggle && this.collapse) {
            this.collapseHandle();
          } else {
            this.openHandle();
          }
        },
      },
    },
    mounted() {
      if (!this.columns) {
        // 根据屏幕尺寸变化，计算每一行应该展示多少列表单元素
        this.setColCounts(document.body.clientWidth);
        window.onresize = debounce(() => (() => {
          this.setColCounts(document.body.clientWidth);
        })(), 300);
      }
    },
    methods: {
      setColCounts(width) {
        if (width <= 1366) {
          this.colCounts = 3;
        } else {
          this.colCounts = 4;
        }
      },
      collapseHandle() {
        const length = this.formItems.length;
        const starts = this.formItems.slice(0, this.colCounts - 1);
        const ends = this.formItems.slice(length - 1, length);

        this.formItemList = [[...starts, ...ends]];
      },
      openHandle() {
        const length = this.formItems.length;
        this.row = Math.ceil(length / this.colCounts);

        const formItemsTemp = [];

        for (let i = 0; i < length; i += this.colCounts) {
          formItemsTemp.push(this.formItems.slice(i, i + this.colCounts));
        }
        this.formItemList = formItemsTemp;
      },
      /**
       * @description: 计算每一列所占宽度
       * @param {*} rowIndex 行数索引
       * @param {*} rows 总行数
       * @param {*} colIndex 列索引
       * @param {*} cols 总列数
       * @param {*} fixed 是不是固定填充剩余宽度
       */
      colSpan(rowIndex, rows, colIndex, cols, fixed) {
        if (rowIndex === (rows - 1) && colIndex === (cols - 1) && fixed) {
          return 24 - ((24 / this.colCounts) * (cols - 1)); // 最后一行、最后一列
        }
        return 24 / this.colCounts;
      },
      /**
       * @description: 最后一行、最后一列 类名
       */
      colClass(rowIndex, rows, colIndex, cols, fixed) {
        return rowIndex === (rows - 1) && colIndex === (cols - 1) && fixed ? 'last-row-col' : '';
      },
      /**
       * @description: 表单内容变化
       */
      changeValueHandle() {
        this.$emit('result', this.model);
        this.$emit('update:modelKeys', this.model);
      },
      /**
       * @description: 可以理解为删除object对象的属性
       */
      omitObject(obj, keys = []) {
        return omit(obj, [...keys, '_type', '_model', '_options', 'label', 'prop']);
      },
      toggleHandle() {
        if (this.collapse) {
          // 展开
          this.openHandle();
        } else {
          // 收起
          this.collapseHandle();
        }

        this.collapse = !this.collapse;
      },
    },
  };
</script>
<style lang="scss" scoped>
.el-divider {
  &.el-divider--horizontal {
    margin: 0 !important;
  }
}

.btn {
  padding: 6px;
  color: $--color-primary;
  font-size: 12px;
  cursor: pointer;

  .icon {
    font-size: 14px;
  }

  &:hover {
    color: $--color-blue;
  }
}

.last-row-col {
  text-align: right;
}
</style>
