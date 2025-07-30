import useRegisterApi from './useRegisterApi';
import { useNavigate } from 'react-router-dom';
import { Routes, RoutingKeys } from '@routes/router.keys';
import useError from '@hooks/useError';
import useLoading from '@hooks/useLoading';
import { SectorType } from '@enums/SectorType';
import { PrimaryInterestType } from '@enums/PrimaryInterestType';
import { RegisterSurvey } from '../components/register-form/RegisterForm';

const useRegister = () => {
    const error = useError();

    const registerApi = useRegisterApi();
    const navigate = useNavigate();

    const loading = useLoading();

    const onSubmit = (
        name: string,
        email: string,
        password: string,
        sector: SectorType,
        interest: PrimaryInterestType,
        company?: string,
        surveys?: Array<RegisterSurvey>
    ) => {
        loading.load();

        const formattedSurveysData = surveys?.map((survey) => ({
            question: survey.question,
            answer: survey.answer
        }));

        registerApi
            .register(
                name,
                email,
                password,
                sector,
                interest,
                company,
                formattedSurveysData
            )
            .then(() => {
                setTimeout(() => {
                    navigate(RoutingKeys[Routes.REGISTER_CONFIRMATION]);
                }, 500);
            })
            .catch((e) => {
                error.parseAndSetErrorMessage(e);
            })
            .finally(() => {
                loading.loaded();
            });
    };

    const navigateToLogin = (e: any) => {
        e.preventDefault();
        navigate(RoutingKeys[Routes.LOGIN]);
    };

    return { onSubmit, navigateToLogin };
};

export default useRegister;
