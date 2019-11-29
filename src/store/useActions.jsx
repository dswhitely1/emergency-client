import {useAuthActions} from "./auth/useAuthActions";
import {useNavigationActions} from "./navigation/useNavigationActions";
import {useProfileActions} from "./profile/useProfileActions";
import {useEmploymentActions} from "./employment/useEmploymentActions";
import {useEducationActions} from "./education/useEducationActions";
import {useReferenceActions} from "./references/useReferenceActions";

export const useActions = () => {
    const auth = useAuthActions();
    const nav = useNavigationActions();
    const profile = useProfileActions();
    const employment = useEmploymentActions();
    const education = useEducationActions();
    const reference = useReferenceActions();

    return {auth, nav, profile, employment, education, reference}
};
