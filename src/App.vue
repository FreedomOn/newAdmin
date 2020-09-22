<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<style>

.el-table th.gutter{
    display: table-cell!important;
  }

 .el-table th{
   padding: 3px 0 !important;
 } 
.el-table td{
    border-right: 1px solid #c0c4cc;
    /* border-top: 1px solid #c0c4cc; */
    border-bottom: 1px solid #c0c4cc;
 }
 .el-table td:first-of-type{
   border-left: 1px solid #c0c4cc;
 }
 .el-table td:last-of-type{
   border-right: 1px solid #c0c4cc !important;
 }
 .el-table--border th{
    border-right: 1px solid #c0c4cc;
    border-top: 1px solid #c0c4cc;
 }
 .el-table--border th:first-of-type{
   border-left: 1px solid #c0c4cc;
 }
 .el-link{
       font-size: 9px;
 }
  .el-table__body tr,
  .el-table__body td {
    padding: 0;
    height: 60px;
}
.el-table__header tr,
  .el-table__header th {
    padding: 0;
    height: 40px;
}
</style>
<script>
export default {
  name: 'App'
}
</script>

