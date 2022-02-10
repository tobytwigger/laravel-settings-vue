export default {
    mounted() {
        if (this.usedSettings) {
            this.loadManySettings(this.usedSettings);
        }
    },
    methods: {
        loadSetting(key) {},
        loadManySettings(key) {},
    },
    computed: {
        settings() {
            return {};
        },
    },
};
