import { useState } from 'react';
import { AxiosResponse } from 'axios';
import useWaitlistUsersContext from '../context/useWaitlistUsersContext';
import { WaitlistUsersActions } from '../state/WaitlistUsersActions';
import useWaitlistUsersApi, {
    WaitlistUsersResponse
} from './useWaitlistUsersApi';
import useError from '@hooks/useError';
import useSuccess from '@hooks/useSuccess';
import useLoading from '@hooks/useLoading';

const useWaitlistUsers = () => {
    const error = useError();
    const success = useSuccess();
    const loading = useLoading();

    const waitlistUsersApi = useWaitlistUsersApi();
    const waitlistUsersContext = useWaitlistUsersContext();

    const [searchQuery, setSearchQuery] = useState('');

    const onApprove = (id: number) => {
        loading.load();

        waitlistUsersApi
            .approveUser(id)
            .then(() => {
                waitlistUsersContext.dispatch({
                    type: WaitlistUsersActions.CLEAR_USER,
                    payload: { id }
                });

                success.setSuccessMessage('User has been approved');
            })
            .catch((e) => {
                error.parseAndSetErrorMessage(e);
            })
            .finally(() => {
                loading.loaded();
            });
    };

    const onDeny = (id: number) => {
        loading.load();

        waitlistUsersApi
            .denyUser(id)
            .then(() => {
                waitlistUsersContext.dispatch({
                    type: WaitlistUsersActions.CLEAR_USER,
                    payload: { id }
                });

                success.setSuccessMessage('User has been denied');
            })
            .catch((e) => {
                error.parseAndSetErrorMessage(e);
            })
            .finally(() => {
                loading.loaded();
            });
    };

    const onGetUsers = () => {
        loading.load();

        waitlistUsersApi
            .getUsers()
            .then((response: AxiosResponse<WaitlistUsersResponse, any>) => {
                const waitlistUsersData = response.data;

                waitlistUsersContext.dispatch({
                    type: WaitlistUsersActions.SET_USERS,
                    payload: waitlistUsersData
                });
            })
            .catch((e) => {
                error.parseAndSetErrorMessage(e);
            })
            .finally(() => {
                loading.loaded();
            });
    };

    const searchFilter = (row: { name: string; email: string }) =>
        row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.email.toLowerCase().includes(searchQuery.toLowerCase());

    return {
        waitlistUsers: waitlistUsersContext.state,
        searchQuery,
        onApprove,
        onDeny,
        onGetUsers,
        searchFilter,
        setSearchQuery
    };
};

export default useWaitlistUsers;
