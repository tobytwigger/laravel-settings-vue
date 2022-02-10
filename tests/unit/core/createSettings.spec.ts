import createSettings, {SettingType, Settings} from "../../../src/core/settings";
import Singleton from "../../../dist/core/repository/singleton";

it('creates a new setting with singletons', () => {
    let settings = createSettings(SettingType.Singleton);
    expect(settings instanceof Settings).toBe(true);
    expect(settings.repository instanceof Singleton);
});

it('defaults to a singleton repository', () => {
    let settings = createSettings();
    expect(settings instanceof Settings).toBe(true);
    expect(settings.repository instanceof Singleton);
})