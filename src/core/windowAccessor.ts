const allSettings = (): ESSettings => {
    return window.ESSettings || {};
};

const hasSetting = (key: string) => {
    return allSettings().hasOwnProperty(key);
};

const getSetting = (key: string) => {
    if (hasSetting(key)) {
        return allSettings()[key];
    }
    return undefined;
};

export { allSettings, hasSetting, getSetting };
