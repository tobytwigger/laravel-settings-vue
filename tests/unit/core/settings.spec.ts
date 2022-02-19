// ./test/UppercaseProxy.spec.js
import {Settings} from "../../../src/core/settings";
import Singleton from "../../../src/core/repository/singleton";
import axios from 'axios';

it('makes a request to set a value', async () => {
    let settings = new Settings(Singleton.getInstance(), mockedAxios);
    settings.setValue('dark_mode', false);

    await new Promise(process.nextTick);

    expect(axios.get).toHaveBeenCalledWith({dark_mode: false});
});

it('returns a value already in the repository', () => {

});

it('returns undefined and loads the setting if the value is not loaded', () => {

});

it('loads a single setting', () => {

});

it('loads many settings', () => {

});

it('only loads a setting once', () => {

});

