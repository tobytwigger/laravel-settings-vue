import * as Accessor from './../../../src/core/windowAccessor';

let windowSpy: any;

let settings: object = {
    siteName: "My Site Name",
    siteTheme: "Nova",
    timeout: 80
};

beforeEach(() => {
    windowSpy = jest.spyOn(window, "window", "get");
    windowSpy.mockImplementation(() => ({ESSettings: settings}));
});

afterEach(() => {
    windowSpy.mockRestore();
});

it('returns all settings from the window', () => {
    expect(Accessor.allSettings()).toEqual(settings)
});

it('returns if a setting exists or not', () => {
    expect(Accessor.hasSetting('siteName')).toBe(true);
    expect(Accessor.hasSetting('siteTheme')).toBe(true);
    expect(Accessor.hasSetting('timeout')).toBe(true);
    expect(Accessor.hasSetting('homepage')).toBe(false);
    expect(Accessor.hasSetting('fontsize')).toBe(false);
});

it('returns the value of the setting', () => {
    expect(Accessor.getSetting('siteName')).toBe('My Site Name');
    expect(Accessor.getSetting('siteTheme')).toBe('Nova');
    expect(Accessor.getSetting('timeout')).toBe(80);
    expect(Accessor.getSetting('homepage')).toBe(undefined);
    expect(Accessor.getSetting('fontsize')).toBe(undefined);
});

