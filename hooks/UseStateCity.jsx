import { useState, useEffect } from 'react';
import { getCityMaster, getStatesMaster } from '../api/Recruiter/queries';

const UseStateCity = () => {
    const [stateData, setStateData] = useState([]);
    const [cityData, setCityData] = useState([]);
    const [selectedState, setSelectedState] = useState(null);
    const [dataLoading, setDataLoading] = useState({ state: false, city: false });
    const [error, setError] = useState({ state: null, city: null });

    const fetchState = async () => {
        setDataLoading(prev => ({ ...prev, state: true }));
        try {
            const stateData = await getStatesMaster();
            setStateData(stateData?.getStatesMaster || []);
            setError(prev => ({ ...prev, state: null }));
        } catch (error) {
            console.error("Error fetching state data:", error);
            setError(prev => ({ ...prev, state: error }));
        } finally {
            setDataLoading(prev => ({ ...prev, state: false }));
        }
    };

    const fetchCity = async (state) => {
        if (!state) return;
        setDataLoading(prev => ({ ...prev, city: true }));
        try {
            const cityData = await getCityMaster(state);
            setCityData(cityData?.getCitiesMaster || []);
            setError(prev => ({ ...prev, city: null }));
        } catch (error) {
            console.error("Error fetching city data:", error);
            setError(prev => ({ ...prev, city: error }));
        } finally {
            setDataLoading(prev => ({ ...prev, city: false }));
        }
    };

    useEffect(() => {
        fetchState();
    }, []);

    useEffect(() => {
        fetchCity(selectedState);
    }, [selectedState]);

    return {
        stateData,
        cityData,
        selectedState,
        setSelectedState,
        dataLoading,
        error,
    };
};

export default UseStateCity;
