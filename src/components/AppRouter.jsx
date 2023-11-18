import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {privateRoutes} from "../router/routes";

const AppRouter = () => {
    return (
        <Routes>
            {privateRoutes.map(route =>
                <Route
                    path={route.path}
                    element={route.element}
                    key={route.path}
                />
            )}
            <Route
                path="*"
                element={<Navigate to='/catalog' replace/>}
            />
        </Routes>
    );
};

export default AppRouter;