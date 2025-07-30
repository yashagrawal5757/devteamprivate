import React from 'react';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
            <img
                src="/logo-black.png"
                alt="Logo"
                className="mx-auto mb-12 mt-6 w-36 h-auto"
            />
            <div className="bg-white shadow-lg rounded-lg max-w-4xl p-8">
                <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
                <h2 className="font-bold mb-4">
                    Effective Date: January 1, 2024
                </h2>
                <p className="mb-4">
                    This Privacy Policy explains how FinSat ("we," "us," or
                    "our") collects, uses, and discloses information when you
                    use our website at www.finsat.space (the "Website").
                </p>
                <ol className="list-decimal ml-5 nested-list">
                    <li className="mb-4">
                        Information We Collect
                        <ol className="ml-8">
                            <li>
                                Personal Information: We may collect personal
                                information that you provide to us, such as your
                                name, email address, phone number, and any other
                                information you choose to provide.
                            </li>
                            <li>
                                Usage Information: We may collect information
                                about how you use the Website, including your IP
                                address, browser type, device information, and
                                pages you visit.
                            </li>
                            <li>
                                Cookies and Similar Technologies: We may use
                                cookies and similar technologies to collect
                                information about your use of the Website.
                            </li>
                        </ol>
                    </li>
                    <li className="mb-4">
                        How We Use the Information
                        <ol className="ml-8">
                            <li>
                                Personal Information: We may use your personal
                                information to respond to your inquiries,
                                provide you with the services or information you
                                request, improve the Website, and for other
                                legitimate business purposes.
                            </li>
                            <li>
                                Usage Information: We may use your usage
                                information to analyze how the Website is being
                                used, to improve the Website, and for other
                                legitimate business purposes.
                            </li>
                            <li>
                                Cookies and Similar Technologies: We may use
                                cookies and similar technologies to enhance your
                                user experience, remember your preferences, and
                                for other legitimate business purposes.
                            </li>
                        </ol>
                    </li>
                    <li className="mb-4">
                        How We Share the Information
                        <ol className="ml-8">
                            <li>
                                Service Providers: We may share your information
                                with third-party service providers that perform
                                services on our behalf, such as hosting,
                                analytics, and customer support.
                            </li>
                            <li>
                                Legal Compliance: We may disclose your
                                information if required to do so by law or in
                                the good-faith belief that such action is
                                necessary to comply with legal requirements or
                                governmental requests.
                            </li>
                            <li>
                                Business Transfers: In the event of a merger,
                                acquisition, or sale of all or a portion of our
                                assets, your information may be transferred as
                                part of that transaction.
                            </li>
                        </ol>
                    </li>
                    <li className="mb-4">
                        Your Choices and Rights
                        <ol className="ml-8">
                            <li>
                                Opt-Out of Communications: You may opt-out of
                                receiving promotional emails from us by emailing
                                us at{' '}
                                <a
                                    className="text-primary cursor-pointer hover:underline"
                                    href="mailto: admin@finsat.space"
                                >
                                    admin@finsat.space
                                </a>{' '}
                                requesting to unsubscribe from communications.
                            </li>
                            <li>
                                Access and Correction: You may have the right to
                                access, update, and correct inaccuracies in your
                                personal information.
                            </li>
                            <li>
                                Data Deletion: You may have the right to request
                                the deletion of your personal information.
                            </li>
                        </ol>
                    </li>
                    <li className="mb-4">
                        Security We implement reasonable security measures to
                        protect the information we collect. However, no website
                        or internet transmission is completely secure, and we
                        cannot guarantee the absolute security of your
                        information.
                    </li>
                    <li className="mb-4">
                        Third-Party Links The Website may contain links to
                        third-party websites or applications. We are not
                        responsible for the privacy practices or content of
                        these third-party sites.
                    </li>
                    <li className="mb-4">
                        Changes to this Privacy Policy We may update this
                        Privacy Policy from time to time. We will notify you of
                        any changes by posting the updated policy on the
                        Website.
                    </li>
                    <li className="mb-4">
                        Contact Us If you have any questions or concerns about
                        this Privacy Policy or our privacy practices, please
                        contact us at{' '}
                        <a
                            className="text-primary cursor-pointer hover:underline"
                            href="mailto: admin@finsat.space"
                        >
                            admin@finsat.space
                        </a>
                        .
                    </li>
                </ol>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
