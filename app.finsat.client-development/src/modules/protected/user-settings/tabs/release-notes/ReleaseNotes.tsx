const ReleaseNotes = () => {
    return (
        <>
            <div className="bg-white w-2/3 m-2 p-4 rounded">
                <p className="font-bold text-black">v2.1.0</p>
                <p className="text-sm">03.06.2025</p>
                <div className="w-full h-0.5 bg-gray-200 my-6"></div>

                <h2 className="rounded py-1 px-3 font-semibold bg-gray-200 w-max text-sm">
                    Features
                </h2>
                <ul className="space-y-1 text-gray-500 list-disc list-inside ml-2 mt-3 mb-8 text-sm">
                    <li>
                        <b>Subscription Tiers:</b> Free Tier includes 5 site views; Basic offers 50 per month; Enterprise available via contact.
                    </li>
                    <li>
                        <b>Dashboard Module:</b> Added real-time financial and energy KPIs, monthly revenue/energy charts, and watchlist-specific analytics.
                    </li>
                </ul>
                <h2 className="rounded py-1 px-3 font-semibold bg-gray-200 w-max text-sm">
                    Bug Fixes
                </h2>
                <ul className="space-y-1 text-gray-500 list-disc list-inside ml-2 mt-3 mb-8 text-sm">
                    <li>
                        <b>Multi-Obstruction Removal:</b> Fixed inconsistent behavior requiring repeated tool reactivation; now allows continuous deletion.
                    </li>
                    <li>
                        <b>Save As Variation:</b> Resolved issue where saved variations were not added to the watchlist; saving now triggers both actions.
                    </li>
                </ul>
                <h2 className="rounded py-1 px-3 font-semibold bg-gray-200 w-max text-sm">
                    Support and Feedback
                </h2>
                <ul className="space-y-1 text-gray-500 list-disc list-inside ml-2 mt-3 mb-4 text-sm">
                    <li>
                        For support, visit:{' '}
                        <a
                            href="https://support.finsat.space"
                            className="text-blue-600 underline"
                        >
                            support.finsat.space
                        </a>
                    </li>
                </ul>
            </div>
            <div className="bg-white w-2/3 m-2 p-4 rounded">
                <p className="font-bold text-black">v2.0.0</p>
                <p className="text-sm">22.05.2025</p>
                <div className="w-full h-0.5 bg-gray-200 my-6"></div>

                <h2 className="rounded py-1 px-3 font-semibold bg-gray-200 w-max text-sm">
                    Features
                </h2>
                <ul className="space-y-1 text-gray-500 list-disc list-inside ml-2 mt-3 mb-8 text-sm">
                    <li>
                        <b>Rooftop Outline Adjustment UI:</b> Allows users to
                        refine ML-detected rooftop outlines interactively on a
                        2D map.
                    </li>
                    <li>
                        <b>NASA Solar Irradiance Data:</b> Fetched for all
                        mapped buildings and integrated for further analysis.
                    </li>
                    <li>
                        <b>Watchlist Real-Time Updates:</b> Ensures dynamic
                        updates across dashboard and features.
                    </li>
                    <li>
                        <b>Watchlist Management:</b> Users can add/remove
                        properties, name watchlists, and validate uniqueness.
                    </li>
                    <li>
                        <b>Financial Tools:</b> Includes Cash Flows, Financial
                        Metrics (NPV, IRR, Payback), and Advanced Mitigation
                        Calculator with save/load variations.
                    </li>
                    <li>
                        <b>Charts:</b> Payback Period, Annual Cash Flow, and
                        Sensitivity Analysis for NPV vs. Discount Rate.
                    </li>
                    <li>
                        <b>Interactive Search & Maps:</b> Global search bar with
                        address and region filters, dynamic map pins, and
                        friendly no-result messaging.
                    </li>
                    <li>
                        <b>Watchlist Table and Details View:</b> Detailed
                        display for each property with full financial and solar
                        metrics.
                    </li>
                    <li>
                        <b>ML-Based Obstruction Detection:</b> Refine red
                        polygons to identify obstructions and calculate
                        available solar panel space.
                    </li>
                    <li>
                        <b>Batch Property Addition:</b> Add multiple properties
                        to one or more watchlists simultaneously.
                    </li>
                    <li>
                        <b>Search Results Page:</b> Displays interactive
                        property cards alongside dynamic maps.
                    </li>
                </ul>

                <h2 className="rounded py-1 px-3 font-semibold bg-gray-200 w-max text-sm">
                    Improvements
                </h2>
                <ul className="space-y-1 text-gray-500 list-disc list-inside ml-2 mt-3 mb-8 text-sm">
                    <li>
                        <b>Dashboard Formatting:</b> Removed decimals in
                        monetary figures; cleaned up chart labels and summaries.
                    </li>
                    <li>
                        <b>Property View Enhancements:</b> Address shown instead
                        of name, building icon removed, and improved header and
                        footer clarity.
                    </li>
                    <li>
                        <b>Unit Standardization:</b> Power/energy in kW/kWh,
                        slope in degrees, and consistent financial metric
                        formatting.
                    </li>
                    <li>
                        <b>User Experience:</b> Added eye icon to password
                        fields, removed unused UI elements, and restricted
                        admin-only features.
                    </li>
                    <li>
                        <b>Charts & UI:</b> Improved formatting, spacing, and
                        alignment; added tooltip info and chart axis for
                        clarity.
                    </li>
                </ul>

                <h2 className="rounded py-1 px-3 font-semibold bg-gray-200 w-max text-sm">
                    Bug Fixes
                </h2>
                <ul className="space-y-1 text-gray-500 list-disc list-inside ml-2 mt-3 mb-8 text-sm">
                    <li>
                        Corrected unit display on graphs and resolved
                        overlapping axis issues for long-term projections.
                    </li>
                    <li>
                        Fixed blinking issue with Street View Satellite and
                        removed unused bell icon.
                    </li>
                    <li>
                        Improved pagination performance for large watchlists and
                        chart bar color differentiation.
                    </li>
                    <li>
                        Corrected default values (e.g. panel efficiency), value
                        formatting, and ensured valid input based on available
                        area.
                    </li>
                    <li>
                        Updated chart labels, tooltips, and numeric formatting
                        for consistency and readability.
                    </li>
                    <li>
                        Resolved redundant fields and enhanced performance on
                        multi-property watchlists.
                    </li>
                </ul>

                <h2 className="rounded py-1 px-3 font-semibold bg-gray-200 w-max text-sm">
                    Known Issues
                </h2>
                <ul className="space-y-1 text-gray-500 list-disc list-inside ml-2 mt-3 mb-8 text-sm">
                    <li>
                        Misalignment of rooftop green polygons affecting usable
                        area visualization.
                    </li>
                    <li>
                        Generate PDF Report feature still in development due to
                        parameter dependencies.
                    </li>
                </ul>

                <h2 className="rounded py-1 px-3 font-semibold bg-gray-200 w-max text-sm">
                    Support and Feedback
                </h2>
                <ul className="space-y-1 text-gray-500 list-disc list-inside ml-2 mt-3 mb-4 text-sm">
                    <li>
                        For support, visit:{' '}
                        <a
                            href="https://support.finsat.space"
                            className="text-blue-600 underline"
                        >
                            support.finsat.space
                        </a>
                    </li>
                </ul>
            </div>
            <div className="bg-white w-2/3 m-2 p-4 rounded">
                <p className="font-bold text-black">v1.0.0</p>
                <p className="text-sm">11.04.2025</p>
                <div className="w-full h-0.5 bg-gray-200 my-6"></div>
                <h2 className="rounded py-1 px-3 font-semibold bg-gray-200 w-max text-sm">
                    Module: Explore
                </h2>
                <ul className="space-y-1 text-gray-500 list-disc list-inside ml-2 mt-3 mb-8 text-sm">
                    <li>
                        <b>Global Address Search:</b> Users can search for any
                        address worldwide. All properties within the searched
                        area will be displayed, along with corresponding
                        location pins on the map for easy identification.
                    </li>
                    <li>
                        <b>Property Details View:</b> All visible properties
                        will automatically display key information, including
                        their address and size. This provides users with instant
                        access to essential data as they explore different
                        areas.
                    </li>
                    <li>
                        <b>Add Properties to Watchlist:</b> The Add to Watchlist
                        button enables users to save selected properties
                        directly to their custom watchlists for future reference
                        and analysis.
                    </li>
                    <li>
                        <b>Pin Interaction:</b> Clicking on a property pin
                        reveals the same key details—address and size—along with
                        the option to add the property to a watchlist directly
                        from the map interface.
                    </li>
                </ul>
                <h2 className="rounded py-1 px-3 font-semibold bg-gray-200 w-max text-sm">
                    Module: Property Details
                </h2>
                <ul className="space-y-1 text-gray-500 list-disc list-inside ml-2 mt-3 mb-8 text-sm">
                    <li>
                        <b>Property Map Visualization:</b> Users can view
                        detailed property data including a green polygon overlay
                        on the map, clearly outlining the boundaries of the
                        selected property.
                    </li>
                    <li>
                        <b>Solar Panel Calculator with Interactive Metrics:</b>{' '}
                        A powerful calculator has been introduced to estimate
                        solar panel performance and financial metrics. After
                        completing a calculation, users can view: Overall and
                        Annual Metrics and Investment Metrics. Additionally,
                        three dynamic graphs are displayed: Annual Cash Flow
                        Over Time, Sensitivity Analysis: NPV vs. Discount Rate
                        and Payback Period (Break-even Timeline).
                    </li>
                    <li>
                        <b>Save and View Calculation Variations:</b> Each solar
                        calculation can be saved as a Variation. These are
                        accessible via the Variations tab, where users can click
                        on a variation to review its input data, solar and
                        financial metrics, and associated graphs.
                    </li>
                    <li>
                        <b>Add Properties to Watchlist:</b> Users can easily add
                        the current property to watchlist by clicking the Add to
                        Watchlist button for quick access later.
                    </li>
                    <li>
                        <b>Generate Detailed PDF Reports:</b> With the Generate
                        Report button, users can create a downloadable PDF that
                        includes all calculation details, performance metrics,
                        and financial analysis for the selected property.
                    </li>
                    <li>
                        <b>Edit Mode for Surface Areas and Obstructions:</b>{' '}
                        Edit Mode feature will allow users to add, modify, or
                        remove surface areas and obstructions directly on the
                        map for more precise calculations.
                    </li>
                </ul>
                <h2 className="rounded py-1 px-3 font-semibold bg-gray-200 w-max text-sm">
                    Module: Dashboard
                </h2>
                <ul className="space-y-1 text-gray-500 list-disc list-inside ml-2 mt-3 mb-8 text-sm">
                    <li>
                        <b>Watchlist Search and Graphical Insights:</b> Users
                        can search for a watchlist and view three types of
                        graphs: Cumulative Annual Cash Flows (Post-Investment),
                        Revenue and Solar Generation by Property Type, Projected
                        Monthly Energy Potential and Revenue. These
                        visualizations help provide deeper financial and
                        operational insights for each selected watchlist.
                    </li>
                    <li>
                        <b>PDF Report Export:</b> The Export button allows users
                        to generate a detailed PDF report. This report includes
                        expanded data and visualizations for further analysis
                        and sharing.
                    </li>
                </ul>
                <h2 className="rounded py-1 px-3 font-semibold bg-gray-200 w-max text-sm">
                    Module: Watchlist
                </h2>
                <ul className="space-y-1 text-gray-500 list-disc list-inside ml-2 mt-3 mb-8 text-sm">
                    <li>
                        <b>Property Data Overview:</b> Users can view detailed
                        information for each property within a watchlist,
                        including: Property Name, Property Type, Property
                        Address, Energy Generation Potential, Property Size,
                        Energy Generation Revenue.
                    </li>
                    <li>
                        <b>Create New Watchlist:</b> The Add New Watchlist
                        button allows users to create custom watchlists. Each
                        watchlist must have a unique name to ensure easy
                        identification and organization.
                    </li>
                </ul>
                <h2 className="rounded py-1 px-3 font-semibold bg-gray-200 w-max text-sm">
                    Module: ML Model
                </h2>
                <ul className="space-y-1 text-gray-500 list-disc list-inside ml-2 mt-3 mb-8 text-sm">
                    <li>
                        <b>Calculate Available Space:</b> Use the Calculate
                        Available Space feature to automatically identify and
                        measure the areas on the property that are available for
                        installing solar panels.
                    </li>
                    <li>
                        <b>Detect Property Obstructions:</b> With the Detect
                        Obstructions tool, users can automatically identify and
                        highlight all obstructions present on the property that
                        may impact solar panel placement or performance.
                    </li>
                </ul>
            </div>
        </>
    );
};

export default ReleaseNotes;
