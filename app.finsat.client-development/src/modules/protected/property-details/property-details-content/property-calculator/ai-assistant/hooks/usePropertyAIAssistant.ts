import { useRef, useState } from "react"
import usePropertyAIAssistantApi from "./usePropertyAIAssistantApi";
import useProperty from "modules/protected/property-details/hooks/property/useProperty";
import usePropertyFootprint from "modules/protected/property-details/hooks/property-footprint/usePropertyFootprint";
import AuthService from "@core/auth/auth.service";
import useGeometry from "@hooks/useGeometry";
import useSolarCalculationEstimate from "modules/protected/property-details/hooks/solar-calculation-estimate/useSolarCalculationEstimate";
import usePropertyEditorManager from "modules/protected/property-details/hooks/property-editor-manager/usePropertyEditorManager";

export enum PropertyAIAssistantMessageType {
    PROMPT = 0,
    RESPONSE
}

type PropertyAIMessage = {
    text: string;
    type: PropertyAIAssistantMessageType;
}

const initialMessages: Array<PropertyAIMessage> = [
    {
        type: PropertyAIAssistantMessageType.RESPONSE,
        text: 'Hi! I\'m AVA, your Property AI Assistant. How can I help you today?'
    }
]

const usePropertyAIAssistant = () => {
    const [prompt, setPrompt] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const [messages, setMessages] = useState<Array<PropertyAIMessage>>(initialMessages);

    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const propertyAIAssistantApi = usePropertyAIAssistantApi();
    const { property } = useProperty();
    const { footprint } = usePropertyFootprint();
    const { calculateFootprintCentroid } = useGeometry();
    const { solarEstimateInput, solarGenerationOutput, solarFinancialOutput } = useSolarCalculationEstimate();
    const { base64Image } = usePropertyEditorManager();

    const sendPrompt = (e: React.FormEvent) => {
        e.preventDefault();

        if (!prompt.trim()) {
            return;
        }

        const newMessage = {
            type: PropertyAIAssistantMessageType.PROMPT,
            text: prompt
        }

        setPrompt('');
        setLoading(true);

        setMessages((prev) => [...prev, newMessage]);

        let payload: any = {
            UserId: AuthService.getAuthenticatedUser()?.id,
            PropertyId: property?.osmId,
            VariationId: "",
            user_message: newMessage.text,
            geometry: null,
            panel_input: {
                PanelType: solarEstimateInput.solarPanelMetrics.type,
                PanelHeight: solarEstimateInput.solarPanelMetrics.panelVerticalLength,
                PanelWidth: solarEstimateInput.solarPanelMetrics.panelHorizontalLength,
                PanelEfficiency: solarEstimateInput.solarPanelMetrics.panelEfficiency,
                NumberOfPanels: solarEstimateInput.solarPanelMetrics.areaConfigurationValue,
                SlopeDeg: solarEstimateInput.solarPanelMetrics.slope,
                RevenuePerMWh: solarEstimateInput.solarPanelMetrics.revenuePerKWh,
                ElectricityPrice: solarEstimateInput.solarPanelMetrics.electricityPrice,
                MaintenanceCost: solarEstimateInput.solarPanelMetrics.maintenanceCost
            },
            financial_input: {
                SystemCost: solarEstimateInput.financialMetrics.systemCost,
                DiscountRate: solarEstimateInput.financialMetrics.discountRate,
                ProjectLifetime: solarEstimateInput.financialMetrics.projectLifetime,
                CashFlows: solarEstimateInput.financialMetrics.cashFlows
            },
            calc_output: null
        }

        if (footprint.shapes.length > 0) {
            const mainFootprint = footprint.shapes[0].data;
            const [centerX, centerY] = calculateFootprintCentroid(mainFootprint);

            payload.geometry = {
                centroid_lat: centerX,
                centroid_lon: centerY,
                area_m2: solarEstimateInput.solarPanelMetrics.totalAvailableSpace,
                image_base64: base64Image.split(',')[1]
            }
        }

        if (solarGenerationOutput !== undefined && solarFinancialOutput !== undefined) {
            payload.calc_output = {
                WattsW: solarGenerationOutput.overallMetrics.wattPeakPower,
                TotalWattPeakKW: solarGenerationOutput.overallMetrics.totalWattPeakPower,
                AverageCashFlow: solarGenerationOutput.predictedMetrics.cashFlow,
                NPV: solarFinancialOutput.predictions.find(prediction => prediction.discountRate === solarEstimateInput.financialMetrics.discountRate)?.netPresentValue,
                IRR: solarFinancialOutput.predictions.find(prediction => prediction.discountRate === solarEstimateInput.financialMetrics.discountRate)?.internalRateOfReturn,
                PaybackMonths: solarFinancialOutput.predictions.find(prediction => prediction.discountRate === solarEstimateInput.financialMetrics.discountRate)?.paybackPeriod,
                PowerOutput: solarGenerationOutput.annualMetrics.powerOutput,
                TotalPowerOutput: solarGenerationOutput.annualMetrics.totalPowerOutput,
                EnergyProduction: solarGenerationOutput.annualMetrics.energyProduction,
                NetPowerOutput: solarGenerationOutput.annualMetrics.netPowerOutput,
                NetTotalPowerOutput: solarGenerationOutput.annualMetrics.netTotalPowerOutput,
                NetEnergyProduction: solarGenerationOutput.annualMetrics.netEnergyProduction,
                ProducibleEnergyPct: solarGenerationOutput.annualMetrics.producableEnergyPercentage,
                EnergySavings: solarGenerationOutput.annualMetrics.energySavings,
                CostReduction: solarGenerationOutput.annualMetrics.costReduction,
                Revenue: solarGenerationOutput.annualMetrics.energyRevenue,
                NetRevenue: solarGenerationOutput.annualMetrics.netEnergyRevenue
            }
        }

        propertyAIAssistantApi
            .sendPrompt(payload)
            .then((response) => {
                setMessages((prev) => [...prev, { type: PropertyAIAssistantMessageType.RESPONSE, text: response.data }]);
            })
            .catch((e) => {
                console.error(e);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return {
        messages,
        messagesEndRef,
        loading,
        prompt,
        setPrompt,
        sendPrompt
    }
}

export default usePropertyAIAssistant