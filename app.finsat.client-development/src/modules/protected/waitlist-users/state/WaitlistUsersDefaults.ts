import { PrimaryInterestType } from '@enums/PrimaryInterestType';
import { SectorType } from '@enums/SectorType';
import { RegisterSurvey } from 'modules/public/register/components/register-form/RegisterForm';

export type WaitlistUsersType = {
    id: number;
    name: string;
    email: string;
    company: string;
    sector: SectorType;
    interest: PrimaryInterestType;
    surveys: Array<RegisterSurvey>;
};

const WaitlistUsers: WaitlistUsersType[] = [];

export default WaitlistUsers;
