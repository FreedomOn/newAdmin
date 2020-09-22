<template>
  <div class="app-container">
    <div>
       <el-form ref="form" :model="form" label-width="130px">
        <el-form-item label="项目名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="项目WBS编码">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="业务编码">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="地市公司">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
       <el-form-item label="县公司">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="批次名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
         <el-form-item label="批次年度">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>
    </div>
  </div>
</template>

<script>
export default {

  methods: {
    onSubmit() {
        console.log('submit!');
      }
  },

  data() {
    return {
      form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
    }
  }
}
</script>

