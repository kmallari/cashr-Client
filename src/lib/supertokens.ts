import SuperTokens from 'supertokens-web-js';
import Session from 'supertokens-web-js/recipe/session';
import ThirdPartyEmailPassword from 'supertokens-web-js/recipe/thirdpartyemailpassword'

const init = () => {
    SuperTokens.init({
        appInfo: {
            apiDomain: "http://localhost:8080",
            apiBasePath: "/auth",
            appName: "...",
        },
        recipeList: [
            Session.init(),
            ThirdPartyEmailPassword.init(),
        ],
    });
}

export default init;