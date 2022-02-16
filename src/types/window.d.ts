interface ESSettings {
    [key: string]: any;
}

interface ESSettingsConfig {
    [key: string]: any;
}

interface Window {
    ESSettings?: ESSettings;
    ESSettingsConfig?: ESSettingsConfig;
    $setting: ESSettings;
}
