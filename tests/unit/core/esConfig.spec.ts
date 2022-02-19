import * as Accessor from './../../../src/core/esConfig';

let windowSpy: any;

let config: { [key: string]: any } = {
    api_enabled: true,
    api_get_url: 'https://get.com',
    api_update_url: 'https://update.com'
}

beforeEach(() => {
    windowSpy = jest.spyOn(window, "window", "get");
    windowSpy.mockImplementation(() => ({ESSettingsConfig: config}));
});

afterEach(() => {
    windowSpy.mockRestore();
});

it('returns all config from the window', () => {
    expect(Accessor.allConfig()).toEqual(config)
});

it('returns if a setting exists or not', () => {
    expect(Accessor.hasConfig('api_enabled')).toBe(true);
    expect(Accessor.hasConfig('api_get_url')).toBe(true);
    expect(Accessor.hasConfig('api_update_url')).toBe(true);
    expect(Accessor.hasConfig('made_up_one')).toBe(false);
    expect(Accessor.hasConfig('made_up_two')).toBe(false);
});

it('returns the value of the setting', () => {
    expect(Accessor.getConfig('api_enabled')).toBe(true);
    expect(Accessor.getConfig('api_get_url')).toBe('https://get.com');
    expect(Accessor.getConfig('api_update_url')).toBe('https://update.com');
    expect(Accessor.getConfig('made_up_one')).toBe(undefined);
    expect(Accessor.getConfig('made_up_two')).toBe(undefined);
});