export type TotalContextValues = {
    total: number;
}

export const useTotal = (): TotalContextValues => {
    
    return ({
        total: 0
    })
};
