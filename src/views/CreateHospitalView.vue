<template>
    <div>
        <h1>Create hospital</h1>
        <div class="markdown-wrapper">
            <MdEditor v-model="text" theme="dark" language="en-US" />
        </div>
        <!-- <button @click="getUserText">Click</button> -->
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

export default defineComponent({
    name: 'CreateHospitalView',
    components: {
        MdEditor
    },
    setup() {
        const text = ref('## Create Hospital entry');

        // const getUserText = () => {
        //     console.log(text.value);
        // }

        return {
            text,
            // getUserText
        }
    }
})
</script>

<style scoped>
h1 {
    text-align: center;
    margin-top: 15px;
    margin-bottom: 15px;
}

.markdown-wrapper {
    margin-bottom: 15px;
}
</style>