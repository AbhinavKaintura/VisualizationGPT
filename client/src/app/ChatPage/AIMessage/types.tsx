export interface AIDataProp {
    data: DataProps,
    userText:string,
    getAiResponse: (userPrompt: string) => Promise<{ status: string; resData: DataProps }>;

}
export interface DataProps {
    AIresponse: string | boolean,
    visuals: VisualProps[] | boolean
}
export interface VisualProps {
    text: string | boolean,
    type: string;
    data_points: object[]
    name:string;
    key_value:number
}

export interface DataPoint {
    [key: string]: any;
}

export const generateDistinctColors = (count: number): string[] => {
    const hueStep = 360 / count;
    return Array.from({ length: count }, (_, i) => {
        const hue = i * hueStep;
        return `hsl(${hue}, 70%, 60%)`;
    });
};


export const scaleToKM = (value: number) => {
    if (value >= 1000000) {
        const convertedValue = (value / 1000000).toFixed(1);
        return convertedValue + 'M';
    } else if (value >= 1000) {
        const convertedValue = (value / 1000).toFixed(1);
        return convertedValue + 'K';
    }
    return value.toString(); // Return the value as a string
};
