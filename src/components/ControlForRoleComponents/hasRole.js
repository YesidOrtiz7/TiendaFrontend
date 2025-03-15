export const hasRole = (user, requiredRoles) => {
    if (!user || !user.roles  || !Array.isArray(user.roles)) return false;
    return user.roles.some(role => requiredRoles.includes(role));
  };
  