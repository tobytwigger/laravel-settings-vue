interface Settings {

}

interface Repository {
    getSettings(): ESSettings;
    addSettings(settings: ESSettings): Repository;
    reset(): Repository;
    getSetting(key: string): any;
    hasSetting(key: string): boolean;
}

/*
$settings.siteName is a reactive site name.
$settings.siteName = '' sets it with an API call - use getter and setter for all these.
 */

export { Settings, Repository };
