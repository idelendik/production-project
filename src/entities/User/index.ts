export { getUserAuthData } from './model/selectors/getUserAuthData/getUserAuthData';

export { getUserInited } from './model/selectors/getUserInited/getUserInited';

export {
    getUserRoles,
    isUserAdmin,
    isUserManager,
} from './model/selectors/roleSelectors';

export { userReducer, userActions } from './model/slice/userSlice';

export type { User, UserSchema } from './model/types/user';

export { UserRole } from './model/consts/consts';

export {
    getJsonSettings,
    useJsonSettings,
} from './model/selectors/jsonSettings';

export { saveJsonSettings } from './model/services/saveJsonSettings';
export { initAuthData } from './model/services/initAuthData';
