const allSettings = () => {
    return window.ESSettings || {};
}

const hasSetting = (key) => {
    return allSettings().hasOwnProperty(key);
}

const getSetting = (key) => {
    if(hasSetting(key)) {
        return allSettings()[key];
    }
    return null;
}

export {
    allSettings,
    hasSetting,
    getSetting
}
