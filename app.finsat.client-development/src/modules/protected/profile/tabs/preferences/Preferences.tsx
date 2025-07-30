import React, { useEffect } from 'react';
import useProfile from '../../hooks/useProfile';
import { PowerUnit } from '@enums/PowerUnit';

const Preferences = () => {
    const { powerUnit, onGetPreferences, onChangePowerUnit } = useProfile();

    useEffect(() => {
        onGetPreferences();
    }, []);

    return (
        <div className="w-1/2">
            <p className="text-lg">User Preferences</p>
            <p className="text-sm">
                Customize how you use and experience the app.
            </p>
            <div className="my-6">
                <p className="text text-gray-500">
                    Select your preferred unit for power readings:
                </p>
                <div className="space-y-2 mt-2 text-sm">
                    <label className="flex items-center space-x-2">
                        <input
                            type="radio"
                            name="powerUnit"
                            value="kW"
                            checked={powerUnit.powerUnit === PowerUnit.KW}
                            onChange={() => onChangePowerUnit(PowerUnit.KW)}
                            className="form-radio"
                        />
                        <span>kilowatt (kW)</span>
                    </label>
                    <label className="flex items-center space-x-2">
                        <input
                            type="radio"
                            name="powerUnit"
                            value="MW"
                            checked={powerUnit.powerUnit === PowerUnit.MW}
                            onChange={() => onChangePowerUnit(PowerUnit.MW)}
                            className="form-radio"
                        />
                        <span>megawatt (MW)</span>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default Preferences;
