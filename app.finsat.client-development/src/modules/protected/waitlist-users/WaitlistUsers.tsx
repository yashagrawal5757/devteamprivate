import React, { useEffect } from 'react';
import useWaitlistUsers from './hooks/useWaitlistUsers';
import { IoIosSearch } from 'react-icons/io';
import Button from '@ui/buttons/button/Button';
import { sectorTypeMetadata } from '@metadata/SectorType.metadata';
import { primaryInterestTypeMetadata } from '@metadata/PrimaryInterestType.metadata';
import { surveyQuestionMetadata } from '@metadata/SurveyQuestion.metadata';
import { SurveyQuestion } from '@enums/SurveyQuestion';

const WaitlistUsers = () => {
    const {
        waitlistUsers,
        searchQuery,
        onApprove,
        onDeny,
        onGetUsers,
        setSearchQuery,
        searchFilter
    } = useWaitlistUsers();

    useEffect(() => {
        onGetUsers();
    }, []);

    return (
        <>
            <div className="mx-12 my-8">
                <h1 className="text-2xl font-semibold">Waitlist Users</h1>
            </div>
            <div className="relative flex items-center flex-grow mb-4 text-sm mx-12">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="rounded-lg pl-10 pr-3 py-2 border border-gray-300 focus:outline-none w-1/5"
                />
                <IoIosSearch className="absolute left-3 text-xl" />
            </div>
            <div className="relative overflow-x-auto border-gray-200 border rounded-lg m-12 mt-8">
                <table className="w-full text-sm text-left rtl:text-right">
                    <thead className="text-primary bg-gray-100">
                        <tr>
                            <th scope="col" className="px-6 py-4">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-4">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-4">
                                Company
                            </th>
                            <th scope="col" className="px-6 py-4">
                                Sector
                            </th>
                            <th scope="col" className="px-6 py-4">
                                Primary Interest
                            </th>
                            {Object.values(surveyQuestionMetadata).map(
                                (question) => (
                                    <th scope="col" className="px-6 py-4">
                                        {question}
                                    </th>
                                )
                            )}
                            <th scope="col" className="px-6 py-4">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {waitlistUsers.filter(searchFilter).length > 0 ? (
                            waitlistUsers
                                .filter(searchFilter)
                                .map((row, index) => (
                                    <tr
                                        key={index}
                                        className="bg-white border-b"
                                    >
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                        >
                                            {row.name}
                                        </th>
                                        <td className="px-6 py-4">
                                            {row.email}
                                        </td>
                                        <td className="px-6 py-4">
                                            {row.company}
                                        </td>
                                        <td className="px-6 py-4">
                                            {row.sector === 0
                                                ? 'None'
                                                : sectorTypeMetadata[
                                                      row.sector
                                                  ]}
                                        </td>
                                        <td className="px-6 py-4">
                                            {row.interest === 0
                                                ? 'None'
                                                : primaryInterestTypeMetadata[
                                                      row.interest
                                                  ]}
                                        </td>
                                        {Object.keys(
                                            surveyQuestionMetadata
                                        ).map((key) => (
                                            <td className="px-6 py-4">
                                                {
                                                    row.surveys.find(
                                                        (survey) =>
                                                            survey.question ==
                                                            (key as unknown as SurveyQuestion)
                                                    )?.answer
                                                }
                                            </td>
                                        ))}
                                        <td className="flex flex-row px-6 py-4">
                                            <div className="w-1/2 mr-4">
                                                <Button
                                                    onClick={() =>
                                                        onApprove(row.id)
                                                    }
                                                    text="Approve"
                                                    type={'button'}
                                                />
                                            </div>
                                            <div className="w-1/2 ml-4">
                                                <Button
                                                    onClick={() =>
                                                        onDeny(row.id)
                                                    }
                                                    styleType="danger"
                                                    text="Deny"
                                                    type={'button'}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="px-6 py-4 text-center"
                                >
                                    No results found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default WaitlistUsers;
