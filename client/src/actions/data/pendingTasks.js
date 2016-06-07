export const LOADING_DATA = 'LOADING_DATA';
export const DATA_LOADED = 'DATA_LOADED';

export function loadingData() {
    return {
        type: LOADING_DATA
    }
}

export function dataLoaded() {
    return {
        type: DATA_LOADED
    }
}