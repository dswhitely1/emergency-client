import { useAuthActions } from './auth/useAuthActions';
import { useNavigationActions } from './navigation/useNavigationActions';
import { useProfileActions } from './profile/useProfileActions';
import { useEmploymentActions } from './employment/useEmploymentActions';
import { useEducationActions } from './education/useEducationActions';
import { useReferenceActions } from './references/useReferenceActions';
import { useAdminActions } from './admin/useAdminActions';
import { useWeatherActions } from './weather/useWeatherActions';
import { useMessageActions } from './messages/useMessageActions';

export const useActions = () => {
  const auth = useAuthActions();
  const nav = useNavigationActions();
  const profile = useProfileActions();
  const employment = useEmploymentActions();
  const education = useEducationActions();
  const reference = useReferenceActions();
  const admin = useAdminActions();
  const weather = useWeatherActions();
  const message = useMessageActions();
  return {
    auth,
    nav,
    profile,
    employment,
    education,
    reference,
    admin,
    weather,
    message,
  };
};
