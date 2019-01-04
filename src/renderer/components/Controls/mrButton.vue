<template>
    <div class="button-wrapper">
        <button :style="`width: ${width};`" :disabled="disabled" @click="$emit('click')">{{value}}</button>
    </div>    
</template>

<script>
export default {
    name: 'mrButton',
    props: {
        width: String,
        value: String,
        disabled: String
    }
}
</script>

<style lang="scss" scoped>
    .button-wrapper {
        -webkit-app-region: no-drag;
        display: inline-block;
        position: relative;
        font-family: 'Source Sans Pro', sans-serif;
        
        button {
            border: 1px solid rgba(255,255,255,0.3);
            padding: 10px 22px;
            background-color: rgb(30, 39, 46);
            border-radius: 90px;
            color: #fff;
            font-family: 'Source Sans Pro', sans-serif;
            cursor: pointer;

            &:hover {
                color: rgb(211, 209, 209);
                background-color: rgb(73, 92, 107);
            }
        }
    }
</style>
