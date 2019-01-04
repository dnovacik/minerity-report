<template>
    <div class="overlay">
        <spinner class="spinner" size="medium" line-fg-color="#485460" text-fg-color="#485460" message="Contacting service..." />
    </div>    
</template>

<script>
import Spinner from 'vue-simple-spinner';

export default {
    name: 'mrLoader',
    components: {
        Spinner
    }
}
</script>

<style lang="scss" scoped>
    .overlay {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        min-height: 100vh;
    }
</style>
