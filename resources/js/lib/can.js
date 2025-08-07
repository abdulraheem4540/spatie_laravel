import { usePage } from '@inertiajs/react';

export function can(permission) {
    const { auth } = usePage().props;

    // Safe check to avoid error if permissions not loaded
    if (!auth || !Array.isArray(auth.permissions)) {
        return false;
    }

    return auth.permissions.includes(permission);
}
export function hasAnyPermission() {
    const { auth } = usePage().props;
    return auth.permissions && auth.permissions.length > 0;
}