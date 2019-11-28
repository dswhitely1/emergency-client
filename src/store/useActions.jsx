import {useAuthActions} from "./auth/useAuthActions";
import {useNavigationActions} from "./navigation/useNavigationActions";
import {useProfileActions} from "./profile/useProfileActions";
import {useEmploymentActions} from "./employment/useEmploymentActions";

export const useActions = () => {
    const auth = useAuthActions();
    const nav = useNavigationActions();
    const profile = useProfileActions();
    const employment = useEmploymentActions();
    return {auth, nav, profile, employment}
};
