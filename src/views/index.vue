<template>
    <div class="main">
       <p> 请显示当前用户名：{{ store.username }}</p>
    </div>
</template>
<script lang="ts" setup>
import { useIndexStore } from '../store/index.ts'
const store = useIndexStore()

</script>
<style>
.main {
    display: flex;
    justify-content: center;
    text-align: center;
    width: 100%;
}
</style>