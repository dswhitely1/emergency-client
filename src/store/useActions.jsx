import {useAuthActions} from "./auth/useAuthActions";
import {useNavigationActions} from "./navigation/useNavigationActions";

export const useActions = () => {
    const auth = useAuthActions();
    const nav = useNavigationActions();
    return {auth, nav}
};
