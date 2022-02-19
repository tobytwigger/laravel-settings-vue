import Singleton from "./../../../../src/core/repository/singleton";

let singleton = Singleton.getInstance();

afterEach(() => {
    singleton.reset();
});

it('can have settings added', () => {
    let settings = {
        siteName: 'My site name',
        siteTheme: 'Nova'
    };
    singleton.addSettings(settings);
    expect(singleton.settings).toEqual(settings)
});

it('resets settings', () => {
    let settings = {
        siteName: 'My site name',
        siteTheme: 'Nova'
    };
    singleton.addSettings(settings);
    expect(singleton.settings).toEqual(settings);
    singleton.reset();
    expect(singleton.settings).toEqual({});
});

it('can get a single setting', () => {
    let settings = {
        siteName: 'My site name',
        siteTheme: 'Nova'
    };
    singleton.addSettings(settings);
    expect(singleton.getSetting('siteName')).toEqual('My site name');
    expect(singleton.getSetting('siteTheme')).toEqual('Nova');
    expect(singleton.getSetting('timeout')).toEqual(undefined);
});

it('can check if a setting exists', () => {
    let settings = {
        siteName: 'My site name',
        siteTheme: 'Nova'
    };
    singleton.addSettings(settings);
    expect(singleton.hasSetting('siteName')).toBe(true);
    expect(singleton.hasSetting('siteTheme')).toBe(true);
    expect(singleton.hasSetting('timeout')).toBe(false);
});

it('can return a subset of the settings', () => {
    let settings = {
        siteName: 'My site name',
        siteTheme: 'Nova',
        darkMode: false
    };
    singleton.addSettings(settings);
    expect(singleton.only(['siteName', 'darkMode'])).toEqual({
        siteName: 'My site name',
        darkMode: false
    })
});

it('calls any callbacks that are registered', () => {
    let settings = {
        siteName: 'My site name',
        siteTheme: 'Nova',
        darkMode: false
    };
    let calledSettings: Array<String> = [];
    singleton.onSettingUpdated(((key, value) => calledSettings[key] = value));

    singleton.addSettings(settings);
    expect(calledSettings).toEqual([
        'siteName',
        'siteTheme',
        'darkMode'
    ]);
})