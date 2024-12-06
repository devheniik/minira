import {useRouteError} from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError() as {
        message: string;
        statusText: string;
    };

    return (
        <div className={'size-full flex justify-center items-center'}>
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    );
}