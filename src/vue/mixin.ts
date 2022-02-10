import Vue from "vue";

export default {
    computed: {
        setting(): {[key: string]: any} {
            // @ts-ignore
            return this.$setting;
        }
    }
};