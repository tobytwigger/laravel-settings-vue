interface ESSettings {
    [key: string]: any,
}

interface Window {
    ESSettings?: ESSettings,
    $setting: ESSettings
}