import {useAuthActions} from "./auth/useAuthActions";
import {useNavigationActions} from "./navigation/useNavigationActions";
import {useProfileActions} from "./profile/useProfileActions";

export const useActions = () => {
    const auth = useAuthActions();
    const nav = useNavigationActions();
    const profile = useProfileActions();
    return {auth, nav, profile}
};
