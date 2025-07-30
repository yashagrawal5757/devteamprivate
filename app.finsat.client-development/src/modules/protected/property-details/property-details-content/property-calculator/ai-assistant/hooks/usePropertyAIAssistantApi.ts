import axios, { AxiosResponse } from "axios";
import { PropertyAIAssistantMessageType } from "./usePropertyAIAssistant";

const usePropertyAIAssistantApi = () => {
    const sendPrompt = async (
        payload: any
    ): Promise<AxiosResponse<string>> => {
        const url = process.env.REACT_APP_API_ML_ROUTE!;

        return axios.post(
            `${url}/financial_advisor`,
            payload,
            {
                timeout: 60000
            }
        );
    }

    return {
        sendPrompt
    }
}

type PromtResponse = {

};

export default usePropertyAIAssistantApi;