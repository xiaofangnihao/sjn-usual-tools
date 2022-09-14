<template>
    <h1>{{ msg }}</h1>
    <button @click="handleClick">count is: {{ count }}</button>
    <p>Edit <code>components/HelloWorld.vue</code> to test hot module replacement.</p>
</template>

<script>
import { reactive, toRefs } from 'vue'
export default {
    name: 'HelloWorld',
    props: {
        msg: String
    },
    setup(props, context) {
        const state = reactive({
            count: 0
        })

        const handleClick = () => {
            state.count++
        }

        return {
            ...toRefs(state),
            handleClick
        }
    }
}
</script>
