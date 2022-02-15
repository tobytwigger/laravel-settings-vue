const allConfig = (): ESSettingsConfig => {
    return window.ESSettingsConfig || {};
};

const hasConfig = (key: string) => {
    return allConfig().hasOwnProperty(key);
};

const getConfig = (key: string) => {
    if (hasConfig(key)) {
        return allConfig()[key];
    }
    return undefined;
};

export { allConfig, hasConfig, getConfig };
